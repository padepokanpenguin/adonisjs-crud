import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "medical_records";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary().notNullable();
      table
        .uuid("doctor_id")
        .references("id")
        .inTable("doctors")
        .onUpdate("cascade")
        .onDelete("cascade");
      table
        .uuid("patient_id")
        .references("id")
        .inTable("patients")
        .onUpdate("cascade")
        .onDelete("cascade");
      table.text("complaint");
      table.text("diagnosis");
      table.timestamp("time");
      table.text("treatment");
      table.float("weight");
      table.text("blood_pressure");
      table.text("note");
      table.text("prescription");

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
