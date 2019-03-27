let prefixe = "ABFM_";
module.exports = {
  dbMaria: {
    host: "localhost",
    dbName: "users",
    user: "root",
    password: ""
  },
  dbMongo: "mongodb://localhost/AppSI", // "mongodb://obiwan2.univ-brest.fr/AppSI"
  dbNeo: {
    host: "bolt://obiwan2.univ-brest.fr:7687",
    user: "",
    password: "",
    nodeCours: prefixe + "Cours",
    nodePartie: prefixe + "Partie",
    nodeChapitre: prefixe + "Chapitre",
    relation: prefixe + "HAS"
    /* host: "bolt://obiwan2.univ-brest.fr:7687",
    user: "",
    password: "" */
    /*
    host: "bolt://localhost:7687",
    user: "neo4j",
    password: "2829"
    */
  }
};
