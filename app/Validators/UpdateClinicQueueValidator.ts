import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateClinicQueueValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    registration_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "employees", column: "id" }),
    ]),
    clinic_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
    ]),
    patient_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
    ]),
    status: schema.enum.optional(["bail", "done", "registered"]),
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
