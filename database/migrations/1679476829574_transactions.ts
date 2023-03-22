import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "transactions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary().notNullable();
      table
        .uuid("clinic_queue_id")
        .references("id")
        .inTable("clinic_queues")
        .onDelete("cascade")
        .onUpdate("cascade");
      table
        .uuid("medical_record_id")
        .references("id")
        .inTable("medical_records")
        .onDelete("cascade")
        .onUpdate("cascade");
      table.float("total_cost");
      table.enum("status", ["paid", "unpaid"]);

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
