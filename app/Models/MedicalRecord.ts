import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Doctor from "./Doctor";
import Patient from "./Patient";
import Transaction from "./Transaction";

export default class MedicalRecord extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public doctorId: string;

  @belongsTo(() => Doctor)
  public doctor: BelongsTo<typeof Doctor>;

  @column()
  public patientId: string;

  @belongsTo(() => Patient)
  public patient: BelongsTo<typeof Patient>;

  @column()
  public complaint: string;

  @column()
  public diagnosis: string;

  @column.dateTime()
  public time: DateTime;

  @column()
  public treatment: string;

  @column()
  public weight: number;

  @column()
  public bloodPressure: string;

  @column()
  public note: string;

  @column()
  public prescription: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Transaction)
  public transaction: HasMany<typeof Transaction>;
}
