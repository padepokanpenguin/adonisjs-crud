import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import { v4 as uuidV4 } from "uuid";
import Patient from "App/Models/Patient";
import CreatePatientValidator from "App/Validators/CreatePatientValidator";
import UpdatePatientValidator from "App/Validators/UpdatePatientValidator";
import { DateTime } from "luxon";
import UploadImagePatientValidator from "App/Validators/UploadImagePatientValidator";
export default class PatientsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Patient.query().preload("employee");

      response.created({ message: "Berhasil mengambil data pasien", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreatePatientValidator);
      payload["id"] = uuidV4();

      const data = await Patient.create(payload);

      response.created({ message: "Berhasil menambahkan data pasien", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Patient.findByOrFail("id", id);

      response.created({
        message: "Berhasil mendapatkan detail pasien",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const payload = await request.validate(UpdatePatientValidator);

      const data = await Patient.findByOrFail("id", id);
      await data.merge(payload).save();

      response.created({ message: "Data pasien berhasil diupdate", data });
    } catch (error) {
      response.badRequest({ message: error.message });
    }
  }

  public async updloadImage({
    request,
    response,
    params,
  }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UploadImagePatientValidator);
      const imageName =
        DateTime.now().toUnixInteger() +
        "_patient." +
        payload.imageProfile.extname;

      if (payload.imageProfile) {
        await payload.imageProfile.moveToDisk("patients", {
          name: imageName,
        });
      }

      const url =
        "http://127.0.0.1:3333" + (await Drive.getUrl("patients/" + imageName));
      const data = await Patient.findByOrFail("id", id);

      if (data.imageId) {
        await Drive.delete("patients/" + data.imageId);
      }
      await data.merge({ imageId: imageName }).save();
      response.ok({ message: "Image berhasil di upload", data, url });
    } catch (error) {
      console.log(error);
      response.send({ message: error });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Patient.findByOrFail("id", id);
      await data.delete();

      response.created({ message: "Data berhasil dihapus" });
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
