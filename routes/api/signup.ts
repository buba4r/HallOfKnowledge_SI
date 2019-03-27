import { Maria } from "../../models/maria";
import { User } from "../../utils/user";

const maria = Maria.getMariaDb();

module.exports = app => {
  app.post("/api/signup", (req, res, next) => {
    let { pseudo, nom, prenom, dateNaissance, mail, password } = req.body;
    dateNaissance = new Date(dateNaissance);
    const arr = [pseudo, nom, prenom, dateNaissance, mail, password];
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i] == null ||
        arr[i] == undefined ||
        (arr[i] != null && arr[i].length <= 0)
      ) {
        return res.send({
          success: false,
          message: "Input Fields must be filled"
        });
      }
    }

    let newUser = new User(pseudo, nom, prenom, dateNaissance, mail);
    newUser.setMotDePasse(password);

    maria.addUser(newUser, result => {
      if (!result.success) {
        return res.send({
          sucess: false,
          message: result.message
        });
      }
      res.send({
        success: true,
        message: result.message
      });
    });
  });
};
