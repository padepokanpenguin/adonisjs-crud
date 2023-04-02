import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.uuid("employee_id").references("employees.id").nullable();
      table.uuid("patient_id").references("patients.id").nullable();
      table.string("email", 255).notNullable().unique();
      table.string("password", 180).notNullable();
      table.boolean("is_verified").defaultTo(false).notNullable();
      table.enum("role", ["employee", "patient"]);
      table.string("remember_me_token").nullable();

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
