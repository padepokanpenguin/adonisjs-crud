import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "patients";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("image_id", 100).nullable().after("address");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("image_id");
    });
  }
}
