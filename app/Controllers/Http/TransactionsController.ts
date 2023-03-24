import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Transaction from "App/Models/Transaction";
import CreateTransactionValidator from "App/Validators/CreateTransactionValidator";
import UpdateTransactionValidator from "App/Validators/UpdateTransactionValidator";
import { v4 as uuidV4 } from "uuid";

export default class TransactionsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Transaction.query().preload("transactionDetail");

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
      const payload = await request.validate(CreateTransactionValidator);
      payload["id"] = uuidV4();
      const data = await Transaction.create(payload);

      response.created({ message: "Berhasil membuat data", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Transaction.query()
        .preload("transactionDetail")
        .where("id", "=", id);

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
      const payload = await request.validate(UpdateTransactionValidator);

      const data = await Transaction.findByOrFail("id", id);
      await data.merge(payload).save();

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

      response.created({ message: "Berhasil menghapus data" });
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
