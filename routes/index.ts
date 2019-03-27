import { Maria } from "../models/maria";

const fs = require("fs");
const config = require("../config/db");

let { host, dbName, user, password } = config.dbMaria;

const maria = new Maria(host, dbName, user, password);
const mongo = require("mongoose");

mongo
  .connect(config.dbMongo, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .catch(() => {
    console.log("Connection failed");
  });

mongo.connection
  .once("open", () => {
    console.log("Mongo: Connection has been made");
  })
  .on("error", error => {
    console.log(`Connection error ${error}`);
  });

module.exports = app => {
  fs.readdirSync(__dirname + "/api").forEach(file => {
    require(`./api/${file.substr(0, file.indexOf("."))}`)(app);
  });
};
