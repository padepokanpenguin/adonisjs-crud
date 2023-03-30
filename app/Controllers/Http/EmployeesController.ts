import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import { DateTime } from "luxon";
import { v4 as uuidV4 } from "uuid";
import Employee from "App/Models/Employee";
import NewEmployeeValidator from "App/Validators/NewEmployeeValidator";
import UpdateEmployeeValidator from "App/Validators/UpdateEmployeeValidator";
import UploadImageEmployeeValidator from "App/Validators/UploadImageEmployeeValidator";

export default class EmployeesController {
  public async index({ request, response }: HttpContextContract) {
    const { keyword = "" } = request.qs();

    const data = await Employee.query()
      .select("id", "name", "username", "role", "join_date", "email")
      .preload("doctor", (query) => query.select("id", "license_number", "fee"))
      .preload("pharmacist", (query) => query.select("license_number"))
      .whereILike("name", `%${keyword}%`);

    response.ok({
      message: "Berhasil meraih employee route",
      data,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(NewEmployeeValidator);
      payload["id"] = uuidV4();

      const newEmplo = await Employee.create(payload);

      response.created({
        message: "Berhasil menyimpan data employee baru",
        data: newEmplo,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Employee.findByOrFail("id", id);
      response.created({
        message: "Berhasil mengambil data details",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
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
      console.log(error.message);
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
      const payload = await request.validate(UploadImageEmployeeValidator);
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
        "http://127.0.0.1:3333" + (await Drive.getUrl("employees/" + imageName));
      const data = await Employee.findByOrFail("id", id);

      if (data.imageId) {
        await Drive.delete("employees/" + data.imageId);
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

      const data = await Employee.findByOrFail("id", id);
      await data.delete();

      response.created({
        message: "Data berhasil dihapus",
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
