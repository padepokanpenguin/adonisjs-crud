import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { v4 as uuidV4 } from "uuid";
import MedicalRecord from "App/Models/MedicalRecord";
import CreateMedicalRecordValidator from "App/Validators/CreateMedicalRecordValidator";
import UpdateMedicalRecordValidator from "App/Validators/UpdateMedicalRecordValidator";

export default class MedicalRecordsController {
  public async index({ response, params }: HttpContextContract) {
    try {
      const { patient_id } = params;
      const data = await MedicalRecord.query()
        .preload("patient")
        .where("patient_id", "=", patient_id);
      console.log(patient_id);

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
      const payload = await request.validate(CreateMedicalRecordValidator);
      payload["id"] = uuidV4();
      const data = await MedicalRecord.create(payload);

      response.created({ message: "Berhasil membuat data", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await MedicalRecord.query()
        .preload("patient")
        .where("id", "=", id);

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

      const payload = await request.validate(UpdateMedicalRecordValidator);
      const data = await MedicalRecord.findByOrFail("id", id);
      await data.merge(payload).save();

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
