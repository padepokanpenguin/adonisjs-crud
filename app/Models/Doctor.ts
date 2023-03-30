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
  public license_number: string;

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
}
