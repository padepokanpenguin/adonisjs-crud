import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidV4 } from "uuid";
import Employee from "./Employee";
import ClinicQueue from "./ClinicQueue";
import MedicalRecord from "./MedicalRecord";
import User from "./User";

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

  @column({ serializeAs: null })
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
  public phoneNumber: string;

  @column()
  public birthDate: Date;

  @column()
  public registerDate: DateTime;

  @column()
  public isVerified: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => User)
  public user: HasOne<typeof User>;

  @hasMany(() => ClinicQueue)
  public clinicQueue: HasMany<typeof ClinicQueue>;

  @hasMany(() => MedicalRecord)
  public medicalRecord: HasMany<typeof MedicalRecord>;

  @beforeCreate()
  public static async generateId(patient: Patient) {
    if (!patient.id) {
      patient.id = uuidV4();
    }
  }
}
