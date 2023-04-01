import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Doctor from "App/Models/Doctor";
import CreateDoctorValidator from "App/Validators/CreateDoctorValidator";
import UpdateDoctorValidator from "App/Validators/UpdateDoctorValidator";
import { DateTime } from "luxon";
import { ResponseError } from "App/Exceptions/ResponseError";
import ImageProfileValidator from "App/Validators/ImageProfileValidator";

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
      ResponseError.handler(error, response, "Doctors Co ln:23");
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateDoctorValidator);

      const data = await Doctor.create(payload);

      response.created({ message: "Berhasil membuat data doctor", data });
    } catch (error) {
      ResponseError.handler(error, response, "Doctors Co ln:35");
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Doctor.findByOrFail("id", id);
      await data.load("employee", (q) =>
        q.select(
          "id",
          "name",
          "username",
          "role",
          "join_date",
          "email",
          "specialization",
          "phone_number",
          "address"
        )
      );
      response.created({
        message: "Berhasil mengambil data detail doctor",
        data: data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Doctors Co ln:52");
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
      ResponseError.handler(error, response, "Doctors Co ln:67");
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
      ResponseError.handler(error, response, "Doctors Co ln:100");
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
      ResponseError.handler(error, response, "Doctors Co ln:114");
    }
  }
}
