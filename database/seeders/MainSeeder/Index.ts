import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Application from "@ioc:Adonis/Core/Application";

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in dev mode and seeder is development
     * only
     */
    if (seeder.default.developmentOnly && !Application.inDev) {
      return;
    }

    await new seeder.default(this.client).run();
  }

  public async run() {
    await this.runSeeder(await import("../Employee"));
    await this.runSeeder(await import("../Doctor"));
    await this.runSeeder(await import("../Pharmacy"));
    await this.runSeeder(await import("../Clinic"));
    await this.runSeeder(await import("../Patient"));
    await this.runSeeder(await import("../RegistrationQueue"));
    await this.runSeeder(await import("../ClinicQueue"));
    await this.runSeeder(await import("../MedicalRecord"));
    await this.runSeeder(await import("../Transaction"));
    await this.runSeeder(await import("../TransactionDetail"));
    await this.runSeeder(await import("../User"));
  }
}
