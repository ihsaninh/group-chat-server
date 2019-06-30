var express = require("express");
var router = express.Router();
const users = require("../models").users;
const chats = require("../models").chats;

router.get("/", (req, res, next) => {
    chats
        .findAll({
            include: users,
            order: [["createdAt", "ASC"]]
        })
        .then(chats => {
            res.json({
                data: chats,
                myId: req.users.id
            });
        })
        .catch(err => {
            res.status(403).json({
                message: "unathorized request"
            });
        });
});

router.post("/", (req, res, next) => {
    let body = {
        content: req.body.content,
        user_id: req.users.id
    };
    if (!body.content || !body.user_id) {
        res.status(400).json({
            message: "Bad Request"
        });
    } else {
        chats
            .create(body)
            .then(data => {
                res.status(201).json(data.dataValues);
            })
            .catch(err => {
                res.status(500).json({
                    message: `internal server error`
                });
            });
    }
});

router.put("/:id", (req, res, next) => {
    let body = { content: req.body.content };
    chats
        .update(body, {
            where: { id: req.params.id, user_id: req.users.id }
        })
        .then(data => {
            if (data[0]) {
                chats
                    .findOne({ where: { id: req.params.id } })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err =>
                        res
                            .status(500)
                            .json({ message: "Internal Server Error !!" })
                    );
            } else {
                res.status(403).json({
                    message: "unathorized request"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "server error"
            });
        });
});

router.delete("/:id", (req, res, next) => {
    chats
        .destroy({
            where: {
                id: req.params.id,
                user_id: req.users.id
            }
        })
        .then(deletedChat => {
            res.status(200).json({
                message: "success deleted chat"
            });
        })
        .catch(err => {
            res.status(403).json({
                message: "unathorized request"
            });
        });
});

module.exports = router;
