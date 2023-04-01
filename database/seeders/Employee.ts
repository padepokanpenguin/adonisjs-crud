import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Employee from "App/Models/Employee";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    console.log("===> START Seeding Employee");

    await Employee.createMany([
      {
        id: "65ddaf70-c9b3-46e4-95e7-db5cd52c46ac",
        name: "Lutfi 2",
        username: "lutfidmz2",
        password: "sangatrahasia1",
        nik: "13245678900023",
        role: "admin",
        joinDate: DateTime.now(),
        phoneNumber: "0812345618",
        address: "Jl. Patimura Timur No 2 Bekasi",
        email: "lutfi.it@robot-mail.com",
        specialization: "Tech",
        gender: "male",
      },
      {
        id: "17d40875-af4e-4798-ac40-258f2ed9d2d7",
        name: "John Doe",
        username: "john_doe",
        password: "sangatrahasia2",
        nik: "17173343",
        role: "doctor",
        joinDate: DateTime.now(),
        phoneNumber: "0812345278",
        address: "Jl. Patimura Timur No 2 Bekasi",
        email: "johndoe@robot-mail.com",
        specialization: "Menyuntik sambil pejamkan mata",
        gender: "male",
      },
      {
        id: "628397d1-50d0-4be2-ac73-d71aef50be60",
        name: "John Donk",
        username: "john_donk",
        password: "sangatrahasia3",
        nik: "17173348",
        role: "pharmacy",
        joinDate: DateTime.now(),
        phoneNumber: "0812345678",
        address: "Jl. Patimura Timur No 2 Bekasi",
        email: "johndonk@robot-mail.com",
        specialization: "Meracik Obat",
        gender: "male",
      },
      {
        id: "e0471775-4f7f-4316-ad7c-4a53d03b1d8e",
        name: "Siti Elisabeth",
        username: "eli disabeth",
        password: "sangatrahasia4",
        nik: "17173341",
        role: "doctor",
        joinDate: DateTime.now(),
        phoneNumber: "0812345608",
        address: "Jl. Patimura Timur No 2 Bekasi",
        email: "sitielik@robot-mail.com",
        specialization: "merawat gigi kamu kayak gigi sendiri",
        gender: "female",
      },
    ]);

    console.log("===> DONE Seeding Employee");
  }
}
