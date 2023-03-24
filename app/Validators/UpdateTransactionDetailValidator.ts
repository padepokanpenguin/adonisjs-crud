import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateTransactionDetailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    transaction_id: schema.string.optional({ trim: true }, [
      rules.uuid({ version: 4 }),
    ]),
    item: schema.string.optional({ trim: true }),
    cost: schema.number.optional(),
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
