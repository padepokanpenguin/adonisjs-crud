import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Employee from "App/Models/Employee";

export default class CheckRole {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    roles?: string[]
  ) {
    const user = auth.user!;

    if (!user) {
      return response.status(401).send("Unauthorized");
    } else {
      const employee = await Employee.query()
        .where("id", "=", user.employeeId)
        .firstOrFail();
      if (roles!.indexOf(employee.role) < 0) {
        return response.unauthorized("User tidak memiliki access");
      }

      await next();
    }
  }
}
