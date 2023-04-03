const fs = require("fs");

fs.copyFile(
  "fixKecoa/index.js",
    "node_modules/knex/lib/dialects/postgres/index.js",
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);
