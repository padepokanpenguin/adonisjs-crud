import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UploadImagePharmacistValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    imageProfile: schema.file({
      size: "5mb",
      extnames: ["jpg", "jpeg", "png", "gif"],
    }),
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
