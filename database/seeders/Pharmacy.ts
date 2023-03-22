import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Database.table("pharmacists").multiInsert([
      {
        id: "316bb150-6fab-402d-bf32-2df9b48da808",
        employee_id: "628397d1-50d0-4be2-ac73-d71aef50be60",
        license_number: "ini license number pharmacy",
      },
    ]);
  }
}
