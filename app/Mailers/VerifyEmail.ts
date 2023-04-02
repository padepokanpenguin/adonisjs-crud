import { BaseMailer, MessageContract } from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";
import Route from "@ioc:Adonis/Core/Route";
import User from "App/Models/User";

export default class VerifyEmail extends BaseMailer {
  constructor(private user: User, private token: string) {
    super();
  }

  public prepare(message: MessageContract) {
    const domain = Env.get("DOMAIN");
    const path = Route.makeUrl("verify.email.verify", [this.token]);
    const url = domain + path;

    message
      .subject("Please Verify Your Email")
      .from("noreply@rumahpenguin.id")
      .to(this.user.email)
      .htmlView("emails/register", { url });
  }
}
