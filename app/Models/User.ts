import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidV4 } from "uuid";
import Employee from "./Employee";
import Patient from "./Patient";
import ApiToken from "./ApiToken";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public employeeId: string | null;

  @column()
  public patientId: string | null;

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>;

  @belongsTo(() => Patient)
  public patient: BelongsTo<typeof Patient>;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public role: string;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => ApiToken)
  public tokens: HasMany<typeof ApiToken>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @beforeCreate()
  public static async generateId(user: User) {
    if (!user.id) {
      user.id = uuidV4();
    }
  }
}
