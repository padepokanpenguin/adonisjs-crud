import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ResponseError } from "App/Exceptions/ResponseError";
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
      ResponseError.handler(error, response, "RegistrationQueues Co ln:17");
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateRegistrationQueueValidator);

      const data = await RegistrationQueue.create(payload);

      response.created({
        message: "Berhasil membuat data antrian registrasi",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "RegistrationQueues Co ln:32");
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await RegistrationQueue.query()
        .select("*")
        .where("id", "=", id)
        .firstOrFail();

      response.created({
        message: "Berhasil mendapatkan data detail antrian",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "RegistrationQueues Co ln:47");
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
      ResponseError.handler(error, response, "RegistrationQueues Co ln:61");
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await RegistrationQueue.findByOrFail("id", id);
      await data.delete();

      response.created({ message: "Berhasil menghapus data antrian" });
    } catch (error) {
      ResponseError.handler(error, response, "RegistrationQueues Co ln:74");
    }
  }
}
