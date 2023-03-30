import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateClinicValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    doctor_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "doctors", column: "id" }),
    ]),
    name: schema.string({ trim: true }),
    room: schema.string({ trim: true }),
    daily_quota: schema.number(),
  });

  public messages: CustomMessages = {};
}
