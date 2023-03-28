import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
// import Database from "@ioc:Adonis/Lucid/Database";
import { v4 as uuidV4 } from "uuid";
// import { TABLE_NAME } from "App/Utils/helper";
import Clinic from "App/Models/Clinic";
import CreateClinicValidator from "App/Validators/CreateClinicValidator";
import UpdateClinicValidator from "App/Validators/UpdateClinicValidator";
import { DateTime } from "luxon";

export default class ClinicsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Clinic.query()
        .preload("doctor", (query) =>
          query.preload("employee", (q) =>
            q.select("id", "name", "username", "role", "join_date", "email")
          )
        )
        .withAggregate("clinicQueue", (cq) => {
          cq.count("*").as("total_queues");
          cq.whereRaw(
            `created_at::date = ${DateTime.now().toFormat("yyyy-MM-dd")}::date`
          );
        });

      response.created({ message: "Berhasil mengambil data klinik ", data });
    } catch (e) {
      response.send({ message: e.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateClinicValidator);
      payload["id"] = uuidV4();

      const data = await Clinic.create(payload);

      response.created({ message: "Berhasil membuat data", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Clinic.findByOrFail("id", id);

      response.created({ message: "Berhasil mengambil data klinik ", data });
    } catch (e) {
      response.send({ message: e.message });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const payload = await request.validate(UpdateClinicValidator);
      const data = await Clinic.findByOrFail("id", id);
      await data.merge(payload).save();

      response.created({ messsage: "Data berhasil diupdate", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Clinic.findByOrFail("id", id);
      await data.delete();

      response.created({
        message: "Data klinik berhasil dihapus",
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
