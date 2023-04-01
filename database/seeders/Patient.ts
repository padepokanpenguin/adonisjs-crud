import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { DateTime } from "luxon";
import Patient from "App/Models/Patient";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Patient.createMany([
      {
        id: "b4832faf-2046-4522-a176-2161ee39df95",
        registBy: "65ddaf70-c9b3-46e4-95e7-db5cd52c46ac",
        nik: "1234565890asdfg",
        name: "Sick Man",
        email: "sickman@mail.com",
        username: "sicker",
        password: "apacobahayoo",
        status: "single",
        gender: "male",
        address: "Jalan Buncit Raya Ragunan",
        phoneNumber: "0812345678901234",
        birthDate: new Date("2000-01-01"),
        registerDate: DateTime.now(),
        isVerified: true,
      },
      {
        id: "027aba7d-8804-46c9-9d02-9ff680973c4a",
        registBy: "65ddaf70-c9b3-46e4-95e7-db5cd52c46ac",
        nik: "1234565890asdas",
        name: "Sick Man Part 2",
        email: "sickmano2n@mail.com",
        username: "sickerpart2",
        password: "apacobahayoo00",
        status: "married",
        gender: "male",
        address: "Jalan Buncit Raya Ragunan",
        phoneNumber: "0812345678901235",
        birthDate: new Date("2000-01-01"),
        registerDate: DateTime.now(),
        isVerified: true,
      },
      {
        id: "77d317ea-1478-45e0-bc61-c9561c3e99db",
        registBy: "65ddaf70-c9b3-46e4-95e7-db5cd52c46ac",
        nik: "1234565890asdza",
        name: "Sick Woman",
        email: "sickwomann@mail.com",
        username: "sickerpart2",
        password: "thisisasecretthatmakewomanawoman",
        status: "married",
        gender: "female",
        address: "Jalan Syiaridin No. XXX",
        phoneNumber: "0812345678901235",
        birthDate: new Date("2000-01-01"),
        registerDate: DateTime.now(),
        isVerified: true,
      },
    ]);
  }
}
