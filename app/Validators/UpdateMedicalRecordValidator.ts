import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateMedicalRecordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    doctor_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "doctors", column: "id" }),
    ]),
    patient_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
    ]),
    complaint: schema.string.optional({ trim: true }),
    diagnosis: schema.string.optional({ trim: true }),
    time: schema.date.optional({ format: "yyyy-MM-dd HH:mm:ss" }),
    treatment: schema.string.optional({ trim: true }),
    weight: schema.number.optional(),
    blood_pressure: schema.string.optional({ trim: true }),
    note: schema.string.optional({ trim: true }),
    prescription: schema.string.optional({ trim: true }),
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
