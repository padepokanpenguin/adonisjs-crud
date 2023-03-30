import Route from "@ioc:Adonis/Core/Route";
import { roles } from "App/Utils/helper";

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
  Route.get("/employees", "EmployeesController.index").middleware(
    "checkRole:doctor,admin,pharmacy"
  );
  Route.get("/employees/:id", "EmployeesController.show").middleware(
    "checkRole:doctor,admin"
  );
  Route.post("/employees", "EmployeesController.store").middleware(
    "checkRole:doctor,admin"
  );
  Route.put("/employees/:id", "EmployeesController.update").middleware(
    "checkRole:doctor,admin"
  );
  Route.post(
    "/employees/:id/upload",
    "EmployeesController.updloadImage"
  ).middleware("checkRole: doctor,admin");
  Route.delete("/employees/:id", "EmployeesController.destroy").middleware(
    "checkRole:admin"
  );

  Route.resource("/pharmacists", "PharmacistsController")
    .apiOnly()
    .middleware(roles);
  Route.post(
    "/pharmacists/:id/upload",
    "PharmacistsController.updloadImage"
  ).middleware("checkRole: doctor,admin");
  Route.resource("/doctors", "DoctorsController").apiOnly().middleware(roles);
  Route.post(
    "/doctors/:id/upload",
    "DoctorsController.updloadImage"
  ).middleware("checkRole: doctor,admin");
  Route.resource("/clinics", "ClinicsController").apiOnly().middleware(roles);
  Route.shallowResource("clinics.clinic-queues", "ClinicQueuesController")
    .apiOnly()
    .middleware(roles);
  Route.resource("/patients", "PatientsController").apiOnly().middleware(roles);
  Route.post(
    "/patients/:id/upload",
    "PatientsController.updloadImage"
  ).middleware("checkRole: doctor,admin");
  Route.shallowResource("patients.medical-records", "MedicalRecordsController")
    .apiOnly()
    .middleware(roles);
  Route.resource("/registration-queues", "RegistrationQueuesController")
    .apiOnly()
    .middleware(roles);
  Route.resource("/transactions", "TransactionsController").apiOnly();
  Route.shallowResource(
    "transactions.transactions-details",
    "TransactionDetailsController"
  )
    .apiOnly()
    .middleware(roles);
}).middleware("auth");
