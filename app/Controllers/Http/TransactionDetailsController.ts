import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ResponseError } from "App/Exceptions/ResponseError";
import TransactionDetail from "App/Models/TransactionDetail";
import CreateTransactionDetailValidator from "App/Validators/CreateTransactionDetailValidator";
import UpdateTransactionDetailValidator from "App/Validators/UpdateTransactionDetailValidator";

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
      ResponseError.handler(error, response, "TransactionDetails Co ln:20");
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    try {
      const { transaction_id } = params;
      const payload = await request.validate(CreateTransactionDetailValidator);

      payload["transaction_id"] = transaction_id;

      const data = await TransactionDetail.create(payload);
      response.created({
        message: "Berhasil membuat data transaction detail",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "TransactionDetails Co ln:37");
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await TransactionDetail.query()
        .preload("transaction")
        .where("id", "=", id)
        .firstOrFail();

      response.created({
        message: "Berhasil mengambil data transaction detail",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "TransactionDetails Co ln:55");
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
      ResponseError.handler(error, response, "TransactionDetails Co ln:68");
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
      ResponseError.handler(error, response, "TransactionDetails Co ln:82");
    }
  }
}
