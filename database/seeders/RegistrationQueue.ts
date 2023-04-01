import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import RegistrationQueue from "App/Models/RegistrationQueue";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await RegistrationQueue.createMany([
      {
        id: "8a8f96ea-3a22-49db-b84d-c7c726eb9bc4",
        clinicId: "3d53a9d3-8265-4a3d-9bd3-07db019ef27b",
        time: DateTime.now(),
        status: "new",
      },
      {
        id: "b684b45f-b146-49d8-a8a9-183728f4083e",
        clinicId: "3d53a9d3-8265-4a3d-9bd3-07db019ef27b",
        time: DateTime.now(),
        status: "registered",
      },
      {
        id: "f568050a-7f0a-4344-9274-4d8998da038d",
        clinicId: "3d53a9d3-8265-4a3d-9bd3-07db019ef27b",
        time: DateTime.now(),
        status: "bail",
      },
      {
        id: "5b0cf39b-d439-4740-bba8-3e540f4c8f7a",
        clinicId: "208fd088-ef7d-4806-b283-a0904c8e9631",
        time: DateTime.now(),
        status: "bail",
      },
      {
        id: "4719e964-5fe4-4a86-914b-0060089e2e46",
        clinicId: "208fd088-ef7d-4806-b283-a0904c8e9631",
        time: DateTime.now(),
        status: "registered",
      },
      {
        id: "d6e4b99f-ab08-40aa-8fdf-576701be0b99",
        clinicId: "208fd088-ef7d-4806-b283-a0904c8e9631",
        time: DateTime.now(),
        status: "registered",
      },
    ]);
  }
}
