import { Chapitre } from "../utils/Chapitre";

const mongo = require("mongoose");

module.exports = mongo.model(
  "Chapitre",
  new mongo.Schema(Chapitre.schema, { versionKey: false })
);
