import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Doctor from "./Doctor";
import Pharmacist from "./Pharmacist";
import Patient from "./Patient";

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public username: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @column()
  public nik: string;

  @column()
  public role: string;

  @column.date()
  public joinDate: DateTime;

  @column()
  public gender: string;

  @column()
  public specialization: string;

  @column()
  public phoneNumber: string;

  @column()
  public address: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Doctor)
  public doctor: HasOne<typeof Doctor>;

  @hasOne(() => Pharmacist)
  public pharmacist: HasOne<typeof Pharmacist>;

  @hasMany(() => Patient, {
    foreignKey: "registBy"
  })
  public admin: HasMany<typeof Patient>;
}
