import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Database.table("doctors").multiInsert([
      {
        id: "813de0c2-5f56-4749-af98-54ddfc8415c9",
        employee_id: "17d40875-af4e-4798-ac40-258f2ed9d2d7",
        license_number: "ini license number doktor umum",
        fee: "250000",
      },
      {
        id: "36913826-d09e-460f-9e4b-cad17aadcaf1",
        employee_id: "e0471775-4f7f-4316-ad7c-4a53d03b1d8e",
        license_number: "ini license number doctor gigi",
        fee: "250000",
      },
    ]);
  }
}
