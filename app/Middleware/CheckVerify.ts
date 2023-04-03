import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CheckVerify {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    if (!auth.user!.isVerified) {
      response.badGateway({ message: "Email berlum terverifikasi" });
    }
    await next();
  }
}
