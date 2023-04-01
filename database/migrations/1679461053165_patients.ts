import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "patients";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary().notNullable();
      table
        .uuid("regist_by")
        .references("id")
        .inTable("employees")
        .onUpdate("cascade")
        .onDelete("cascade");
      table.string("nik", 16);
      table.string("name");
      table.string("email");
      table.string("username");
      table.string("password");
      table.enum("status", ["married", "single"]);
      table.enum("gender", ["male", "female"]);
      table.text("address");
      table.string("phone_number", 16);
      table.date("birth_date");
      table.date("register_date");
      table.boolean("is_verified").defaultTo(false);
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
