const CarConfiguration = require('../models/carConfigurationModel');

exports.index   = function(req, res){
    CarConfiguration.all((error, configurations) => {
        if(error) res.status(500).json(error);
        else if(configurations){
            res.status(200).json(configurations);
        }else{
            res.status(404).send();
        }
    });
}
exports.show    = function(req, res){
    const id = req.params.id;

    CarConfiguration.find(id, (error, configuration) => {
        if(error) res.status(500).json(error);
        else if(configuration){
            res.status(200).json(configuration);
        }else{
            res.status(404).send();
        }
    });
}
exports.create  = function(req, res){
    const newCarConfiguration = req.body;

    CarConfiguration.create(newCarConfiguration, (error, created) => {
        if(error) res.status(500).json(error);
        else if(created){
            res.status(200).send();
        }else{
            res.status(400).send();
        }
    });
}
exports.update  = function(req, res){
    const id = req.params.id,
        updatedCarConfig = req.body;

    if(!id) res.status(400).json();
    else{
        CarConfiguration.update(id, updatedCarConfig, (error, updated) => {
            if(error) res.status(500).json(error);
            else if(updated){
                res.status(200).send();
            }else{
                res.status(404).send();
            }
        });
    }
}
exports.delete  = function(req, res){
    const id = req.params.id;

    if(!id) res.status(400).json();
    else{
        CarConfiguration.delete(id, (error, deleted) => {
            if(error) res.status(500).json(error);
            else if(deleted){
                res.status(200).json();
            }else{
                res.status(404).json();
            }
        });
    }
}