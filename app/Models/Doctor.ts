import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidV4 } from "uuid";
import Employee from "./Employee";
import Clinic from "./Clinic";
import MedicalRecord from "./MedicalRecord";

export default class Doctor extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public employeeId: string;

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>;

  @column()
  public licenseNumber: string;

  @column()
  public fee: number;

  @column()
  public imageId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Clinic)
  public clinic: HasMany<typeof Clinic>;

  @hasMany(() => MedicalRecord)
  public medicalRecord: HasMany<typeof MedicalRecord>;

  @beforeCreate()
  public static async generateId(doctor: Doctor) {
    if (!doctor.id) {
      doctor.id = uuidV4();
    }
  }
}
