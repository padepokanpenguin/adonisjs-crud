import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import MedicalRecord from "App/Models/MedicalRecord";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    console.log("===> START Seeding MEDICAL Records");
    await MedicalRecord.createMany([
      {
        id: "0edd1f42-096e-4a11-aa5a-0464278b7b39",
        doctorId: "813de0c2-5f56-4749-af98-54ddfc8415c9",
        patientId: "b4832faf-2046-4522-a176-2161ee39df95",
        complaint:
          "bibir pecah-pecah, panas dalam, sariawan, gusi berdarah, sering mual, encok, dsb",
        diagnosis: "komplikasi akut",
        time: DateTime.now(),
        treatment: "jongkok 3 menit setiap hari",
        weight: 60.5,
        bloodPressure: "200cc",
        note: "Jangan lupa ibadah",
        prescription: "air putih 7 gelas per6jam",
      },
      {
        id: "6259707e-5ca3-434f-bfdd-b2dc3269ce0d",
        doctorId: "813de0c2-5f56-4749-af98-54ddfc8415c9",
        patientId: "027aba7d-8804-46c9-9d02-9ff680973c4a",
        complaint:
          "bibir pecah-pecah, panas dalam, sariawan, gusi berdarah, sering mual, sakit telinga",
        diagnosis: "komplikasi akad",
        time: DateTime.now(),
        treatment: "jongkok 7 menit setiap hari",
        weight: 60.5,
        bloodPressure: "200cc",
        note: "Jangan lupa ibadah",
        prescription: "air putih 7 gelas per6jam",
      },
      {
        id: "79675d4d-b861-4848-a85e-661b1a3fd237",
        doctorId: "813de0c2-5f56-4749-af98-54ddfc8415c9",
        patientId: "77d317ea-1478-45e0-bc61-c9561c3e99db",
        complaint:
          "bibir pecah-pecah, panas dalam, sariawan, gusi berdarah, sering mual, encok, mata merah, hidung kuning, kencing air",
        diagnosis: "komplikasi akut sangat",
        time: DateTime.now(),
        treatment: "lari 3 menit setiap hari",
        weight: 65.5,
        bloodPressure: "200cc",
        note: "Jangan lupa ibadah",
        prescription: "air putih 10 gelas per6jam",
      },
    ]);
    console.log("===> DONE Seeding Medical Records");
  }
}
