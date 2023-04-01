import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Employee from "App/Models/Employee";

export default class CheckRole {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    roles?: string[]
  ) {
    const employee = await Employee.query()
      .where("id", "=", auth.user!.employee_id)
      .firstOrFail();

    if (roles!.indexOf(employee.role) < 0) {
      return response.unauthorized("User tidak memiliki access");
    }

    await next();
  }
}
