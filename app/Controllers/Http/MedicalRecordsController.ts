import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ResponseError } from "App/Exceptions/ResponseError";
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
      ResponseError.handler(error, response, "MedicalRecords Co ln:21");
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    try {
      const { patient_id } = params;
      const payload = await request.validate(CreateMedicalRecordValidator);

      payload["patient_id"] = patient_id;
      const data = await MedicalRecord.create(payload);

      response.created({ message: "Berhasil membuat data", data });
    } catch (error) {
      ResponseError.handler(error, response, "MedicalRecords Co ln:35");
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await MedicalRecord.query()
        .preload("patient", (q) =>
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
        message: "Berhasil mengambil data detail medical record",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "MedicalRecords Co ln:52");
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
      ResponseError.handler(error, response, "MedicalRecords Co ln:66");
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data = await MedicalRecord.findByOrFail("id", id);
      await data.delete();

      response.created({ message: "Berhasil menghapus data" });
    } catch (error) {
      ResponseError.handler(error, response, "MedicalRecords Co ln:78");
    }
  }
}
