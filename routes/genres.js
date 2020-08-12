var express = require('express')
var router = express.Router()
const _ = require("underscore");
const Joi = require("joi");
// place holder for store data
const genres = [
    { id: 1, title: "comedy" },
    { id: 2, title: "action" },
    { id: 3, title: "bla bla" },
  ];
    
// handle get all genres
router.get("/", (req, res) => {
    res.send(genres);
  });
  // Handle get one genre by id
  router.get("/:id", (req, res) => {
    const item = _.find(genres, (g) => g.id == req.params.id);
    if (!item) return res.status(404).send("item not found");
    res.send(item);
  });
  // Handle post new genre ----
  router.post("/post/", (req, res) => {
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
  router.put("/update/:id", (req, res) => {
    let item = _.find(genres, (g) => g.id == req.params.id);
    item.title = req.body.title;
  
    res.send(genres);
  });
  // handle delete a genre
  router.delete("/delete/:id", (req, res) => {
    const item = _.find(genres, (g) => g.id == req.params.id);
    if (!item) return res.status(404).send("item not found");
  //find index of item we want to update
    const index = genres.indexOf(item);
    // delete the item
    genres.splice(index, 1);
    res.send(genres);
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

  // export the routers
  module.exports = router