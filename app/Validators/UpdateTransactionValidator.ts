import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    clinic_queue_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: "clinic_queues", column: "id" }),
    ]),
    medical_record_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
    ]),
    total_cost: schema.number.optional(),
    status: schema.enum.optional(["paid", "unpaid"]),
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
