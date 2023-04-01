import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Transaction from "App/Models/Transaction";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    console.log("===> START Seeding Transaction")
    await Transaction.createMany([
      {
        id: "34304c46-1bf2-4043-9c72-ea347952306f",
        clinicQueueId: "af8c0213-5a0b-43cc-bab4-3694bae44af2",
        medicalRecordId: "0edd1f42-096e-4a11-aa5a-0464278b7b39",
        totalCost: 200000.0,
        status: "paid",
      },
      {
        id: "b4cdde94-d98d-4977-b2fc-f2cb2618061f",
        clinicQueueId: "83d2b694-e16d-4627-976d-2dcfa675abfc",
        medicalRecordId: "6259707e-5ca3-434f-bfdd-b2dc3269ce0d",
        totalCost: 240000.0,
        status: "paid",
      },
      {
        id: "9e984a66-6c8c-44ef-8595-5a762fcae18f",
        clinicQueueId: "d27886e6-27f9-4963-8085-ca70ee5c9e38",
        medicalRecordId: "79675d4d-b861-4848-a85e-661b1a3fd237",
        totalCost: 400000.0,
        status: "unpaid",
      },
    ]);
    console.log("===> DONE Seeding Transaction")
  }
}
