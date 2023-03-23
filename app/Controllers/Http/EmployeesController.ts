import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
// import Database from "@ioc:Adonis/Lucid/Database";
import Employee from "App/Models/Employee";
// import { TABLE_NAME } from "App/Utils/helper";
import { v4 as uuidV4 } from "uuid";

export default class EmployeesController {
  public async index({ request, response }: HttpContextContract) {
    const { keyword = "" } = request.qs();
    // const data = await Database.query()
    //   .from(TABLE_NAME.employee)
    //   .where("name", "ilike", `%${keyword}%`);

    const data = await Employee.query()
      .select("id", "name", "username", "role", "join_date", "email")
      .preload("doctor", (query) => query.select("id", "license_number", "fee"))
      .preload("pharmacist", (query) => query.select("license_number"))
      .whereILike("name", `%${keyword}%`);

    response.ok({
      message: "Berhasil meraih employee route",
      data,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const employeeData = request.body();

      const newEmployee = { id: uuidV4(), ...employeeData };

      // const newEmplo = await Database.table("klinikku.employees")
      //   .insert(newEmployee)
      //   .returning("*");

      const newEmplo = await Employee.create(newEmployee);
      response.created({
        message: "Berhasil menyimpan data employee baru",
        data: newEmplo,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      // const data = await Database.query()
      //   .from(TABLE_NAME.employee)
      //   .select("id", "name", "email", "hire_date", "role")
      //   .where("id", id);

      const data = await Employee.findByOrFail("id", id);
      response.created({
        message: "Berhasil mengambil data details",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const updateEmployee = request.body();
      // const data = await Database.from(TABLE_NAME.employee)
      //   .where("id", id)
      //   .update(updateEmployee, "*");

      const data = await Employee.findByOrFail("id", id);
      await data.merge(updateEmployee).save();

      response.created({
        message: "data berhasil di update",
        data,
      });
    } catch (error) {
      console.log(error.message);
      response.send({ message: error.message });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params;

      // const jumlah_data_terhapus = await Database.from(TABLE_NAME.employee)
      //   .where("id", id)
      //   .delete();

      const data = await Employee.findByOrFail("id", id);
      await data.delete();

      response.created({
        message: "Data berhasil dihapus",
        data,
      });
    } catch (error) {
      response.send({ message: error.message });
    }
  }
}
