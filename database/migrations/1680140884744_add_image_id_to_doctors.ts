import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "doctors";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("image_id", 100).nullable().after("fee");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("image_id");
    });
  }
}
