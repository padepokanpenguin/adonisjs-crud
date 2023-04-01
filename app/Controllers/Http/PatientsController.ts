import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Patient from "App/Models/Patient";
import CreatePatientValidator from "App/Validators/CreatePatientValidator";
import UpdatePatientValidator from "App/Validators/UpdatePatientValidator";
import { DateTime } from "luxon";
import { ResponseError } from "App/Exceptions/ResponseError";
import ImageProfileValidator from "App/Validators/ImageProfileValidator";
export default class PatientsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Patient.query()
        .select("name", "email", "username", "email", "status")
        .preload("employee", (query) =>
          query.select("id", "name", "username", "role", "join_date", "email")
        );

      response.created({ message: "Berhasil mengambil data pasien", data });
    } catch (error) {
      ResponseError.handler(error, response, "Patients Co ln:18");
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreatePatientValidator);

      const data = await Patient.create(payload);

      response.created({ message: "Berhasil menambahkan data pasien", data });
    } catch (error) {
      ResponseError.handler(error, response, "Patients Co ln:31");
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Patient.query()
        .select(
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
        .where("id", "=", id)
        .firstOrFail();

      response.created({
        message: "Berhasil mendapatkan detail pasien",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Patients Co ln:46");
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
      ResponseError.handler(error, response, "Patients Co ln:60");
    }
  }

  public async updloadImage({
    request,
    response,
    params,
  }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(ImageProfileValidator);
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
      ResponseError.handler(error, response, "Patients Co ln:93");
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Patient.findByOrFail("id", id);
      await data.delete();

      response.created({ message: "Data berhasil dihapus" });
    } catch (error) {
      ResponseError.handler(error, response, "Patients Co ln:106");
    }
  }
}
