import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Database.table("patients").multiInsert([
      {
        id: "b4832faf-2046-4522-a176-2161ee39df95",
        regist_by: "65ddaf70-c9b3-46e4-95e7-db5cd52c46ac",
        nik: "1234565890asdfg",
        name: "Sick Man",
        email: "sickman@mail.com",
        username: "sicker",
        password: "apacobahayoo",
        status: "single",
        gender: "male",
        address: "Jalan Buncit Raya Ragunan",
        phone_number: "0812345678901234",
        birth_day: "2000-01-01 05:10:20",
        register_date: "2023-03-20",
        is_verified: true,
      },
      {
        id: "027aba7d-8804-46c9-9d02-9ff680973c4a",
        regist_by: "65ddaf70-c9b3-46e4-95e7-db5cd52c46ac",
        nik: "1234565890asdas",
        name: "Sick Man Part 2",
        email: "sickmano2n@mail.com",
        username: "sickerpart2",
        password: "apacobahayoo00",
        status: "married",
        gender: "male",
        address: "Jalan Buncit Raya Ragunan",
        phone_number: "0812345678901235",
        birth_day: "2000-01-01 05:10:20",
        register_date: "2023-03-20",
        is_verified: true,
      },
      {
        id: "77d317ea-1478-45e0-bc61-c9561c3e99db",
        regist_by: "65ddaf70-c9b3-46e4-95e7-db5cd52c46ac",
        nik: "1234565890asdza",
        name: "Sick Woman",
        email: "sickwomann@mail.com",
        username: "sickerpart2",
        password: "thisisasecretthatmakewomanawoman",
        status: "married",
        gender: "female",
        address: "Jalan Syiaridin No. XXX",
        phone_number: "0812345678901235",
        birth_day: "2000-01-01 05:10:20",
        register_date: "2023-03-20",
        is_verified: true,
      },
    ]);
  }
}
