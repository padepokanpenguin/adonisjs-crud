import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.post("/register", "AuthController.register");
Route.post("/login", "AuthController.login");

Route.post("/logout", async ({ auth, response }) => {
  await auth.use("api").logout();
  await auth.use("api").revoke();
  response.ok({ message: "Berhasil logout" });
});

Route.group(() => {
  Route.get("/employees", "EmployeesController.index");
  Route.get("/employees/:id", "EmployeesController.show");
  Route.post("/employees", "EmployeesController.store");
  Route.put("/employees/:id", "EmployeesController.update");
  Route.delete("/employees/:id", "EmployeesController.destroy");
  Route.resource("/pharmacists", "PharmacistsController").apiOnly();
  Route.resource("/doctors", "DoctorsController").apiOnly();
  Route.resource("/clinics", "ClinicsController").apiOnly();
  Route.shallowResource(
    "clinics.clinic-queues",
    "ClinicQueuesController"
  ).apiOnly();
  Route.resource("/patients", "PatientsController").apiOnly();
  Route.shallowResource(
    "patients.medical-records",
    "MedicalRecordsController"
  ).apiOnly();
  Route.resource(
    "/registration-queues",
    "RegistrationQueuesController"
  ).apiOnly();
  Route.resource("/transactions", "TransactionsController").apiOnly();
  Route.shallowResource(
    "transactions.transactions-details",
    "TransactionDetailsController"
  ).apiOnly();
}).middleware("auth");
