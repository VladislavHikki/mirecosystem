import { Router } from "express";
import multer from "multer";
import usersController from "./users.controller.js";
import { uploadAvatar, uploadBackground, uploadTeamPic } from "../../utils/uploader.js";
import middlewareController from "../middleware/middleware.controller.js";

export const usersRouter = new Router();

// Лидеры и рефералка
usersRouter.get("/lastreferrals", usersController.getLastUsers);
usersRouter.get("/franleaders", usersController.getFranLeaders);
usersRouter.get("/refleaders", usersController.getRefLeaders);
usersRouter.get("/referrers/:id", usersController.getProfileReferrers);
usersRouter.get("/refprofile/:id", usersController.getProfileReferalls);
usersRouter.get("/refget", middlewareController.user, usersController.getReferral);
usersRouter.post("/refgen", middlewareController.user, multer().none(), usersController.refreshReferral);

// Пользователь
usersRouter.get("/all", middlewareController.admin, usersController.getAllUsers);
usersRouter.get("/list", middlewareController.admin, usersController.getUserList);
usersRouter.get("/one/:id", middlewareController.user, usersController.getOneUser);
usersRouter.get("/profile/:id", middlewareController.userData, usersController.getProfile);
usersRouter.get("/page/:page", middlewareController.admin, usersController.getUsers);
usersRouter.get("/search/:page", usersController.search);
usersRouter.post("/auth", multer().none(), usersController.auth);
usersRouter.post("/reg", uploadAvatar.single("file"), usersController.reg);
usersRouter.post("/checktoken", middlewareController.user, usersController.userCheck);
usersRouter.put("/update", middlewareController.user, uploadAvatar.single("file"), usersController.updateProfile);
usersRouter.put("/verify", uploadAvatar.single("file"), usersController.verifyUser);
usersRouter.post("/verifycheck", multer().none(), usersController.checkVerify);
usersRouter.delete("/delete", middlewareController.admin, multer().none(), usersController.deleteUser);
usersRouter.put("/hide/:id", middlewareController.admin, multer().none(), usersController.hideUser);
usersRouter.post("/back/create", middlewareController.user, uploadBackground.single("file"), usersController.createBackground);
usersRouter.put("/back/update", middlewareController.user, multer().none(), usersController.updateUserBackground);
usersRouter.get("/back/all", middlewareController.user, usersController.getUserBackground);
usersRouter.delete("/back/delete", middlewareController.user, multer().none(), usersController.deleteBackground);
usersRouter.put("/back/update/one/:id", middlewareController.user, uploadBackground.single("file"), usersController.UpdateOneBackground);

// Тренер
usersRouter.get("/trainerlist", middlewareController.admin, usersController.getTrainerList);
usersRouter.get("/trainers/page/:page", middlewareController.admin, usersController.getTrainers);

// Админ
usersRouter.get("/admins/page/:page", middlewareController.admin, usersController.getAdmins);
usersRouter.get("/adminlist", middlewareController.admin, usersController.getAdminsList);
usersRouter.get("/deltoken", middlewareController.admin, usersController.getDelToken);
usersRouter.post("/gen/deltoken", middlewareController.admin, multer().none(), usersController.refreshDeleteToken);
usersRouter.post("/newadmin", middlewareController.admin, uploadAvatar.single("file"), usersController.createAdmin);
usersRouter.post("/newuser", middlewareController.admin, uploadAvatar.single("file"), usersController.createUser);
usersRouter.put("/tohelper/:id", middlewareController.admin, multer().none(), usersController.toAdminHelper);
usersRouter.put("/delhelper/:id", middlewareController.admin, multer().none(), usersController.delAdminHelper);
usersRouter.put("/changerole/:id", middlewareController.admin, multer().none(), usersController.changeRole);
usersRouter.delete("/del/role/:role/:id", middlewareController.admin, multer().none(), usersController.delRole);

// Спонсоры
usersRouter.get("/sponsor/:id", middlewareController.userData, usersController.getUserSponsors);
usersRouter.get("/allsponsors/:page", usersController.getAllSponsors);
usersRouter.get("/lastsponsors", middlewareController.userData, usersController.getLastSponsors);
usersRouter.get("/sponsorleaders", middlewareController.userData, usersController.getSponsorLeaders);
usersRouter.get("/students", middlewareController.admin, usersController.getStudents);
usersRouter.get("/adminsponsor/:page", middlewareController.admin, usersController.getAdminSponsors);
usersRouter.get("/admstudents/:id/:page", middlewareController.admin, usersController.getAdminSponsorsStudents);
usersRouter.get("/admsponsors/:page", middlewareController.admin, usersController.getAdminSponsors);
usersRouter.post("/createsponsor/:sponsor/:user", middlewareController.admin, multer().none(), usersController.createSponsor);
usersRouter.delete("/sponsors/delete", middlewareController.admin, multer().none(), usersController.deleteSponsor);

// Команды
usersRouter.get("/teams/search/:page", usersController.teamSearch);
usersRouter.get("/teaminfo/:page", middlewareController.user, usersController.teamInfo);
usersRouter.get("/substeams/:id", usersController.getTeamsSubsection);
usersRouter.get("/team/:id", usersController.getOneTeam);
usersRouter.get("/teams/:page", usersController.getTeams);
usersRouter.get("/lastteams", usersController.getLastTeams);
usersRouter.post("/createteam", uploadTeamPic.single("file"), usersController.createTeam);
usersRouter.put("/team/update/:id", middlewareController.user, uploadTeamPic.single("file"), usersController.updateTeam);
usersRouter.put("/team/restore", middlewareController.admin, multer().none(), usersController.restoreTeams);
usersRouter.delete("/team/delete", middlewareController.user, multer().none(), usersController.deleteTeams);

// Кураторы
usersRouter.get("/curators/list", middlewareController.user, usersController.getListCurators);
usersRouter.get("/curators/all/:page", middlewareController.admin, usersController.getAllCurators);

// Транзакции
usersRouter.post("/sendpoints", middlewareController.idempotent, middlewareController.user, multer().none(), usersController.sendPoints);
usersRouter.get("/allpoints/:page", middlewareController.admin, multer().none(), usersController.getAllPoints);
usersRouter.get("/mypoints/:role/:page", middlewareController.user, usersController.getMyPoints);
usersRouter.post("/lemons/release", middlewareController.admin, multer().none(), usersController.lemonsRelease);

// Уведомления
usersRouter.get("/notifications", middlewareController.user, usersController.getNotifications);
