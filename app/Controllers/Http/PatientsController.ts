import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { v4 as uuidV4 } from "uuid";
import Patient from "App/Models/Patient";

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
      const newPatient = request.body();
      newPatient["id"] = uuidV4();

      const data = await Patient.create(newPatient);

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

      const updateData = request.body();

      const data = await Patient.findByOrFail("id", id);
      await data.merge(updateData).save();

      response.created({ message: "Data pasien berhasil diupdate", data });
    } catch (error) {
      response.send({ message: error.message });
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
