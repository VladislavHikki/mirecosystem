import dbTogether from "../../db/db.js";
import { deleteFileArr, throwError, validateError } from "../../utils/customValidation.js";
import path from "path";
import { Profile } from "./profiles.model.js";
import { Attachment } from "../posts/posts.model.js";

const fileTypes = {
  media: { field: "media", type: 1, maxCount: 8 },
  familyImg: { field: "family", type: 2, maxCount: 10 },
  petsImg: { field: "pets", type: 3, maxCount: 8 },
  transportImg: { field: "transport", type: 4, maxCount: 8 },
  idolsImg: { field: "idols", type: 5, maxCount: 6 },
};
const checkImg = {
  ext: [".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif"],
  type: ["image/png", "image/jpg", "image/jpeg", "image/svg+xml", "image/webp", "image/gif"],
};
const checkVid = {
  ext: [".avi", ".mp4", ".webm", ".wmv", ".mkv", ".mov", ".flv", ".m4v", ".mpg", ".mpeg", ".ogv", ".3gp", ".3g2"],
  type: [
    "video/x-msvideo",
    "video/mp4",
    "video/webm",
    "video/x-ms-wmv",
    "video/x-matroska",
    "video/quicktime",
    "video/x-flv",
    "video/x-m4v",
    "video/mpeg",
    "video/mp2t",
    "video/ogg",
    "video/3gpp",
    "video/3gpp2",
  ],
};

class ProfilesController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async createProfile(req, res) {
    try {
      const { user, files } = req;
      // const {
      //   meaningLife,
      //   importantAchievements,
      //   birthPlace,
      //   birthDate,
      //   zodiacSing,
      //   horoscopeDate,
      //   height,
      //   weight,
      //   bodyType,
      //   eyesColor,
      //   hairColor,
      //   religion,
      //   education,
      //   profession,
      //   occupation,
      //   training,
      //   competencies,
      //   foreignLanguages,
      //   accomplishments,
      //   hobbies,
      //   principles,
      //   distastes,
      //   dignities,
      //   disadvantages,
      //   family,
      //   pets,
      //   transport,
      //   idols,
      //   preferences,
      //   networks,
      //   wish,
      // } = req.body;
      const data = req.body;
      const attachments = [],
        toCreate = { userId: user.id };
      for await (const key of Object.keys(files)) {
        if (files[key].length > fileTypes[key].maxCount) throwError(400, "Слишком много вложений!");
        for (const file of files[key]) {
          let type = 1;
          if (checkImg.ext.includes(path.extname(file.filename.toLowerCase())) && checkImg.type.includes(file.mimetype)) type = 2;
          else if (checkVid.ext.includes(path.extname(file.filename.toLowerCase())) && checkVid.type.includes(file.mimetype)) type = 3;
          attachments.push({
            label: file.originalname,
            attach: `${file.destination}/${file.filename}`,
            type: type,
            userId: user.id,
            profile_attachments: { type: fileTypes[key].type },
          });
        }
      }

      for (const key of Object.keys(data)) {
        toCreate[key] = data[key] ? data[key] : undefined;
      }
      console.log(attachments);
      toCreate.attachments = attachments;

      const result = await dbTogether.transaction(async (t) => {
        const created = await Profile.create(toCreate, { transaction: t, include: Attachment });
        return [created];
      });
      if (!result) throwError(400, "Ошибка при создании профиля!");
      return res.status(201).json([{ msg: "Создано!" }]);
    } catch (e) {
      const { files } = req;
      console.error(e);
      for await (const key of Object.keys(files)) {
        if (files[key].length > 0) {
          deleteFileArr(files[key]);
        }
      }
      return res.status(e.code || 500).json(validateError(e));
    }
  }
}

export default new ProfilesController();
