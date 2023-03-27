import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import LoginValidator from "App/Validators/LoginValidator";
import RegisterValidator from "App/Validators/RegisterValidator";

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RegisterValidator);
      const data = await User.create(payload);

      response.created({ message: "Berhasil Register", data });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(LoginValidator);

      const token = await auth.use("api").attempt(email, password);

      response.created({ message: "Login berhasil", data: token });
    } catch (error) {
      return response.unauthorized("Invalid credentials");
    }
  }
}
