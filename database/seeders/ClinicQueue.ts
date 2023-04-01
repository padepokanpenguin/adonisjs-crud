import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ClinicQueue from "App/Models/ClinicQueue";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    console.log("===> START Seeding Clinic QUEUE");
    await ClinicQueue.createMany([
      {
        id: "af8c0213-5a0b-43cc-bab4-3694bae44af2",
        registrationId: "8a8f96ea-3a22-49db-b84d-c7c726eb9bc4",
        clinicId: "3d53a9d3-8265-4a3d-9bd3-07db019ef27b",
        patientId: "b4832faf-2046-4522-a176-2161ee39df95",
        status: "done",
      },
      {
        id: "83d2b694-e16d-4627-976d-2dcfa675abfc",
        registrationId: "b684b45f-b146-49d8-a8a9-183728f4083e",
        clinicId: "3d53a9d3-8265-4a3d-9bd3-07db019ef27b",
        patientId: "027aba7d-8804-46c9-9d02-9ff680973c4a",
        status: "registered",
      },
      {
        id: "d27886e6-27f9-4963-8085-ca70ee5c9e38",
        registrationId: "f568050a-7f0a-4344-9274-4d8998da038d",
        clinicId: "208fd088-ef7d-4806-b283-a0904c8e9631",
        patientId: "77d317ea-1478-45e0-bc61-c9561c3e99db",
        status: "done",
      },
    ]);
    console.log("===> DONE Seeding Clinic QUEUE");
  }
}
