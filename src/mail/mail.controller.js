import nodemailer from "nodemailer";
import uniqid from "uniqid";
import bcrypt from "bcrypt";
import { User } from "../users/users.model.js";
import { Op, Sequelize } from "sequelize";
import { config } from "dotenv";

config({ path: "." + process.env.NODE_ENV + ".env" });

const mailSetup = {
  mail: process.env.SMTP_MAIL,
  sender: process.env.SMTP_SENDER,
  domain: process.env.SMTP_DOMAIN,
};
const mailTogether = nodemailer.createTransport({
  port: process.env.SMTP_PORT,
  host: process.env.SMTP_HOST,
  auth: {
    user: mailSetup.mail,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

class MailController {
  async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const resurl = uniqid.process() + uniqid(email);
      const userToReset = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!userToReset) return res.status(404).end();
      await userToReset.update({
        resetURL: resurl,
        resetExpiration: Sequelize.literal("NOW() + INTERVAL 1 DAY"),
      });
      const mailConf = {
        from: mailSetup.mail,
        to: email,
        subject: "Сброс пароля на 2geza",
        text: `Новый пароль от аккаунта 2geza`,
        html: `<div>
            Здравствуйте, ${userToReset.name},
            </div>
            <div>
            <b>Перейдите по ссылке чтобы ввести новый пароль: ${mailSetup.domain}/new-password-${resurl}</b>
            </div>
            <div>
            Данная ссылка действительна в течение суток!
            </div>`,
      };
      mailTogether.sendMail(mailConf, (err, info) => {
        if (err) return res.status(503).end();
        return res.status(200).json(`Письмо было отправлено на ${email}`);
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async continuedRegistration(req, res) {
    try {
      const { email } = req.body;
      const findUser = await User.findOne({ where: { email } });
      if (!findUser) return res.status(404).end();

      const verifyUrl = uniqid.process() + uniqid(email);

      const userToVerify = await findUser.update({
        verificationURL: verifyUrl,
      });

      const mailConf = {
        from: `"${mailSetup.sender}" <${mailSetup.mail}>`,
        to: email,
        subject: "Завершение регистрации",
        html: `
          <p>
              Здравствуйте!<br>Для завершения регистрации на социальной экосистеме МИР нажмите на эту ссылку: <b>${mailSetup.domain}/reg/verify-${verifyUrl}</b>
          </p>
        `,
      };
      mailTogether.sendMail(mailConf, async (err, info) => {
        if (err) {
          console.log(err);
          await userToVerify.destroy({ force: true });
          return res.status(503).end();
        }
        return res.status(200).json(`Письмо было отправлено на ${email}`);
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getReset(req, res) {
    try {
      const { resetURL } = req.params;
      const userToReset = await User.findOne({
        where: {
          resetURL: resetURL,
          resetExpiration: {
            [Op.gte]: new Date(),
          },
        },
        attributes: ["resetURL", "email", "name"],
      });
      if (!userToReset) return res.status(404).end();
      return res.status(200).json(userToReset);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async updatePass(req, res) {
    try {
      const { resetURL } = req.params;
      const { password } = req.body;

      const userToUpdate = await User.findOne({
        where: {
          resetURL: resetURL,
          resetExpiration: {
            [Op.gte]: new Date(),
          },
        },
      });
      if (!userToUpdate) return res.status(404).end();
      await userToUpdate.update({
        password: await bcrypt.hash(password, 12),
        resetExpiration: Sequelize.literal("NOW()"),
      });
      return res.status(200).json(`Пароль был изменен!`);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
}

export default new MailController();
