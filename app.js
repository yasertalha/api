const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const { MONGODBURL } = require("./config.js/keys");

const cors = require("cors");
app.use(cors({
    origin: 'https://www.apirobo.live', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
require("./user");
app.use(express.json());
app.use(require("./router"));
mongoose.connect(MONGODBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("MONGODB CONNECTED");
});
mongoose.connection.on("error", (err) => {
  console.log("MONGODB error : " + err);
});
if (process.env.NODE_ENV == "production") {
  console.log("...................************ PRODUCTION ENVIRONMENT *******...................")
  app.use(express.static("mycustomapi_frontEnd/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "mycustomapi_frontEnd", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON : " + PORT);
});
