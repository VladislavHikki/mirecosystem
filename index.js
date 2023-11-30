import express from "express";
import cors from "cors";
import dbTogether from "./db/db.js";
import { countriesRouter } from "./src/countries/countries.router.js";
import { usersRouter } from "./src/users/users.router.js";
import { Role, TransactionEntity } from "./src/users/users.model.js";
import { resourcesRouter } from "./src/resources/resources.router.js";
import { categoriesRouter } from "./src/categories/categories.router.js";
import { ResType } from "./src/resources/resources.model.js";
import { mailRouter } from "./src/mail/mail.router.js";
import { lettersRouter } from "./src/letters/letters.router.js";
import url from "url";
import { chatsRouter } from "./src/chats/chats.router.js";
import idempotency from "express-idempotency";
import { notificationsRouter } from "./src/notifications/notifications.router.js";
import { config } from "dotenv";
import http from "http";
import { activitiesRouter } from "./src/activities/activities.router.js";
import { postsRouter } from "./src/posts/posts.router.js";
import { Rubric } from "./src/categories/categories.model.js";
import { currencyRouter } from "./src/currency/currency.router.js";
import { globalRouter } from "./src/global/global.router.js";
import https from "https";
import fs from "fs";
import wsTogether from "./webSockets.js";
import { servicesRouter } from "./src/services/services.router.js";
import helmet from "helmet";
import { Op } from "sequelize";
import { profilesRouter } from "./src/profiles/profiles.router.js";
// const url = express.urlencoded({ extended: true });

config({ path: "." + process.env.NODE_ENV + ".env" });

const app = express();

const PORT = process.env.PORT || 3001;

export const SECRET = "$2a$12$UNju/7eJWtaGKt97L9S0nedjRh0M6Rdo17FqfPL5BLioL1L48/Ceu";

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(express.json());
app.use(idempotency.idempotency());
app.use(cors());
app.use("/api/public", express.static("public"));
app.use("/api/countries", countriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/resources", resourcesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/mail", mailRouter);
app.use("/api/letters", lettersRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/currency", currencyRouter);
app.use("/api/global", globalRouter);
app.use("/api/services", servicesRouter);
app.use("/api/profiles", profilesRouter);

console.log("Starting server...");
dbTogether
  .sync({
    // alter: true,
  })
  .then(async () => {
    await Role.bulkCreate(
      [
        { label: "Админ", accessLevel: 1 },
        { label: "Тренер", accessLevel: 2 },
        { label: "Пользователь", accessLevel: 3 },
        { label: "Куратор", accessLevel: 3 },
        { label: "Банкир", accessLevel: 3 },
        { label: "Кассир", accessLevel: 3 },
      ],
      { ignoreDuplicates: true }
    );

    await ResType.bulkCreate([{ label: "Чат" }, { label: "Бот" }, { label: "Канал" }], { ignoreDuplicates: true });

    await Rubric.bulkCreate([{ id: 1, label: "Прочее" }], {
      ignoreDuplicates: true,
    });

    await TransactionEntity.bulkCreate([{ label: "Rollar" }, { label: "Lemon" }], { ignoreDuplicates: true });

    /* const admin = await User.findOrCreate({
      where: {
        login: "admin",
        password: "$2a$12$Rz1FNinIwXzGET8CInJOXuI8syaXqESxWeoKrzX1SanwcdZRxDfFe",
        email: "admin@gmail.com",
        name: "admin",
        isAdminHelper: true,
      },
    }); */

    await dbTogether.query("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));");
    console.clear();
    console.log("---- DATABASE IS LOADED");
  })
  .then(async () => {
    let server = http.createServer(app);

    if (process.env.NODE_ENV == "prod") {
      const sslOptions = {
        cert: fs.readFileSync("/fullchain.pem"),
        key: fs.readFileSync("/privkey.pem"),
      };

      server = https.createServer(sslOptions, app);
    }

    server.listen(PORT, () => {
      console.log("!====================================!");
      console.log(`     2GEZA STARTED ON PORT: ${PORT}`);
      console.log("!====================================!");
    });

    await wsTogether(server).then(() => console.log("---- WEBSOCKET STARTED"));
  });
