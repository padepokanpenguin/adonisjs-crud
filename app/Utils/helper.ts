export const TABLE_NAME = {
  employee: "klinikku.employees",
  doctor: "klinikku.doctors",
  clinic: "klinikku.polyclinics",
};

export const roles = {
  show: "checkRole:doctor,admin,pharmacy",
  index: "checkRole:doctor,admin,pharmacy",
  store: "checkRole:doctor,admin",
  update: "checkRole:doctor,admin",
  destroy: "checkRole:admin",
};
