const PartieModel = require("../../models/partieModel");
import { NeoNode } from "../../utils/NeoNode";
import { Neo4j } from "../../models/Neo4j";
const config = require("../../config/db");

const { nodeCours, nodePartie, nodeChapitre } = config.dbNeo;
const neo = new Neo4j();

module.exports = app => {
  function getTitrePartie(records) {
    var listPartie = new Array();
    for (let i = 0; i < records.length; i++) {
      listPartie.push({ titre: records[i]._fields[0].properties.titre });
    }
    return listPartie;
  }
  app.get("/api/getPartie", (req, res, next) => {
    let { coursTitre } = req.query;
    if (
      coursTitre == null ||
      coursTitre == undefined ||
      coursTitre.length <= 0
    ) {
      return res.send({
        success: false,
        message: "There is no coursTitle!"
      });
    } else {
      neo.getChildOfNode(coursTitre.trim(), nodeCours, records => {
        const listPartie = getTitrePartie(records);
        if (listPartie.length <= 0) {
          return res.send({
            success: true,
            message: "Empty"
          });
        }
        PartieModel.find({ $or: listPartie }, (err, rows) => {
          if (err) {
            console.log(err.message);
            return res.send({
              success: false,
              message: "Error server"
            });
          }
          return res.send({
            success: true,
            message: rows
          });
        });
      });
    }
  });
};
