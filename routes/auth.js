var express = require('express');
var router = express.Router();
var models = require('../models');
var md5 = require('md5');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

router.post('/login', function(req, res) {
    var email = req.body.email;
    console.log(email)
    var validpassword = req.body.password;
    validpassword = md5(validpassword);
    models.users.findOne({where :{email:email} })
    .then(function(user){
        if (user!=null){
            payload = user.dataValues;
			password = payload.password;

			delete payload.password;
			delete payload.createdAt;
            delete payload.updatedAt;
            if (validpassword==password){
                var token = jwt.sign(payload, "rahasiabang");
                res.send({'data':user,'token':token})
            }
        }else{
            res.send('kosong');
        }
    })
    .catch(function(e){
        res.status(400).send('error');
    })
})
  

module.exports = router;