import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MedicalRecord from "App/Models/MedicalRecord";

export default class MedicalRecordsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await MedicalRecord.query()
        .preload("patient")
        .preload("doctor");

      response.created({
        message: "Berhasil mengambil data Medical Record",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const newData = request.body();

      const data = await MedicalRecord.create(newData);

      response.created({ message: "Berhasil membuat data", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await MedicalRecord.findByOrFail("id", id);
      await data.load("patient", (q) => q.select("*"));

      response.created({
        message: "Berhasil mengambil data detail medical record",
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
      const data = await MedicalRecord.findByOrFail("id", id);
      await data.merge(updateData).save();

      response.created({ message: "Berhasil memperbarui data", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data = await MedicalRecord.findByOrFail("id", id);
      await data.delete();

      response.created({ message: "Berhasil menghapus data" });
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
