import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreatePatientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    regist_by: schema.string({ trim: true }, [rules.uuid({ version: 4 })]),
    nik: schema.string({ trim: true }, [rules.minLength(16)]),
    name: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [rules.email()]),
    username: schema.string({ trim: true }),
    password: schema.string({ trim: true }),
    status: schema.enum(["married", "single"]),
    gender: schema.enum(["male", "female"]),
    address: schema.string({ trim: true }),
    phone_number: schema.string({ trim: true }, [rules.minLength(16)]),
    birth_day: schema.date.optional(),
    register_date: schema.date.optional(),
    is_verified: schema.boolean(),
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
