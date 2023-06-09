import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ResponseError } from "App/Exceptions/ResponseError";
import Clinic from "App/Models/Clinic";
import ClinicQueue from "App/Models/ClinicQueue";
import CreateClinicQueueValidator from "App/Validators/CreateClinicQueueValidator";
import UpdateClinicQueueValidator from "App/Validators/UpdateClinicQueueValidator";
import { DateTime } from "luxon";

export default class ClinicQueuesController {
  public async index({ response, params }: HttpContextContract) {
    try {
      const { clinic_id } = params;

      const data = await ClinicQueue.query()
        .preload("clinic")
        .preload("patient", (q) =>
          q.select(
            "regist_by",
            "name",
            "email",
            "username",
            "email",
            "status",
            "gender"
          )
        )
        .where("clinic_id", "=", clinic_id);

      response.created({
        message: "Berhasil mengambil data antrian klinik",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "ClinicQueue Co ln:34");
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    try {
      const { clinic_id } = params;
      const payload = await request.validate(CreateClinicQueueValidator);
      payload["clinic_id"] = clinic_id;

      const clinic = await Clinic.query()
        .preload("doctor", (query) =>
          query.preload("employee", (q) =>
            q.select("id", "name", "username", "role", "join_date", "email")
          )
        )
        .preload("clinicQueue", (cq) => {
          cq.whereRaw(
            `created_at::date = '${DateTime.now().toFormat(
              "yyyy-MM-dd"
            )}'::date`
          );
        })
        .firstOrFail();

      if (clinic.$extras["total_queues"] >= clinic.dailyQuota) {
        response.badRequest({ message: "Kuota Penuh" });
      }
      const data = await ClinicQueue.create(payload);

      response.created({
        message: "Data antrian klinik berhasil dibuat",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "ClinicQueue Co ln:69");
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await ClinicQueue.query()
        .preload("patient", (q) =>
          q.select(
            "regist_by",
            "name",
            "email",
            "username",
            "email",
            "status",
            "gender",
            "address",
            "phone_number",
            "birth_date"
          )
        )
        .where("id", "=", id)
        .firstOrFail();
      response.created({
        message: "Berhasil mendapatkan detail data antrian clinic",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "ClinicQueue Co ln:95");
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdateClinicQueueValidator);

      const data = await ClinicQueue.findByOrFail("id", id);
      await data.merge(payload).save();

      response.created({ message: "Berhasil memperbarui data", data });
    } catch (error) {
      ResponseError.handler(error, response, "ClinicQueue Co ln:109");
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data = await ClinicQueue.findByOrFail("id", id);
      await data.delete();

      response.created({ message: "Berhasil Menghapus data" });
    } catch (error) {
      ResponseError.handler(error, response, "ClinicQueue Co ln:121");
    }
  }
}
