var express = require("express");
var router = express.Router();
const users = require("../models").users;

router.get("/", (req, res, next) => {
    users
        .findAll()
        .then(users => {
            res.json(users);
        })
        .catch(err => console.log(err));
});

module.exports = router;
