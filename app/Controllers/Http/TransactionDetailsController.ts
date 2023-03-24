import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import TransactionDetail from "App/Models/TransactionDetail";
import CreateTransactionDetailValidator from "App/Validators/CreateTransactionDetailValidator";
import UpdateTransactionDetailValidator from "App/Validators/UpdateTransactionDetailValidator";
import { v4 as uuidV4 } from "uuid";

export default class TransactionDetailsController {
  public async index({ response, params }: HttpContextContract) {
    try {
      const { transaction_id } = params;
      const data = await TransactionDetail.query()
        .preload("transaction")
        .where("transaction_id", "=", transaction_id);

      response.created({
        message: "Berhasil mengambil data transaction detail",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    try {
      const { transaction_id } = params;
      const payload = await request.validate(CreateTransactionDetailValidator);
      payload["id"] = uuidV4();
      payload["transaction_id"] = transaction_id;

      const data = await TransactionDetail.create(payload);
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
      const payload = await request.validate(UpdateTransactionDetailValidator);
      const data = await TransactionDetail.findByOrFail("id", id);
      await data.merge(payload).save();

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
