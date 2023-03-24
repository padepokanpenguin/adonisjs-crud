import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { v4 as uuidV4 } from "uuid";
import RegistrationQueue from "App/Models/RegistrationQueue";
import CreateRegistrationQueueValidator from "App/Validators/CreateRegistrationQueueValidator";
import UpdateRegistrationQueueValidator from "App/Validators/UpdateRegistrationQueueValidator";

export default class RegistrationQueuesController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await RegistrationQueue.query().preload("clinic");

      response.created({
        message: "Berhasil mendapatkan data antrian pendaftaran",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateRegistrationQueueValidator);
      payload["id"] = uuidV4();

      const data = await RegistrationQueue.create(payload);

      response.created({
        message: "Berhasil membuat data antrian registrasi",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await RegistrationQueue.findByOrFail("id", id);

      response.created({
        message: "Berhasil mendapatkan data detail antrian",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdateRegistrationQueueValidator);

      const data = await RegistrationQueue.findByOrFail("id", id);
      await data.merge(payload).save();

      response.created({ message: "Berhasil mengupdate data antrian", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await RegistrationQueue.findByOrFail("id", id);
      await data.delete();

      response.created({ message: "Berhasil menghapus data antrian" });
    } catch (error) {
      response.send({ message: "Berhasi;l menghapus data antrian" });
    }
  }
}
