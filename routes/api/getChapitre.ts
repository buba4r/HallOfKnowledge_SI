const ChapitreModel = require("../../models/chapitreModel");
import { NeoNode } from "../../utils/NeoNode";
import { Neo4j } from "../../models/Neo4j";

const config = require("../../config/db");

const { nodeCours, nodePartie, nodeChapitre } = config.dbNeo;

const neo = new Neo4j();

module.exports = app => {
  function getTitreChapitre(records) {
    var listChapitre = new Array();
    for (let i = 0; i < records.length; i++) {
      listChapitre.push({ titre: records[i]._fields[0].properties.titre });
    }
    return listChapitre;
  }
  app.get("/api/getChapitre", (req, res, next) => {
    let { partieTitre } = req.query;
    if (
      partieTitre == null ||
      partieTitre == undefined ||
      partieTitre.length <= 0
    ) {
      return res.send({
        success: true,
        message: "There is no coursTitle!"
      });
    } else {
      neo.getChildOfNode(partieTitre.trim(), nodePartie, records => {
        const listChapitre = getTitreChapitre(records);
        if (listChapitre.length <= 0) {
          return res.send({
            success: true,
            message: "Empty"
          });
        }
        ChapitreModel.find({ $or: listChapitre }, (err, rows) => {
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
