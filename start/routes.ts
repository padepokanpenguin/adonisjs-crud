import Route from "@ioc:Adonis/Core/Route";
import ApiToken from "App/Models/ApiToken";
import { roles, verifyEmail } from "App/Utils/helper";

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
  Route.get("/employees/:id", "EmployeesController.show")
    .middleware("checkRole:doctor,admin")
    .middleware(["verifyEmail"]);
  Route.post("/employees", "EmployeesController.store")
    .middleware("checkRole:doctor,admin")
    .middleware(["verifyEmail"]);
  Route.put("/employees/:id", "EmployeesController.update")
    .middleware("checkRole:doctor,admin")
    .middleware(["verifyEmail"]);
  Route.post("/employees/:id/upload", "EmployeesController.updloadImage")
    .middleware("checkRole: doctor,admin")
    .middleware(["verifyEmail"]);
  Route.delete("/employees/:id", "EmployeesController.destroy")
    .middleware("checkRole:admin")
    .middleware(["verifyEmail"]);

  Route.resource("/pharmacists", "PharmacistsController")
    .apiOnly()
    .middleware(roles)
    .middleware(verifyEmail);
  Route.post("/pharmacists/:id/upload", "PharmacistsController.updloadImage")
    .middleware("checkRole: doctor,admin")
    .middleware("verifyEmail");
  Route.resource("/doctors", "DoctorsController").apiOnly().middleware(roles);
  Route.post("/doctors/:id/upload", "DoctorsController.updloadImage")
    .middleware("checkRole: doctor,admin")
    .middleware("verifyEmail");
  Route.resource("/clinics", "ClinicsController").apiOnly().middleware(roles);
  Route.shallowResource("clinics.clinic-queues", "ClinicQueuesController")
    .apiOnly()
    .middleware(roles)
    .middleware(verifyEmail);
  Route.resource("/patients", "PatientsController")
    .apiOnly()
    .middleware(roles)
    .middleware(verifyEmail);
  Route.post("/patients/:id/upload", "PatientsController.updloadImage")
    .middleware("checkRole: doctor,admin")
    .middleware("verifyEmail");
  Route.shallowResource("patients.medical-records", "MedicalRecordsController")
    .apiOnly()
    .middleware(roles)
    .middleware(verifyEmail);
  Route.resource("/registration-queues", "RegistrationQueuesController")
    .apiOnly()
    .middleware(roles)
    .middleware(verifyEmail);
  Route.resource("/transactions", "TransactionsController").apiOnly();
  Route.shallowResource(
    "transactions.transactions-details",
    "TransactionDetailsController"
  )
    .apiOnly()
    .middleware(roles)
    .middleware(verifyEmail);

  // Route.resource("/email", "MailController").apiOnly();
  Route.post("/send-email", "MailController.send");
}).middleware("auth");

// Route.get("/", async ({ view }) => {
//   const v = await view.render("dashboard", {
//     firstName: "John",
//     lastName: "Doe",
//   });

//   return v;
// });

Route.get("/verify-email", async ({ view, request, response }) => {
  const token = request.input("token");

  if (!token) {
    return response.redirect("/");
  }

  const existingToken = await ApiToken.query()
    .preload("user")
    .where("token", token)
    .first();

  if (!existingToken) {
    return response.redirect("/");
  }

  // Update the user attached to the token and save.
  existingToken.user.isVerified = true;
  existingToken.user.save();

  // Delete the token
  await existingToken.delete();

  return view.render("emails/verified");
});
