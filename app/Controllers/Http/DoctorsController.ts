import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
// import Database from "@ioc:Adonis/Lucid/Database";
import Doctor from "App/Models/Doctor";
// import { TABLE_NAME } from "App/Utils/helper";
import { v4 as uuidV4 } from "uuid";

export default class DoctorsController {
  public async index({ response }: HttpContextContract) {
    try {
      // const data = await Database.from(TABLE_NAME.employee)
      //   .join(TABLE_NAME.doctor, (query) => {
      //     query.on(
      //       `${TABLE_NAME.employee}.id`,
      //       "=",
      //       `${TABLE_NAME.doctor}.employee_id`
      //     );
      //   })
      //   .select(`${TABLE_NAME.doctor}.id`)
      //   .select(`${TABLE_NAME.doctor}.employee_id`)
      //   .select(`${TABLE_NAME.employee}.name`)
      //   .select(`${TABLE_NAME.employee}.username`)
      //   .select(`${TABLE_NAME.doctor}.license_number`)
      //   .select(`${TABLE_NAME.employee}.specialization`)
      //   .select(`${TABLE_NAME.employee}.hire_date`)
      //   .select(`${TABLE_NAME.doctor}.tarif`);

      const data = await Doctor.query()
        .preload("employee", (query) =>
          query.select("id", "name", "username", "role", "join_date", "email")
        )
        .preload("clinic", (query) =>
          query.select("name", "room", "daily_quota")
        );

      response.send({ message: "Berhasil mendapatkan data doctors", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const doctorsData = request.body();
      doctorsData["id"] = uuidV4();

      // const data = await Database.table(TABLE_NAME.doctor)
      //   .insert(doctorsData)
      //   .returning("*");
      const data = await Doctor.create(doctorsData);

      response.created({ message: "Berhasil membuat data doctor", data });
    } catch (error) {
      response.send({ error: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      // const data = await Database.from(TABLE_NAME.employee)
      //   .join(TABLE_NAME.doctor, (query) => {
      //     query.on(
      //       `${TABLE_NAME.employee}.id`,
      //       "=",
      //       `${TABLE_NAME.doctor}.employee_id`
      //     );
      //   })
      //   .where(`${TABLE_NAME.doctor}.id`, id)
      //   .select(`${TABLE_NAME.doctor}.id`)
      //   .select(`${TABLE_NAME.doctor}.employee_id`)
      //   .select(`${TABLE_NAME.employee}.name`)
      //   .select(`${TABLE_NAME.employee}.username`)
      //   .select(`${TABLE_NAME.doctor}.license_number`)
      //   .select(`${TABLE_NAME.employee}.specialization`)
      //   .select(`${TABLE_NAME.employee}.hire_date`)
      //   .select(`${TABLE_NAME.doctor}.tarif`);

      const data = await Doctor.findByOrFail("id", id);
      await data.load("employee", (q) => q.select("id", "name", "username", "role", "join_date", "email"));
      response.created({
        message: "Berhasil mengambil data detail doctor",
        data: data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const updateDoctor = request.body();

      // const data = await Database.from(TABLE_NAME.doctor)
      //   .where("id", id)
      //   .update(updateDoctor, "*");

      const data = await Doctor.findByOrFail("id", id);
      await data.merge(updateDoctor).save();

      response.created({ message: "Doctor berhasil diupdate", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      // const data_yang_dihapus = await Database.from(TABLE_NAME.doctor)
      //   .where("id", id)
      //   .delete();

      const data = await Doctor.findByOrFail("id", id);
      await data.delete();

      response.created({
        message: "Data berhasil dihapus",
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
