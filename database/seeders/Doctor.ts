import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Doctor from "App/Models/Doctor";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    console.log("===> START Seeding Doctor");
    await Doctor.createMany([
      {
        id: "813de0c2-5f56-4749-af98-54ddfc8415c9",
        employeeId: "17d40875-af4e-4798-ac40-258f2ed9d2d7",
        licenseNumber: "ini license number doktor umum",
        fee: 250000,
      },
      {
        id: "36913826-d09e-460f-9e4b-cad17aadcaf1",
        employeeId: "e0471775-4f7f-4316-ad7c-4a53d03b1d8e",
        licenseNumber: "ini license number doctor gigi",
        fee: 250000,
      },
    ]);
    console.log("===> DONE Seeding Doctor");
  }
}
