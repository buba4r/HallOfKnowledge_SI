import { User } from "../utils/user";
const mysql = require("mysql");

export class Maria {
  private db_server: string;
  private db_name: string;
  private db_user: string;
  private db_pass: string;

  private connection = null;

  public static maria = null;

  public constructor(
    serveur: string,
    name: string,
    user: string,
    pass: string
  ) {
    this.db_server = serveur;
    this.db_name = name;
    this.db_user = user;
    this.db_pass = pass;

    this.connection = this.getConnection();

    Maria.maria = this;
  }

  public static getMariaDb(): Maria {
    if (Maria.maria == null) console.log("Error: u should init MariaDB");
    return Maria.maria;
  }

  private getConnection() {
    let connection = mysql.createConnection({
      host: this.db_server,
      user: this.db_user,
      password: this.db_pass,
      database: this.db_name
    });
    connection.connect(err => {
      if (err) throw err;
      console.log(`MariaDB: connected to ${this.db_server}:${this.db_user}`);
    });
    return connection;
  }

  private formatDate(date: Date): string {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  public getUsers(callback) {
    this.connection.query("SELECT * FROM utilisateur", (err, rows) => {
      if (err) {
        throw err;
      } else {
        callback(rows);
      }
    });
  }

  public getUser(mail: string, password: string, callback) {
    let query =
      "SELECT * FROM utilisateur WHERE utl_mail = ? AND utl_mot_de_passe = ?";
    let param = [mail, password];

    this.connection.query(query, param, (err, rows) => {
      if (err) {
        throw err;
      } else {
        callback(rows);
      }
    });
  }

  public getCountUser(mail: string, callback) {
    let query = "SELECT COUNT(*) as nb FROM utilisateur WHERE utl_mail = ?";
    let param = [mail];

    this.connection.query(query, param, (err, row) => {
      if (err) {
        throw err;
      } else {
        callback(row[0]);
      }
    });
  }

  public getUserById(id: Int16Array, callback) {
    let query = "SELECT * FROM utilisateur WHERE utl_id = ?";
    let param = [id];

    this.connection.query(query, param, (err, rows) => {
      if (err) {
        throw err;
      } else {
        callback(rows);
      }
    });
  }

  public addUser(user: User, callback): void {
    this.getCountUser(user.getMail(), res => {
      if (res != null && res.nb === 0) {
        let query =
          "INSERT INTO utilisateur (utl_pseudo, utl_nom, utl_prenom, utl_date_naissance, utl_mail, utl_mot_de_passe) VALUES (?, ?, ?, ?, ?, ?)";
        let user_date = this.formatDate(user.getDateNaissance());
        let params = [
          user.getPseudo(),
          user.getNom(),
          user.getPrenom(),
          user_date,
          user.getMail(),
          user.getMotDePasse()
        ];

        this.connection.query(query, params, (err, res) => {
          if (err) {
            throw err;
          } else {
            callback({
              success: true,
              message: "u have just signed up"
            });
          }
        });
      } else {
        callback({
          success: false,
          message: "Email already exist"
        });
      }
    });
  }

  public updateUser(user: User, callback): void {
    let query =
      "UPDATE utilisateur SET utl_pseudo = ?, utl_nom = ?, utl_prenom = ?, utl_date_naissance = ?, utl_mail = ?, utl_mot_de_passe = ? WHERE utl_id = ?";
    let user_date = this.formatDate(user.getDateNaissance());
    let params = [
      user.getPseudo(),
      user.getNom(),
      user.getPrenom(),
      user_date,
      user.getMail(),
      user.getMotDePasse(),
      user.getId()
    ];
    this.connection.query(query, params, (err, res) => {
      if (err) {
        throw err;
      } else {
        callback(res);
      }
    });
  }

  public removeUser(user_id: number, callback): void {
    let query = "DELETE FROM utilisateur WHERE utl_id = ?";
    let param = [user_id];

    this.connection.query(query, param, (err, res) => {
      if (err) {
        throw err;
      } else {
        callback(res);
      }
    });
  }

  public cleanUsers(callback): void {
    let query = "DELETE FROM utilisateur WHERE 1";
    this.connection.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        callback(res);
      }
    });
  }

  public resetIncrement(start: number): void {
    let query = "ALTER TABLE utilisateur auto_increment = ?";
    let param = [start];

    this.connection.query(query, param, (err, res) => {
      if (err) {
        throw err;
      }
    });
  }

  public close() {
    this.connection.end();
  }
}
