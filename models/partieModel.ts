import { Partie } from "../utils/Partie";

const mongo = require("mongoose");

module.exports = mongo.model(
  "Partie",
  new mongo.Schema(Partie.schema, { versionKey: false })
);
