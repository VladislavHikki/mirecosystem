import { ValidationError } from "sequelize";
import fs from "fs";

export function validateError(error, file) {
  const messages = [];
  if (file?.filename) if (fs.existsSync(`${file.destination}/${file.filename}`)) fs.unlinkSync(`${file.destination}/${file.filename}`);
  if (error instanceof ValidationError) {
    error.errors.forEach((err) => {
      switch (err.validatorKey) {
        // case "is_null":
        //   messages.push({ field: err.path, msg: `Заполните поле` });
        //   break;
        // case "not_unique":
        //   messages.push({ field: err.path, msg: `Должно быть уникальным` });
        //   break;
        // case "notEmpty":
        //   messages.push({ field: err.path, msg: `Пустая строка` });
        //   break;
        // case "isEmail":
        //   messages.push({ field: err.path, msg: `Некорректная электронная почта` });
        //   break;
        // case "len":
        //   if (err.validatorArgs[0] === err.validatorArgs[1]) {
        //     messages.push({ field: err.path, msg: `Должно быть ${err.validatorArgs[0]} символов` });
        //   } else {
        //     messages.push({ field: err.path, msg: `Должно быть от ${err.validatorArgs[0]} до ${err.validatorArgs[1]} символов` });
        //   }
        //   break;
        // case "isInt":
        //   messages.push({ field: err.path, msg: `Должно быть целочисленным` });
        //   break;
        default:
          messages.push({ field: err.path, msg: err.message });
          break;
      }
    });
    return messages;
  } else return [{ msg: error.message }];
}

export function deleteFileArr(files) {
  if (files) {
    files.forEach((file) => {
      if (fs.existsSync(`${file.destination}/${file.filename}`)) {
        fs.unlinkSync(`${file.destination}/${file.filename}`);
      }
    });
  }
  return;
}

/**
 * Нужно отправлять массив файлов с полным путем
 * @param {*} files
 */
export function deleteFileByPath(files) {
  if (files) {
    files.forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
  }
  return;
}

/**
 *
 * @param {filearray} files
 * @param {number} size В МБ!
 */
export function checkFileArrSize(files, size) {
  if (files) {
    files.forEach((file) => {
      if (fs.existsSync(`${file.destination}/${file.filename}`) && file.size <= size * 1024 * 1024) {
      } else throw new Error(`Размер ${file.originalname} более ${size} МБ`);
    });
  }
  return;
}

/**
 *
 * @param {Number} code
 * @param {String} message
 */
export function throwError(code, message) {
  const error = new Error(message);
  error.code = code;
  throw error;
}
