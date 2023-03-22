import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { v4 as uuidV4 } from "uuid";
import { TABLE_NAME } from "App/Utils/helper";

export default class ClinicsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Database.from(TABLE_NAME.clinic)
        .join(TABLE_NAME.doctor, (query) => {
          query.on(
            `${TABLE_NAME.doctor}.id`,
            "=",
            `${TABLE_NAME.clinic}.doctor_id`
          );
        })
        .join(TABLE_NAME.employee, (query) => {
          query.on(
            `${TABLE_NAME.employee}.id`,
            "=",
            `${TABLE_NAME.doctor}.employee_id`
          );
        })
        .select(`${TABLE_NAME.clinic}.id`)
        .select(`${TABLE_NAME.clinic}.doctor_id`)
        .select(`${TABLE_NAME.doctor}.employee_id`)
        .select(`${TABLE_NAME.clinic}.name as clinic_name`)
        .select(`${TABLE_NAME.employee}.name as employee_name`)
        .select(`${TABLE_NAME.employee}.username as employee_username`)
        .select(`${TABLE_NAME.employee}.hire_date`)
        .select(`${TABLE_NAME.doctor}.license_number`)
        .select(`${TABLE_NAME.employee}.specialization`)
        .select(`${TABLE_NAME.clinic}.limit`)
        .select(`${TABLE_NAME.clinic}.room`)
        .select(`${TABLE_NAME.doctor}.tarif`);

      response.created({ message: "Berhasil mengambil data klinik ", data });
    } catch (e) {
      response.send({ message: e.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const newPoly = request.body();
      newPoly["id"] = uuidV4();

      const data = await Database.table(TABLE_NAME.clinic)
        .insert(newPoly)
        .returning("*");

      response.created({ message: "Berhasil membuat data", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data = await Database.from(TABLE_NAME.clinic)
        .join(TABLE_NAME.doctor, (query) => {
          query.on(
            `${TABLE_NAME.doctor}.id`,
            "=",
            `${TABLE_NAME.clinic}.doctor_id`
          );
        })
        .join(TABLE_NAME.employee, (query) => {
          query.on(
            `${TABLE_NAME.employee}.id`,
            "=",
            `${TABLE_NAME.doctor}.employee_id`
          );
        })
        .where(`${TABLE_NAME.clinic}.id`, id)
        .select(`${TABLE_NAME.clinic}.id`)
        .select(`${TABLE_NAME.clinic}.doctor_id`)
        .select(`${TABLE_NAME.doctor}.employee_id`)
        .select(`${TABLE_NAME.clinic}.name as clinic_name`)
        .select(`${TABLE_NAME.employee}.name as employee_name`)
        .select(`${TABLE_NAME.employee}.username as employee_username`)
        .select(`${TABLE_NAME.doctor}.license_number`)
        .select(`${TABLE_NAME.employee}.specialization`)
        .select(`${TABLE_NAME.employee}.hire_date`)
        .select(`${TABLE_NAME.clinic}.limit`)
        .select(`${TABLE_NAME.clinic}.room`)
        .select(`${TABLE_NAME.doctor}.tarif`);

      response.created({ message: "Berhasil mengambil data klinik ", data });
    } catch (e) {
      response.send({ message: e.message });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const updateClinic = request.body();
      const data = await Database.from(TABLE_NAME.clinic)
        .where("id", id)
        .update(updateClinic, "*");

      response.created({ messsage: "Data berhasil diupdate", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data_yang_dihapus = await Database.from(TABLE_NAME.clinic)
        .where("id", id)
        .delete();

      response.created({
        message: "Data klinik berhasil dihapus",
        data: { data_yang_dihapus },
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
