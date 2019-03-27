const mongo = require("mongoose");

module.exports = mongo.model(
  "userSession",
  new mongo.Schema(
    {
      userId: String,
      isDeleted: Boolean
    },
    { versionKey: false }
  )
);
