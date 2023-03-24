import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateClinicValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    doctor_id: schema.string.optional([rules.uuid({ version: 4 })]),
    name: schema.string.optional(),
    room: schema.string.optional(),
    daily_quota: schema.number.optional(),
  });

  public messages: CustomMessages = {};
}
