import Encryption from "@ioc:Adonis/Core/Encryption";
import Mail from "@ioc:Adonis/Addons/Mail";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
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

      await Mail.send((message) => {
        message
          .from("arianurjamal@noreply.com")
          .to(data.email)
          .attach("Pendaftaran Berhasil")
          .htmlView("emails/register", {
            person: data.email,
            role: data.role,
            token: token.token,
          });
      });

      const token = await ApiToken.create({
        userId: data.id,
        name: "Verifikasi Email",
        type: "Email Verification",
        token: Encryption.encrypt(data.id + data.createdAt),
      });

      response.created({
        message: "Berhasil Register",
        data,
      });
    } catch (error) {
      ResponseError.handler(error, response, "Auth Co ln:15");
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(LoginValidator);

      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "30 days",
      });

      response.created({ message: "Login berhasil", data: token });
    } catch (error) {
      ResponseError.handler(error, response, "Auth Co ln:27 ");
    }
  }
}
