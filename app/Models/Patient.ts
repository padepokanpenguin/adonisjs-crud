import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Employee from "./Employee";
import ClinicQueue from "./ClinicQueue";
import MedicalRecord from "./MedicalRecord";

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public registBy: string;

  @belongsTo(() => Employee, {
    foreignKey: "registBy",
  })
  public employee: BelongsTo<typeof Employee>;

  @column()
  public nik: string;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public username: string;

  @column()
  public password: string;

  @column()
  public status: string;

  @column()
  public gender: string;

  @column()
  public address: string;

  @column()
  public imageId: string;

  @column()
  public phone_number: string;

  @column()
  public birth_day: DateTime;

  @column()
  public register_date: DateTime;

  @column()
  public is_verified: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => ClinicQueue)
  public clinicQueue: HasMany<typeof ClinicQueue>;

  @hasMany(() => MedicalRecord)
  public medicalRecord: HasMany<typeof MedicalRecord>;
}
