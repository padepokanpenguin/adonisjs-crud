import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateClinicValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    doctor_id: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
    name: schema.string({ trim: true }),
    room: schema.string({ trim: true }),
    daily_quota: schema.number(),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {};
}
