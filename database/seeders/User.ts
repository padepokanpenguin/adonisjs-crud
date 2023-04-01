import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    console.log("===> START Seeding User");

    await User.createMany([
      {
        id: "9563b991-fc03-4b1d-a184-598457e82a85",
        employeeId: "65ddaf70-c9b3-46e4-95e7-db5cd52c46ac",
        role: "employee",
        email: "kamu@mail.com",
        password: "rahasia",
      },
      {
        id: "09d98eb3-f683-491a-b1e9-1038c6c938f2",
        patientId: "b4832faf-2046-4522-a176-2161ee39df95",
        role: "patient",
        email: "sakit@mail.com",
        password: "sabaryaa",
      },
    ]);

    console.log("===> DONE Seeding User");
  }
}
