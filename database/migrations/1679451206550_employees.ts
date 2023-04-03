import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary().defaultTo(this.raw("uuid_generate_v4 ()"));
      table.string("name")
      table.string("username")
      table.string("email")
      table.string("password")
      table.string("nik", 16)
      table.enum("role", ["admin", "doctor", "pharmacy"])
      table.date("join_date")
      table.enum("gender", ["male", "female"])
      table.string("specialization")
      table.string("phone_number")
      table.text("address")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
