var express = require('express')
var router = express.Router()

// Handle home page
router.get("/", (req, res) => {
    res.render("../views/home");
  });

    // export the routers
    module.exports = router