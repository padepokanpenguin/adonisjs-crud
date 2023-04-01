import Mail from "@ioc:Adonis/Addons/Mail";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ResponseError } from "App/Exceptions/ResponseError";

export default class MailController {
  public async send({ response }: HttpContextContract) {
    try {
      await Mail.send((message) => {
        message
          .from("aria@noreply.id")
          .to("aria.psw@gmail.com")
          .subject("Hoola")
          // .text("Hai Kawan")
          .htmlView("emails/register", { username: "John" });
      });
      response.ok({ message: "Email terkirim" });
    } catch (error) {
      
      ResponseError.handler(error, response, "Mail Co ln:19");
    }
  }
  // public async index({}: HttpContextContract) {}

  // public async create({}: HttpContextContract) {}

  // public async store({}: HttpContextContract) {}

  // public async show({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}

  // public async update({}: HttpContextContract) {}

  // public async destroy({}: HttpContextContract) {}
}
