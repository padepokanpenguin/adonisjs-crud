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
import Doctor from "./Doctor";
import RegistrationQueue from "./RegistrationQueue";
import ClinicQueue from "./ClinicQueue";

export default class Clinic extends BaseModel {
  public serializeExtras() {
    return {
      total_queues: this.$extras.total_queues
    };
  }

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
  public dailyQuota: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => RegistrationQueue)
  public registrationQueue: HasMany<typeof RegistrationQueue>;

  @hasMany(() => ClinicQueue)
  public clinicQueue: HasMany<typeof ClinicQueue>;

  @beforeCreate()
  public static async generateId(clinic: Clinic) {
    if (!clinic.id) {
      clinic.id = uuidV4();
    }
  }
}
