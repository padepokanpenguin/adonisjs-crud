import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Doctor from "App/Models/Doctor";
import CreateDoctorValidator from "App/Validators/CreateDoctorValidator";
import UpdateDoctorValidator from "App/Validators/UpdateDoctorValidator";
import UploadImageDoctorValidator from "App/Validators/UploadImageDoctorValidator";
import { DateTime } from "luxon";
import { v4 as uuidV4 } from "uuid";

export default class DoctorsController {
  public async index({ response }: HttpContextContract) {
    try {
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
      const payload = await request.validate(CreateDoctorValidator);
      payload["id"] = uuidV4();

      const data = await Doctor.create(payload);

      response.created({ message: "Berhasil membuat data doctor", data });
    } catch (error) {
      response.send({ error: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Doctor.findByOrFail("id", id);
      await data.load("employee", (q) =>
        q.select("id", "name", "username", "role", "join_date", "email")
      );
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

      const payload = await request.validate(UpdateDoctorValidator);

      const data = await Doctor.findByOrFail("id", id);
      await data.merge(payload).save();

      response.created({ message: "Doctor berhasil diupdate", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async updloadImage({
    request,
    response,
    params,
  }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UploadImageDoctorValidator);
      const imageName =
        DateTime.now().toUnixInteger() +
        "_doctor." +
        payload.imageProfile.extname;

      if (payload.imageProfile) {
        await payload.imageProfile.moveToDisk("doctors", {
          name: imageName,
        });
      }

      const url =
        "http://127.0.0.1:3333" + (await Drive.getUrl("doctors/" + imageName));
      const data = await Doctor.findByOrFail("id", id);

      if (data.imageId) {
        await Drive.delete("doctors/" + data.imageId);
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
