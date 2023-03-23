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
import RegistrationQueue from "./RegistrationQueue";
import ClinicQueue from "./ClinicQueue";

export default class Clinic extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public doctorId: string;

  @belongsTo(() => Doctor)
  public doctor: BelongsTo<typeof Doctor>;

  @column()
  public name: string;

  @column()
  public room: string;

  @column()
  public daily_quota: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => RegistrationQueue)
  public registrationQueue: HasMany<typeof RegistrationQueue>;

  @hasMany(() => ClinicQueue)
  public clinicQueue: HasMany<typeof ClinicQueue>;
}
