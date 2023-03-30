import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateMedicalRecordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    patient_id: schema.string({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "patients", column: "id" }),
    ]),
    complaint: schema.string({ trim: true }),
    diagnosis: schema.string({ trim: true }),
    time: schema.date({ format: "yyyy-MM-dd HH:mm:ss" }),
    treatment: schema.string({ trim: true }),
    weight: schema.number(),
    blood_pressure: schema.string({ trim: true }),
    note: schema.string({ trim: true }),
    prescription: schema.string({ trim: true }),
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
