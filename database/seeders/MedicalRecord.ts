import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Database.table("medical_records").multiInsert([
      {
        id: "0edd1f42-096e-4a11-aa5a-0464278b7b39",
        doctor_id: "813de0c2-5f56-4749-af98-54ddfc8415c9",
        patient_id: "b4832faf-2046-4522-a176-2161ee39df95",
        complaint:
          "bibir pecah-pecah, panas dalam, sariawan, gusi berdarah, sering mual, encok, dsb",
        diagnosis: "komplikasi akut",
        time: "2023-03-22 12:10:10",
        treatment: "jongkok 3 menit setiap hari",
        weight: 60.5,
        blood_pressure: "200cc",
        note: "Jangan lupa ibadah",
        prescription: "air putih 7 gelas per6jam",
      },
      {
        id: "6259707e-5ca3-434f-bfdd-b2dc3269ce0d",
        doctor_id: "813de0c2-5f56-4749-af98-54ddfc8415c9",
        patient_id: "027aba7d-8804-46c9-9d02-9ff680973c4a",
        complaint:
          "bibir pecah-pecah, panas dalam, sariawan, gusi berdarah, sering mual, sakit telinga",
        diagnosis: "komplikasi akad",
        time: "2023-03-22 12:10:10",
        treatment: "jongkok 7 menit setiap hari",
        weight: 60.5,
        blood_pressure: "200cc",
        note: "Jangan lupa ibadah",
        prescription: "air putih 7 gelas per6jam",
      },
      {
        id: "79675d4d-b861-4848-a85e-661b1a3fd237",
        doctor_id: "813de0c2-5f56-4749-af98-54ddfc8415c9",
        patient_id: "77d317ea-1478-45e0-bc61-c9561c3e99db",
        complaint:
          "bibir pecah-pecah, panas dalam, sariawan, gusi berdarah, sering mual, encok, mata merah, hidung kuning, kencing air",
        diagnosis: "komplikasi akut sangat",
        time: "2023-03-22 12:10:10",
        treatment: "lari 3 menit setiap hari",
        weight: 65.5,
        blood_pressure: "200cc",
        note: "Jangan lupa ibadah",
        prescription: "air putih 10 gelas per6jam",
      },
    ]);
  }
}
