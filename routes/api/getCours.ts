const CoursModel = require("../../models/coursModel");

module.exports = app => {
  app.get("/api/getCours", (req, res, next) => {
    let { id } = req.query;
    if (id == null || id == undefined || id == 0) {
      CoursModel.find({}, (err, rows) => {
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
    } else {
      return res.send({
        success: true,
        message: `Id: ${id}`
      });
    }
  });
};
