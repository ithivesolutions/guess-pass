"use strict";

const app =
    process.env.NODE_ENV && process.env.NODE_ENV === "production"
      ? require("./app")
      : require("./app.dev"),
  routes = require("./routes");

app.use("/guess-api/newPass/", routes.newPass);

const server = app.listen(process.env.PORT || 3002, () =>
  console.log(`Listening on port ${process.env.PORT || 3002}!`)
);
server.on("close", () => console.log("Closing server"));

module.exports = server;
