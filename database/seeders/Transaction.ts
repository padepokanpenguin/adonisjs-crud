import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Database.table("transactions").multiInsert([
      {
        id: "34304c46-1bf2-4043-9c72-ea347952306f",
        clinic_queue_id: "af8c0213-5a0b-43cc-bab4-3694bae44af2",
        medical_record_id: "0edd1f42-096e-4a11-aa5a-0464278b7b39",
        total_cost: 200000.0,
        status: "paid",
      },
      {
        id: "b4cdde94-d98d-4977-b2fc-f2cb2618061f",
        clinic_queue_id: "83d2b694-e16d-4627-976d-2dcfa675abfc",
        medical_record_id: "6259707e-5ca3-434f-bfdd-b2dc3269ce0d",
        total_cost: 240000.0,
        status: "paid",
      },
      {
        id: "9e984a66-6c8c-44ef-8595-5a762fcae18f",
        clinic_queue_id: "d27886e6-27f9-4963-8085-ca70ee5c9e38",
        medical_record_id: "79675d4d-b861-4848-a85e-661b1a3fd237",
        total_cost: 400000.0,
        status: "unpaid",
      },
    ]);
  }
}
