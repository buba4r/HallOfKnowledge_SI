import { Maria } from "../../models/maria";
import { User } from "../../utils/user";

const UserSession = require("../../models/userSession");
const maria = Maria.getMariaDb();

module.exports = app => {
  app.post("/api/signin", (req, res, next) => {
    let { mail, password } = req.body;
    let user;
    console.log(mail + " " + password);
    maria.getUser(mail.trim(), password.trim(), result => {
      if (result.length > 0) {
        let {
          utl_pseudo,
          utl_nom,
          utl_prenom,
          utl_date_naissance,
          utl_mail
        } = result[0];
        user = new User(
          utl_pseudo,
          utl_nom,
          utl_prenom,
          utl_date_naissance,
          utl_mail
        );
      } else {
        let msgError = "There is no user with these infos";
        console.log(msgError);
        return res.send({
          success: false,
          message: msgError
        });
      }
      const userSession = new UserSession();
      userSession.userId = user.getId();
      userSession.isDeleted = false;
      userSession.save((err, result) => {
        if (err) {
          return res.send({
            sucess: false,
            message: "Error server"
          });
        }
        res.send({
          success: true,
          message: "u have been logged successfuly",
          token: result._id,
          user: user
        });
      });
    });
  });

  app.get("/api/verify", (req, res, next) => {
    const { token } = req.query;
    if (token != null && token.length > 0) {
      UserSession.find(
        {
          _id: token,
          isDeleted: false
        },
        (err, rows) => {
          if (err) {
            console.log(err.message);
            return res.send({
              success: false,
              message: "Error server"
            });
          }
          if (rows.length != 1) {
            return res.send({
              success: false,
              message: "Invalid token"
            });
          }
          return res.send({
            success: true,
            message: "200"
          });
        }
      );
    } else {
      return res.send({
        success: false,
        message: "token not valid"
      });
    }
  });

  app.get("/api/signout", (req, res, next) => {
    const { token } = req.query;
    if (token != null && token.length > 0) {
      UserSession.findOneAndUpdate(
        {
          _id: token,
          isDeleted: false
        },
        { $set: { isDeleted: true } },
        null,
        (err, rows) => {
          if (err) {
            console.log(err.message);
            return res.send({
              success: false,
              message: "Error server"
            });
          }
          return res.send({
            success: true,
            message: "200"
          });
        }
      );
    } else {
      return res.send({
        success: false,
        message: "token not valid"
      });
    }
  });
};
