import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ResponseError } from "App/Exceptions/ResponseError";
import Transaction from "App/Models/Transaction";
import CreateTransactionValidator from "App/Validators/CreateTransactionValidator";
import UpdateTransactionValidator from "App/Validators/UpdateTransactionValidator";

export default class TransactionsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Transaction.query().preload("transactionDetail");

      response.created({
        message: "Berhasil mengambil data transaction",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Transactions Co ln:17");
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateTransactionValidator);

      const data = await Transaction.create(payload);

      response.created({ message: "Berhasil membuat data", data });
    } catch (error) {
      ResponseError.handler(error, response, "Transactions Co ln:29");
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      const data = await Transaction.query()
        .preload("transactionDetail")
        .preload("medicalRecord", (mr) =>
          mr.preload("patient", (p) => p.select("name"))
        )
        .where("id", "=", id)
        .firstOrFail();

      response.created({
        message: "Berhasil mengambil data Transaction",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Transactions Co ln:46");
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
      ResponseError.handler(error, response, "Transactions Co ln:63");
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data = await Transaction.findByOrFail("id", id);
      await data.delete();

      response.created({ message: "Berhasil menghapus data" });
    } catch (error) {
      ResponseError.handler(error, response, "Transactions Co ln:75");
    }
  }
}
