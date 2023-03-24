import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateEmployeeValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    username: schema.string.optional({ trim: true }),
    email: schema.string.optional({ trim: true }, [rules.email()]),
    password: schema.string.optional([rules.regex(/^[a-zA-Z0-9]+$/)]),
    nik: schema.string.optional({ trim: true }, [rules.minLength(16)]),
    role: schema.enum.optional(["admin", "doctor", "pharmacy"]),
    join_date: schema.date.optional({
      format: "yyyy-MM-dd HH:mm:ss",
    }),
    gender: schema.enum.optional(["male", "female"]),
    specialization: schema.string.optional({ trim: true }),
    phone_number: schema.string.optional({ trim: true }),
    address: schema.string.optional({ trim: true }),
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
