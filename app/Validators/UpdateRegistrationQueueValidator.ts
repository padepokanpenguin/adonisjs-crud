import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateRegistrationQueueValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    clinic_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "clinics", column: "id" }),
    ]),
    time: schema.date.optional({ format: "yyyy-MM-dd HH:mm:ss" }),
    status: schema.enum.optional(["new", "bail", "registered"]),
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
