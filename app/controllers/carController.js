const Car = require('../models/carModel');
const CarCategory = require('../models/carCategoryModel');

exports.index = function(req, res){
    Car.all((error, cars) => {
        if(error){
            res.status(500).send();
        }else{
            res.status(200).json(cars);
        }
    });
}

exports.show = function(req, res){
    const id = req.params.id;
    
    Car.find(id, (error, car) => {
        if(error){
            res.status(500).send();
        }else if(car){
            if(car.categoryId){
                CarCategory.find(car.categoryId, (error, category) => {
                    car.category = category;
                    delete car.categoryId;
                    res.status(200).json(car);
                });                
            }
        }else{
            res.status(404).json();
        }
    });
}

exports.create = function(req, res){
    const newCar = req.body;
    Car.create(newCar, (error, created) => {
        if(error){
            res.status(500).send();
        }else if(created){
            res.status(200).send();
        }else{
            res.status(400).send();
        }
    });
}

exports.update = function(req, res){
    const id = req.params.id;
    const updatedCar = req.body;

    if(!id) res.status(400).json();
    else{
        Car.update(id, updatedCar, (error, updated) => {
            if(error){
                res.status(500).send();
            }else if(updated){
                res.status(200).send();
            }else{
                res.status(404).send();
            }
        });
    }
}

exports.delete = function(req, res){
    const id = req.params.id;
    if(!id) res.status(400).json();
    else{
        Car.delete(id, (error, deleted) => {
            if(error){
                res.status(500).send();
            }else if(deleted){
                res.status(200).send();
            }else{
                res.status(404).send();
            }
        });
    }
}