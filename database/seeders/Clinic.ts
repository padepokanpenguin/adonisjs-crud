import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Clinic from "App/Models/Clinic";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    console.log("===> START Seeding Clinic");
    await Clinic.createMany([
      {
        id: "3d53a9d3-8265-4a3d-9bd3-07db019ef27b",
        doctorId: "813de0c2-5f56-4749-af98-54ddfc8415c9",
        name: "poli umum",
        room: "Mawar 113",
        dailyQuota: 20,
      },
      {
        id: "208fd088-ef7d-4806-b283-a0904c8e9631",
        doctorId: "36913826-d09e-460f-9e4b-cad17aadcaf1",
        name: "poli gigi",
        room: "Mawar 201",
        dailyQuota: 15,
      },
    ]);
    console.log("===> DONE Seeding Clinic");
  }
}
