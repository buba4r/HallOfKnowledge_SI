import { NeoNode } from "../utils/NeoNode";
const config = require("../config/db");

let {
  nodeCours,
  nodePartie,
  nodeChapitre,
  relation,
  local,
  host,
  user,
  password
} = config.dbNeo;

export class Neo4j {
  private neo4j = null;
  private driver = null;
  private nodes = [
    "Cours",
    "Partie",
    "Chapitre",
    "ABFM_Cours", // for obwian neo4j
    "ABFM_Partie", // for obiwan neo4j
    "ABFM_Chapitre" // for biwan neo4j
  ];
  private relations = ["HAS", "ABFM_HAS"];

  public constructor() {
    this.neo4j = require("neo4j-driver").v1;
    this.driver = this.neo4j.driver(
      host,
      this.neo4j.auth.basic(user, password)
    );
  }

  public getSession() {
    if (this.driver == null) {
      this.driver = this.neo4j.driver(
        host,
        this.neo4j.auth.basic(user, password)
      );
    }
    return this.driver.session();
  }

  public getNode();
  public getNode(node: NeoNode);
  public getNode(node?: NeoNode) {
    const session = this.getSession();
    let resultPromise;

    if (node != null) {
      // node doit être ("Cours", "Partie", "Chapitre")
      if (this.nodes.indexOf(node.type.trim()) != -1) {
        resultPromise = session.run(
          "MATCH (a:" +
            node.type.trim() +
            " {titre: $titre})-[r:HAS]->(b) RETURN a,r,b",
          {
            titre: node.titre.trim()
          }
        );
      } else {
        console.log(`Wrong Node (${node})`);
        return;
      }
    } else {
      resultPromise = session.run("MATCH (a)-[r:HAS]->(b) RETURN a,r,b");
    }
    resultPromise.then((result: any) => {
      session.close();
      const records = result.records;
      //const node = singleRecolrd.get(0);
      console.log(records);
      this.driver.close();
    });
  }

  public getChildOfNode(titre: string, typeNode: string, callback) {
    const session = this.getSession();
    let resultPromise;
    if (typeNode == nodeCours) {
      resultPromise = session.run(
        "MATCH (a:" +
          nodePartie +
          ")<-[r:" +
          relation +
          "]-(b:" +
          nodeCours +
          " {titre: $titre}) RETURN a",
        {
          titre: titre.trim()
        }
      );
    } else if (typeNode == nodePartie) {
      resultPromise = session.run(
        "MATCH (a:" +
          nodeChapitre +
          ")<-[r:" +
          relation +
          "]-(b:" +
          nodePartie +
          " {titre: $titre}) RETURN a",
        {
          titre: titre.trim()
        }
      );
    }

    resultPromise.then((result: any) => {
      session.close();
      this.driver.close();
      const records = result.records;
      //const node = singleRecolrd.get(0);
      //console.log(records);
      callback(records);
    });
  }

  /*private static upperCaseFirstChar(name: String): String {
    return name.charAt(0).toUpperCase + name.slice(1);
  }*/

  public addNode(node: NeoNode, callback) {
    if (this.nodes.indexOf(node.type.trim()) != -1) {
      // node doit être ("Cours", "Partie", "Chapitre")
      const session = this.getSession();
      const resultPromise = session
        .run("MERGE (a:" + node.type.trim() + " {titre: $titre}) RETURN a", {
          titre: node.titre.trim()
        })
        .then((result: any) => {
          session.close();
          const singleRecolrd = result.records[0];
          const node = singleRecolrd.get(0);
          console.log(node.properties.titre);
          this.driver.close();
          callback();
        });
    } else {
      console.log(`Wrong Node (${node})`);
    }
  }

  public deleteNode(node: NeoNode, callback) {
    if (this.nodes.indexOf(node.type.trim()) != -1) {
      // node doit être ("Cours", "Partie", "Chapitre")
      const session = this.getSession();
      const resultPromise = session
        .run(
          "MATCH (a:" + node.type.trim() + " {titre: $titre}) DETACH DELETE a",
          {
            titre: node.titre.trim()
          }
        )
        .then((result: any) => {
          session.close();
          this.driver.close();
          callback();
        });
    } else {
      console.log(`Wrong Node (${node})`);
    }
  }

  public addRelation(
    node: NeoNode,
    node2: NeoNode,
    relation: String,
    callback
  ) {
    if (this.relations.indexOf(relation.trim()) != -1) {
      if (
        [this.nodes[0], this.nodes[1]].indexOf(node.type.trim()) == -1 || // 1er noeud doit être soit cours soit partie
        [this.nodes[1], this.nodes[2]].indexOf(node2.type.trim()) == -1 // 2ème noeud doit être soit partie soit chapitre
      ) {
        console.log("Something is wrong with Nodes, check comment :P");
        return;
      }
      // first test passed
      if (
        (node.type === "Cours" && node2.type != "Partie") || // cours has only partie
        (node.type === "Partie" && node2.type != "Chapitre") // partie has only chapitre
      ) {
        console.log(
          `${node.type} khas tkon 3ndo relationship m3a ${node2.type}`
        );
        return;
      }
      // second test passed
      const session = this.getSession();
      const resultPromise = session
        .run(
          "MERGE (a1:" +
            node.type.trim() +
            " {titre: $titre}) MERGE (a2:" +
            node2.type.trim() +
            " {titre: $titre2}) MERGE (a1)-[n:" +
            relation.trim() +
            "]->(a2) RETURN n",
          {
            titre: node.titre.trim(),
            titre2: node2.titre.trim()
          }
        )
        .then((result: any) => {
          session.close();
          const singleRecolrd = result.records[0];
          const relation = singleRecolrd.get(0);
          console.log(relation);
          this.driver.close();
          callback();
        });
    } else {
      console.log(`Wrong Relation (${relation})`);
    }
  }

  public deleteRelation(node: NeoNode, callback);
  public deleteRelation(node: NeoNode, node2: NeoNode, callback);
  public deleteRelation(node: NeoNode, node2?: NeoNode) {
    if (this.nodes.indexOf(node.type.trim()) != -1) {
      if (node2 != null && this.nodes.indexOf(node2.type.trim()) == -1) {
        console.log(`Wrong Node (${node2.type})`);
        return;
      }
      // node doit être ("Cours", "Partie", "Chapitre")
      const session = this.getSession();
      let resultPromise;
      if (node2 != null) {
        resultPromise = session.run(
          "MATCH (a:" +
            node.type.trim() +
            " {titre: $titre})-[r:HAS]->(a2: " +
            node2.type.trim() +
            " {titre: $titre2}) DELETE r",
          {
            titre: node.titre.trim(),
            titre2: node2.titre.trim()
          }
        );
      } else {
        resultPromise = session.run(
          "MATCH (a:" +
            node.type.trim() +
            " {titre: $titre})-[r:HAS]->() DELETE r",
          {
            titre: node.titre.trim()
          }
        );
      }

      resultPromise.then((result: any) => {
        session.close();
        this.driver.close();
      });
    } else {
      console.log(`Wrong Node (${node})`);
    }
  }

  public updateNode(node: NeoNode, titre: String, callback) {
    if (this.nodes.indexOf(node.type.trim()) != -1) {
      // node doit être ("Cours", "Partie", "Chapitre")
      const session = this.getSession();
      const resultPromise = session
        .run(
          "MATCH (a:" +
            node.type.trim() +
            " {titre: $titre}) SET a.titre = $titreNew RETURN a",
          {
            titre: node.titre.trim(),
            titreNew: titre.trim()
          }
        )
        .then((result: any) => {
          session.close();
          const singleRecolrd = result.records[0];
          const node = singleRecolrd.get(0);
          console.log(node.properties.titre);
          this.driver.close();
          callback();
        });
    } else {
      console.log(`Wrong Node (${node})`);
    }
  }
}
