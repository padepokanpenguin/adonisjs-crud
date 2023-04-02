import { DateTime } from "luxon";
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidV4 } from "uuid";
import User from "./User";

export default class ApiToken extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public userId: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column()
  public name: string;

  @column()
  public type: string;

  @column()
  public token: string;

  @column.dateTime()
  public expiresAt: DateTime | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @beforeCreate()
  public static async generateId(at: ApiToken) {
    if (!at.id) {
      at.id = uuidV4();
    }
  }
}
