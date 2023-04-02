import Mail from "@ioc:Adonis/Addons/Mail";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { string } from "@ioc:Adonis/Core/Helpers";
import { ResponseError } from "App/Exceptions/ResponseError";
import ApiToken from "App/Models/ApiToken";
import User from "App/Models/User";
import LoginValidator from "App/Validators/LoginValidator";
import RegisterValidator from "App/Validators/RegisterValidator";

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RegisterValidator);
      const data = await User.create(payload);
      // const token = await ApiToken.create({
      //   userId: data.id,
      //   name: "Verifikasi Email",
      //   type: "Email Verification",
      //   token: string.generateRandom(64),
      // });
      const token = string.generateRandom(64);

      await Mail.send((message) => {
        message
          .from("arianurjamal@noreply.com")
          .to(data.email)
          .htmlView("emails/register", {
            person: data.email,
            role: data.role,
            token,
          });
      });

      response.created({
        message: "Berhasil Register",
        data,
        token,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Auth Co ln:38");
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(LoginValidator);

      const token = await auth.attempt(email, password, {
        expiresIn: "7 days",
      });

      response.created({ message: "Login berhasil", data: token });
    } catch (error) {
      ResponseError.handler(error, response, "Auth Co ln:52");
    }
  }
}
