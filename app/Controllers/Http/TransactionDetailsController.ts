import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import TransactionDetail from "App/Models/TransactionDetail";
import { v4 as uuidV4 } from "uuid";

export default class TransactionDetailsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await TransactionDetail.query().preload("transaction");

      response.created({
        message: "Berhasil mengambil data transaction detail",
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

      const data = await TransactionDetail.create(newData);
      response.created({
        message: "Berhasil membuat data transaction detail",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await TransactionDetail.query()
        .preload("transaction")
        .where((t) => t.where("id", id))
        .firstOrFail();

      response.created({
        message: "Berhasil mengambil data transaction detail",
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
      const data = await TransactionDetail.findByOrFail("id", id);
      await data.merge(updateData).save();

      response.created({ message: "Berhasil memperbarui data", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await TransactionDetail.findByOrFail("id", id);
      await data.delete();
      response.created({
        message: " Berhasil menghapus data transactional detail",
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
