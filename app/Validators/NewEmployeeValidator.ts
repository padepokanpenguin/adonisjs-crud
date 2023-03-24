import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class NewEmployeeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    username: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string(),
    nik: schema.string({ trim: true }, [rules.minLength(16)]),
    role: schema.enum(["admin", "doctor", "pharmacy"]),
    join_date: schema.date.optional({
      format: "yyyy-MM-dd",
    }),
    gender: schema.enum(["male", "female"]),
    specialization: schema.string.nullableAndOptional(),
    phone_number: schema.string(),
    address: schema.string(),
  });
  

  public messages: CustomMessages = {};
}
