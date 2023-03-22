import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Database.table("clinics").multiInsert([
      {
        id: "3d53a9d3-8265-4a3d-9bd3-07db019ef27b",
        doctor_id: "813de0c2-5f56-4749-af98-54ddfc8415c9",
        name: "poli umum",
        room: "Mawar 113",
        daily_quota: 20,
      },
      {
        id: "208fd088-ef7d-4806-b283-a0904c8e9631",
        doctor_id: "36913826-d09e-460f-9e4b-cad17aadcaf1",
        name: "poli gigi",
        room: "Mawar 201",
        daily_quota: 15,
      },
    ]);
  }
}
