import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import { DateTime } from "luxon";
import Employee from "App/Models/Employee";
import NewEmployeeValidator from "App/Validators/NewEmployeeValidator";
import UpdateEmployeeValidator from "App/Validators/UpdateEmployeeValidator";

import { ResponseError } from "App/Exceptions/ResponseError";
import ImageProfileValidator from "App/Validators/ImageProfileValidator";

export default class EmployeesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { keyword = "" } = request.qs();

      const data = await Employee.query()
        .select("id", "name", "username", "role", "join_date", "email")
        .preload("doctor", (query) =>
          query.select("id", "license_number", "fee")
        )
        .preload("pharmacist", (query) => query.select("license_number"))
        .whereILike("name", `%${keyword}%`);

      response.ok({
        message: "Berhasil meraih employee route",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Employees Co ln:27");
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(NewEmployeeValidator);

      const newEmplo = await Employee.create(payload);

      response.created({
        message: "Berhasil menyimpan data employee baru",
        data: newEmplo,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Employees Co ln:43");
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Employee.query()
        .select(
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
        .where("id", "=", id)
        .firstOrFail();

      response.created({
        message: "Berhasil mengambil data details",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Employees Co ln:57");
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const payload = await request.validate(UpdateEmployeeValidator);

      const data = await Employee.findByOrFail("id", id);
      await data.merge(payload).save();

      response.created({
        message: "data berhasil di update",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Employees Co ln:75");
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
        "_employee." +
        payload.imageProfile.extname;

      if (payload.imageProfile) {
        await payload.imageProfile.moveToDisk("employees", {
          name: imageName,
        });
      }

      const url =
        "http://127.0.0.1:3333" +
        (await Drive.getUrl("employees/" + imageName));
      const data = await Employee.findByOrFail("id", id);

      if (data.imageId) {
        await Drive.delete("employees/" + data.imageId);
      }
      await data.merge({ imageId: imageName }).save();
      response.ok({ message: "Image berhasil di upload", data, url });
    } catch (error) {
      ResponseError.handler(error, response, "Employees Co ln:109");
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Employee.findByOrFail("id", id);
      await data.delete();

      response.created({
        message: "Data berhasil dihapus",
      });
    } catch (error) {
      ResponseError.handler(error, response, "Employees Co ln:124");
    }
  }
}
