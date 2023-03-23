import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Transaction from "App/Models/Transaction";
import { v4 as uuidV4 } from "uuid";

export default class TransactionsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Transaction.query()
        .preload("clinicQueue")
        .preload("medicalRecord");

      response.created({
        message: "Berhasil mengambil data transaction",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const newData = request.body();
      newData["id"] = uuidV4();
      const data = await Transaction.create(newData);

      response.created({ message: "Berhasil membuat data", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Transaction.query()
        .preload("clinicQueue")
        .preload("medicalRecord")
        .where((t) => t.where("id", id));

      response.created({
        message: "Berhasil mengambil data Transaction",
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

      const data = await Transaction.findByOrFail("id", id);
      await data.merge(updateData).save();

      response.created({
        message: "Berhasil memperbarui data transaction",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data = await Transaction.findByOrFail("id", id);
      await data.delete();
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
