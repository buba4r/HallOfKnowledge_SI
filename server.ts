const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("<h2>Main App</h2>");
});

require("./routes/index.ts")(app);

app.listen(3001, () => {
  console.log("Listening on port 3001...");
});
