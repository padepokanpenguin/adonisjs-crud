import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import { DateTime } from "luxon";
import Pharmacist from "App/Models/Pharmacist";
import CreatePharmacistValidator from "App/Validators/CreatePharmacistValidator";
import UpdatePharmacistValidator from "App/Validators/UpdatePharmacistValidator";
import { ResponseError } from "App/Exceptions/ResponseError";
import ImageProfileValidator from "App/Validators/ImageProfileValidator";

export default class PharmacistsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Pharmacist.query().preload("employee", (q) =>
        q.select("id", "name", "username", "role", "join_date", "email")
      );

      response.created({ message: "Berhasil mengambil data Apoteker", data });
    } catch (error) {
      ResponseError.handler(error, response, "Pharmacists Co ln:19");
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreatePharmacistValidator);

      const data = await Pharmacist.create(payload);

      response.created({ message: "Berhasil membuat data apoteker", data });
    } catch (error) {
      ResponseError.handler(error, response, "Pharmacists Co ln:31");
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Pharmacist.query()
        .preload("employee", (q) =>
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
        )
        .where("id", "=", id)
        .firstOrFail();

      response.created({
        message: "Berhasil mengambil data detail apoteker",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Pharmacists Co ln:50");
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const payload = await request.validate(UpdatePharmacistValidator);

      const data = await Pharmacist.findByOrFail("id", id);
      await data.merge(payload).save();

      response.created({ message: "Berhasil memperbarui data apoteker", data });
    } catch (error) {
      ResponseError.handler(error, response, "Pharmacists Co ln:64");
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
        "_pharmacist." +
        payload.imageProfile.extname;

      if (payload.imageProfile) {
        await payload.imageProfile.moveToDisk("pharmacists", {
          name: imageName,
        });
      }

      const url =
        "http://127.0.0.1:3333" +
        (await Drive.getUrl("pharmacists/" + imageName));
      const data = await Pharmacist.findByOrFail("id", id);

      if (data.imageId) {
        await Drive.delete("pharmacists/" + data.imageId);
      }
      await data.merge({ imageId: imageName }).save();
      response.ok({ message: "Image berhasil di upload", data, url });
    } catch (error) {
      ResponseError.handler(error, response, "Pharmacists Co ln:98");
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data = await Pharmacist.findByOrFail("id", id);
      await data.delete();

      response.created({ message: "Berhasil menghapus data apoteker" });
    } catch (error) {
      ResponseError.handler(error, response, "Pharmacists Co ln:110");
    }
  }
}
