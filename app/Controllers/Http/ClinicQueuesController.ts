import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ClinicQueue from "App/Models/ClinicQueue";
import CreateClinicQueueValidator from "App/Validators/CreateClinicQueueValidator";
import UpdateClinicQueueValidator from "App/Validators/UpdateClinicQueueValidator";
import { v4 as uuidV4 } from "uuid";

export default class ClinicQueuesController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await ClinicQueue.query()
        .preload("clinic")
        .preload("patient")
        .preload("registrationQueue");

      response.created({
        message: "Berhasil mengambil data antrian klinik",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateClinicQueueValidator);
      payload["id"] = uuidV4();

      const data = await ClinicQueue.create(payload);

      response.created({
        message: "Data antrian klinik berhasil dibuat",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await ClinicQueue.findByOrFail("id", id);
      response.created({
        message: "Berhasil mendapatkan detail data antrian clinic",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
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
      response.send({ message: error.message });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data = await ClinicQueue.findByOrFail("id", id);
      await data.delete();

      response.created({ message: "Berhasil Menghapus data" });
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
