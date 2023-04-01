import Mail from "@ioc:Adonis/Addons/Mail";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MailController {
  public async send({ response }: HttpContextContract) {
    try {
      await Mail.send((message) => {
        message
          .from("aria@noreply.id")
          .to("kamu@disana.id")
          .subject("Hoola")
          // .text("Hai Kawan")
          .htmlView("emails/register", { username: "John" });
      });
      response.ok({ message: "Email terkirim" });
    } catch (error) {
      const message = `Mail Controller ln:17 ${error.message}`;
      console.log(message, error);
      response.send({ message, error });
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
