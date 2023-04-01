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
import ClinicQueue from "./ClinicQueue";
import MedicalRecord from "./MedicalRecord";
import TransactionDetail from "./TransactionDetail";

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public clinicQueueId: string;

  @belongsTo(() => ClinicQueue)
  public clinicQueue: BelongsTo<typeof ClinicQueue>;

  @column()
  public medicalRecordId: string;

  @belongsTo(() => MedicalRecord)
  public medicalRecord: BelongsTo<typeof MedicalRecord>;

  @column()
  public totalCost: number;

  @column()
  public status: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => TransactionDetail)
  public transactionDetail: HasMany<typeof TransactionDetail>;

  @beforeCreate()
  public static async generateId(transaction: Transaction){
    if(transaction.id) {
      transaction.id = uuidV4()
    }
  }

}
