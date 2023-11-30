import { Sequelize } from "sequelize";
import { validateError } from "../../utils/customValidation.js";
import { User } from "../users/users.model.js";
import { Service, ServiceSaves, ServiceTypes } from "./services.model.js";
import fs from "fs";

class ServicesController {
  // Сервисы
  async getAllServices(req, res) {
    try {
      const page = Number(req.params.page) ? Number(req.params.page) : 1;
      const limit = Number(req.query.limit) ? Number(req.query.limit) : 30;
      const services = await Service.findAndCountAll({
        limit: limit,
        offset: limit * (page - 1),
      });
      const pages = Math.ceil(services.count / limit);
      return res.status(200).json({ pages, services });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async getServicesByType(req, res) {
    try {
      const { user } = req;
      const { label } = req.query;
      const where = [{}];
      const attributes = { include: [] };
      if (label) where[0].label = label;
      if (user) {
        attributes.include.push([Sequelize.literal(`(SELECT createdAt FROM services_saves WHERE serviceId = services.id AND userId = ${user.id})`), "saved"]);
      } else {
        attributes.include.push([Sequelize.literal("(SELECT NULL)"), "saved"]);
      }
      const services = await ServiceTypes.findAll({
        where,
        attributes: {
          include: [[Sequelize.literal("(SELECT COUNT(services.id) FROM services WHERE services.typeId = services_types.id)"), "serviceCount"]],
        },
        include: [{ model: Service, attributes }],
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json(services);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async createService(req, res) {
    try {
      const { file } = req;
      const { label, url, active, typeId } = req.body;
      const serviceType = await ServiceTypes.findByPk(typeId);
      if (!serviceType) throw new Error("Не найдено!");
      const created = await Service.create({
        label: label,
        url: url,
        picture: file?.filename ? `${file.destination}${file.filename}` : undefined,
        active: active,
        typeId: typeId,
      });
      if (!created) throw new Error("Ошибка при создании сервиса");
      return res.status(201).json({ msg: "Создано!" });
    } catch (e) {
      const { file } = req;
      console.error(e);
      if (file?.filename) fs.unlinkSync(file.destination + file.filename);
      return res.status(500).json(validateError(e));
    }
  }
  async updateService(req, res) {
    try {
      const { file } = req;
      const { label, url, active, typeId } = req.body;
      const { id } = req.params;

      if (!(await ServiceTypes.findByPk(typeId))) throw new Error("Тип сервиса не найден!");

      const toUpdate = await Service.findOne({
        where: {
          id,
        },
      });
      if (!toUpdate) throw new Error("Не найдено!");
      const toDelete = toUpdate?.picture ? toUpdate.picture : undefined;

      const updated = await toUpdate.update({
        label,
        url,
        active,
        typeId,
        picture: file?.filename ? file.destination + file.filename : undefined,
      });
      if (!updated) throw new Error("Ошибка при создании!");
      if (file) {
        if (fs.existsSync(toDelete)) fs.unlinkSync(toDelete);
      }
      return res.status(200).json({ msg: "Обновлено!" });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async deleteService(req, res) {
    try {
      const { id } = req.params;
      const toDelete = await Service.findOne({
        where: {
          id,
        },
      });
      if (!toDelete) throw new Error("Не найдено!");
      const fileToDelete = toDelete?.picture ? toDelete.picture : undefined;
      const deleted = await toDelete.destroy({ hooks: true });
      if (!deleted) throw new Error("Ошибка при удалении сервиса!");
      if (fileToDelete) {
        if (fs.existsSync(fileToDelete)) fs.unlinkSync(fileToDelete);
      }
      return res.status(200).json({ msg: "Удалено!" });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  // Типы сервисов
  async getServicesTypes(req, res) {
    try {
      const page = Number(req.params.page) ? Number(req.params.page) : 1;
      const limit = Number(req.query.limit) ? Number(req.query.limit) : 30;
      const serviceTypes = await ServiceTypes.findAndCountAll({
        limit: limit,
        offset: limit * (page - 1),
        order: [["createdAt", "DESC"]],
      });
      const pages = Math.ceil(serviceTypes.count / limit);
      return res.status(200).json({ pages, serviceTypes });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async createType(req, res) {
    try {
      const { label } = req.body;
      const created = await ServiceTypes.create({
        label,
      });
      if (!created) throw new Error("Ошибка при создании!");
      return res.status(201).json({ msg: "Создано!" });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async updateType(req, res) {
    try {
      const { id } = req.params;
      const { label } = req.body;
      const toUpdate = await ServiceTypes.findOne({
        where: {
          id,
        },
      });
      if (!toUpdate) throw new Error("Не найдено!");
      const updated = await toUpdate.update({
        label,
      });
      if (!updated) throw new Error("Ошибка при обновлении!");
      return res.status(200).json({ msg: "Обновлено!" });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async deleteType(req, res) {
    try {
      const { id } = req.params;
      const toDelete = await ServiceTypes.findOne({
        where: {
          id,
        },
      });
      if (!toDelete) throw new Error("Не найдено!");
      const deleted = await toDelete.destroy({ hooks: true });
      if (!deleted) throw new Error("Ошибка при удалении сервиса!");
      return res.status(200).json({ msg: "Удалено!" });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  // Избранное
  async getSavesServices(req, res) {
    try {
      const { user } = req;
      const savedsServices = await Service.findAll({
        attributes: {
          include: [["createdAt", "saved"]],
        },
        include: { model: User, attributes: [], where: { id: user.id } },
        order: [["label", "ASC"]],
      });
      return res.status(200).json(savedsServices);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async saveService(req, res) {
    try {
      const { user } = req;
      const { serviceId } = req.body;
      const service = await Service.findByPk(serviceId);
      if (!service) throw new Error("Не найдено!");

      const foundSavedsServices = await ServiceSaves.findOne({
        where: { userId: user.id, serviceId },
      });
      if (foundSavedsServices) {
        const deleted = await foundSavedsServices.destroy();
        if (!deleted) throw new Error("Ошибка при удалении сохраненного сервиса");
        return res.status(200).json({ msg: "Успешно удалено!" });
      }

      const created = await ServiceSaves.create({
        userId: user.id,
        serviceId,
      });
      if (!created) throw new Error("Ошибка при добавлении в избранное!");

      return res.status(201).json({ msg: "Успешно создано!" });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
}

export default new ServicesController();
