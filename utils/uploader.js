import multer from "multer";
import uniqid from "uniqid";
import path from "path";
import fs from "fs";

const forbidArr = ["application/x-msdownload"];

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/avatars/`);
  },
  filename: (req, file, cb) => {
    cb(null, uniqid() + path.extname(file.originalname));
  },
});

const resourcespicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/resourcespics/`);
  },
  filename: (req, file, cb) => {
    const name = uniqid() + path.extname(file.originalname);
    const fullPath = `public/resourcespics/${name}`;
    cb(null, name);
    req.on("aborted", () => {
      file.stream.on("end", () => {
        fs.unlink(fullPath, (err) => {});
      });
      file.stream.emit("end");
    });
  },
});

const teamspicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/teamspics/`);
  },
  filename: (req, file, cb) => {
    cb(null, uniqid() + path.extname(file.originalname));
  },
});

const franchisespicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/franchisespics/`);
  },
  filename: (req, file, cb) => {
    cb(null, uniqid() + path.extname(file.originalname));
  },
});

const projectspicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/projectspics/`);
  },
  filename: (req, file, cb) => {
    cb(null, uniqid() + path.extname(file.originalname));
  },
});

const subsectionspicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/subsectionspics/`);
  },
  filename: (req, file, cb) => {
    cb(null, uniqid() + path.extname(file.originalname));
  },
});

const triadsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/triads/`);
  },
  filename: (req, file, cb) => {
    const name = uniqid() + path.extname(file.originalname);
    const fullPath = `public/triads/${name}`;
    cb(null, name);
    req.on("aborted", () => {
      file.stream.on("end", () => {
        fs.unlink(fullPath, (err) => {});
      });
      file.stream.emit("end");
    });
  },
});

const servicesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/services/`);
  },
  filename: (req, file, cb) => {
    const name = uniqid() + path.extname(file.originalname);
    const fullPath = `public/services/${name}`;
    cb(null, name);
    req.on("aborted", () => {
      file.stream.on("end", () => {
        fs.unlink(fullPath, (err) => {});
      });
      file.stream.emit("end");
    });
  },
});

const attachFields = {
  attachments: { folder: "" },
  preview: { folder: "previews" },
  media: { folder: "media" },
  familyImg: { folder: "family" },
  petsImg: { folder: "pets" },
  transportImg: { folder: "transport" },
  idolsImg: { folder: "idols" },
};

const attachStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { user } = req;
    let fullPath = `public/attachments/${user.id}`;
    if (attachFields[file.fieldname]) {
      if (!fs.existsSync(`public/attachments/${user.id}`)) fs.mkdirSync(`public/attachments/${user.id}`);
      if (attachFields[file.fieldname].folder !== "") {
        if (!fs.existsSync(`public/attachments/${user.id}/${attachFields[file.fieldname].folder}`)) {
          fs.mkdirSync(`public/attachments/${user.id}/${attachFields[file.fieldname].folder}`);
        }
        fullPath += `/${attachFields[file.fieldname].folder}`;
      }
      cb(null, fullPath);
    }
    // if (file.fieldname == "attachments") {
    //   if (!fs.existsSync(`public/attachments/${user.id}`)) fs.mkdirSync(`public/attachments/${user.id}`);
    //   cb(null, `public/attachments/${user.id}`);
    // } else if (file.fieldname == "preview") {
    //   if (!fs.existsSync(`public/attachments/${user.id}`)) fs.mkdirSync(`public/attachments/${user.id}`);
    //   if (!fs.existsSync(`public/attachments/${user.id}/previews`)) fs.mkdirSync(`public/attachments/${user.id}/previews`);
    //   cb(null, `public/attachments/${user.id}/previews`);
    // }
  },
  filename: (req, file, cb) => {
    const { user } = req;
    const name = uniqid() + path.extname(file.originalname);
    let fullPath = `public/attachments/${user.id}/${name}`;
    if (file.fieldname == "preview") fullPath = `public/attachments/${user.id}/previews/${name}`;
    cb(null, name);
    req.on("aborted", () => {
      file.stream.on("end", () => {
        fs.unlink(fullPath, (err) => {});
      });
      file.stream.emit("end");
    });
  },
});

const currencyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/currencypics`);
  },
  filename: (req, file, cb) => {
    const name = uniqid() + path.extname(file.originalname);
    const fullPath = `public/currencypics/${name}`;
    cb(null, name);
    req.on("aborted", () => {
      file.stream.on("end", () => {
        fs.unlink(fullPath, (err) => {});
      });
      file.stream.emit("end");
    });
  },
});

const backgroundStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/backgrounds`);
  },
  filename: (req, file, cb) => {
    const name = uniqid() + path.extname(file.originalname);
    const fullPath = `public/backgrounds/${name}`;
    cb(null, name);
    req.on("aborted", () => {
      file.stream.on("end", () => {
        fs.unlink(fullPath, (err) => {});
      });
      file.stream.emit("end");
    });
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/svg+xml") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const attachFilter = (req, file, cb) => {
  if (forbidArr.includes(file.mimetype)) {
    cb("Запрещенный формат файла", false);
  } else {
    cb(null, true);
  }
};

export const uploadAvatar = multer({ storage: avatarStorage, fileFilter: filter });
export const uploadResourcePic = multer({ storage: resourcespicStorage, fileFilter: filter });
export const uploadTeamPic = multer({ storage: teamspicStorage, fileFilter: filter });
export const uploadFranPic = multer({ storage: franchisespicStorage, fileFilter: filter });
export const uploadProjPic = multer({ storage: projectspicStorage, fileFilter: filter });
export const uploadSubsecPic = multer({ storage: subsectionspicStorage, fileFilter: filter });
export const uploadAttachment = multer({ storage: attachStorage, fileFilter: attachFilter, limits: { fileSize: 1024 * 1024 * 1024 } });
export const uploadCurrency = multer({ storage: currencyStorage, fileFilter: filter });
export const uploadBackground = multer({ storage: backgroundStorage, fileFilter: filter });
export const uploadTriad = multer({ storage: triadsStorage, fileFilter: filter });
export const uploadService = multer({ storage: servicesStorage, fileFilter: filter });
