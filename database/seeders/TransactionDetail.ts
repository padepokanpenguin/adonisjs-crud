import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import TransactionDetail from "App/Models/TransactionDetail";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    console.log("===> START Seeding Transaction Detail")
    await TransactionDetail.createMany([
      {
        id: "6c5e6ae2-d5b0-421b-89b9-3a12ed1c2ecd",
        transactionId: "34304c46-1bf2-4043-9c72-ea347952306f",
        item: "Panadol",
        cost: 50.25,
      },
      {
        id: "d2c71157-4fbd-4da8-a4c8-22c86c765ffb",
        transactionId: "34304c46-1bf2-4043-9c72-ea347952306f",
        item: "Paramex",
        cost: 50.25,
      },
      {
        id: "b73832ba-69a1-4069-a8a1-900bc4cd4e23",
        transactionId: "34304c46-1bf2-4043-9c72-ea347952306f",
        item: "Amoxicilin",
        cost: 50.25,
      },
      {
        id: "8843ba90-961a-4f96-9340-fa1a4c319d15",
        transactionId: "b4cdde94-d98d-4977-b2fc-f2cb2618061f",
        item: "Panadol",
        cost: 63.25,
      },
      {
        id: "138b5c86-6ebe-4725-a642-8cb6f41d86ed",
        transactionId: "b4cdde94-d98d-4977-b2fc-f2cb2618061f",
        item: "Paramex",
        cost: 63.25,
      },
      {
        id: "4b9b3351-5448-42f2-bd4f-6c1c7480fb33",
        transactionId: "b4cdde94-d98d-4977-b2fc-f2cb2618061f",
        item: "Amoxicilin",
        cost: 63.25,
      },
      {
        id: "3ed58283-6bdf-470c-ac6c-6e3ebcddbf4d",
        transactionId: "9e984a66-6c8c-44ef-8595-5a762fcae18f",
        item: "Panadol",
        cost: 100.25,
      },
      {
        id: "3cf10d71-aeed-4a8c-9839-1c7bf92dfa77",
        transactionId: "9e984a66-6c8c-44ef-8595-5a762fcae18f",
        item: "Paramex",
        cost: 100.25,
      },
      {
        id: "a35e6fb7-40d0-4963-9614-578700d0d8d8",
        transactionId: "9e984a66-6c8c-44ef-8595-5a762fcae18f",
        item: "Amoxicilin",
        cost: 100.25,
      },
    ]);
    console.log("===> DONE Seeding Transaction Detail")
  }
}
