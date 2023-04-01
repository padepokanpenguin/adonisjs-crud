import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidV4 } from "uuid";
import Doctor from "./Doctor";
import Pharmacist from "./Pharmacist";
import Patient from "./Patient";
import User from "./User";

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

  @column.date({ autoCreate: true })
  public joinDate: DateTime;

  @column()
  public gender: string;

  @column()
  public specialization: string | null;

  @column()
  public phoneNumber: string;

  @column()
  public address: string;

  @column()
  public imageId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Doctor)
  public doctor: HasOne<typeof Doctor>;

  @hasOne(() => Pharmacist)
  public pharmacist: HasOne<typeof Pharmacist>;

  @hasOne(() => User)
  public user: HasOne<typeof User>;

  @hasMany(() => Patient, {
    foreignKey: "registBy",
  })
  public admin: HasMany<typeof Patient>;

  @beforeCreate()
  public static async generateId(employee: Employee) {
    if (employee.id) {
      employee.id = uuidV4();
    }
  }
}
