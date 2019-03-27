import { Cours } from "../utils/Cours";

const mongo = require("mongoose");

module.exports = mongo.model(
  "Cours",
  new mongo.Schema(Cours.schema, { versionKey: false })
);
