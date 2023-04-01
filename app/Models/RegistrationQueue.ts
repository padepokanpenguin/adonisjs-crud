import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidV4 } from "uuid";
import Clinic from "./Clinic";
import ClinicQueue from "./ClinicQueue";

export default class RegistrationQueue extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public clinicId: string;

  @belongsTo(() => Clinic)
  public clinic: BelongsTo<typeof Clinic>;

  @column.dateTime({ autoCreate: true })
  public time: DateTime;

  @column()
  public status: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => ClinicQueue)
  public clinicQueue: HasOne<typeof ClinicQueue>;

  @beforeCreate()
  public static async generateId(registrationQueue: RegistrationQueue) {
    if (!registrationQueue.id) {
      registrationQueue.id = uuidV4();
    }
  }
}
