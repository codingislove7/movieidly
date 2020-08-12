// add Modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");

// add routes 
const genres = require("./routes/genres")
const home = require("./routes/home")

// parse data
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// secure http requests
app.use(helmet());

// set the template engine
app.set('view engine', 'ejs')

// add routes
// default path0
app.use("/api/genre", genres)
app.use("/", home)
// Listen on Port
const port = process.env.PORT || "3001";
app.listen(port, () => {
  console.log(`Listen on Port: ${port} ...`);
});