const User = require('../models/userModel');

exports.login = function(req, res){
    const {name, password} = req.body;

    if(name && password){
        User.findByName(name, (error, user) => {
            if(error) res.status(500).json(error);
            else if(user){
                if(user.password === password){
                    req.session.userId = user.id;
                    console.log('Register user id into session');
                    console.log(req.session);
                    res.status(200).json();
                }else{
                    res.status(401).json();
                }
            }else{
                res.status(401).json();
            }
        });
    }else{
        res.status(400).send();
    }
}

exports.logout = function(req, res){
    if(req.session) req.session.destroy();
    res.status(200).json();
}