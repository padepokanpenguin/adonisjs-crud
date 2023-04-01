import { DateTime } from "luxon";
import { v4 as uuidV4 } from "uuid";
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Employee from "./Employee";

export default class Pharmacist extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column()
  public employeeId: string;

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>;

  @column()
  public licenseNumber: string;

  @column()
  public imageId: string;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  
  @beforeCreate()
  public static async generateId(pharmacist: Pharmacist) {
    if (!pharmacist.id) {
      pharmacist.id = uuidV4()
    } 
  }}
