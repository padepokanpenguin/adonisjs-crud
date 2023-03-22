import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "clinics";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary().notNullable();
      table
        .uuid("doctor_id")
        .references("id")
        .inTable("doctors")
        .onUpdate("cascade")
        .onDelete("cascade");
      table.string("name");
      table.string("room");
      table.integer("daily_quota");
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
