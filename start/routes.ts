/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.get("/employees", "EmployeesController.index");
Route.get("/employees/:id", "EmployeesController.show");
Route.post("/employees", "EmployeesController.store");
Route.put("/employees/:id", "EmployeesController.update");
Route.delete("/employees/:id", "EmployeesController.destroy");

Route.resource("/doctors", "DoctorsController").apiOnly();
Route.resource("/clinics", "ClinicsController").apiOnly();
Route.resource("/patients", "PatientsController").apiOnly();
Route.resource(
  "/registration-queues",
  "RegistrationQueuesController"
).apiOnly();
Route.resource("/clinic-queues", "ClinicQueuesController").apiOnly();
Route.resource("/medical-records", "MedicalRecordsController").apiOnly();
Route.resource("/transactions", "TransactionsController").apiOnly();
Route.resource("/transactions-details", "TransactionDetailsController").apiOnly();