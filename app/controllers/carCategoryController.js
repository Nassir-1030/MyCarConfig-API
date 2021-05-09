const CarCategory = require("../models/carCategoryModel");
const Car = require("../models/carModel");

exports.index = function(req, res){
    CarCategory.all((error, carCategories) => {
        if(error) res.status(500).json(error);
        else if(carCategories){
            res.status(200).json(carCategories);
        }else{
            res.status(404).send();
        }
    });
}

exports.show = function(req, res){
    const id = req.params.id;
    CarCategory.find(id, (error, carCategory) => {
        if(error) res.status(500).json(error);
        else if(carCategory){
            // Find all cars for this category
            Car.findByCategory(carCategory.id, (error, categoryCars) => {
                if(categoryCars.length > 0) carCategory.cars = categoryCars;
                res.status(200).json(carCategory)
            });
        }else{
            res.status(404).send();
        }
    });
}

exports.create = function(req, res){
    const newCarCategory = req.body;
    CarCategory.create(newCarCategory, (error, created) => {
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
        updatedCarCategory = req.body;

    // If there is no id or no updated carCategory, this request is invalid
    if(!id || !updatedCarCategory) res.status(400).json();
    else{
        CarCategory.update(id, updatedCarCategory, (error, updated) => {
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

    // If there is no id or no updated carCategory, this request is invalid
    if(!id) res.status(400).json();
    else{
        CarCategory.delete(id, (error, deleted) => {
            if(error) res.status(500).json(error);
            else if(deleted){
                res.status(200).json();
            }else{
                res.status(404).json();
            }
        });
    }
}