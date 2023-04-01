import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Pharmacist from "App/Models/Pharmacist";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Pharmacist.createMany([
      {
        id: "316bb150-6fab-402d-bf32-2df9b48da808",
        employeeId: "628397d1-50d0-4be2-ac73-d71aef50be60",
        licenseNumber: "ini license number pharmacy",
      },
    ]);
  }
}
