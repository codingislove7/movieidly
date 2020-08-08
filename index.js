// add packages
const express = require("express");
const _ = require("underscore");
const bodyParser = require("body-parser");
const app = express();
const Joi = require("joi");
const { indexOf } = require("underscore");
// parse data
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// place holder for store data
const genres = [
  { id: 1, title: "comedy" },
  { id: 2, title: "action" },
  { id: 3, title: "bla bla" },
];
// Handle home page
app.get("/", (req, res) => {
  res.send("Home Page");
});
// handle get all genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});
// Handle get one genre by id
app.get("/api/genre/:id", (req, res) => {
  const item = _.find(genres, (g) => g.id == req.params.id);
  if (!item) return res.status(404).send("item not found");
  res.send(item);
});
// Handle post new genre ----
app.post("/api/genre/post/", (req, res) => {
  // validate incoming data and store as object
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const genre = {
    // generate a new id
    id: genres.length + 1,
    title: result.value.title,
  };
  genres.push(genre);
  res.send(genres);
});
// handle update a genre
app.put("/api/genre/update/:id", (req, res) => {
  let item = _.find(genres, (g) => g.id == req.params.id);
  item.title = req.body.title;

  res.send(genres);
});
// handle delete a genre
app.delete("/api/genre/delete/:id", (req, res) => {
  const item = _.find(genres, (g) => g.id == req.params.id);
  if (!item) return res.status(404).send("item not found");
//find index of item we want to update
  const index = genres.indexOf(item);
  delete that 
  genres.splice(index, 1);
  res.send(genres);
});
// Listen on Port
const port = process.env.PORT || "3001";
app.listen(port, () => {
  console.log(`Listen on Port: ${port} ...`);
});
// validate function
function validate(data) {
  // shape of input
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });
  // validate incoming data and store as object
  return schema.validate(data);
}
