const router = require('express').Router();

// Import controllers here
const carController = require('../app/controllers/carController');
const authenticationController = require('../app/controllers/authenticationController');
const carConfigurationController = require('../app/controllers/carConfigurationController');
const carCategoryController = require('../app/controllers/carCategoryController');

// ROUTES

// AUTHENTICATION
router.post('/login', authenticationController.login)
router.post('/logout', authenticationController.logout)

// CAR ROUTES
router.get('/cars', carController.index)
router.get('/cars/:id', carController.show)
router.post('/cars', carController.create)
router.put('/cars/:id', carController.update)
router.delete('/cars/:id', carController.delete)

// CAR CONFIGURATIONS ROUTES
router.get('/car-configurations', carConfigurationController.index)
router.get('/car-configurations/:id', carConfigurationController.show)
router.post('/car-configurations', carConfigurationController.create)
router.put('/car-configurations/:id', carConfigurationController.update)
router.delete('/car-configurations/:id', carConfigurationController.delete)

// CATEGORIES ROUTES
router.get('/car-categories', carCategoryController.index)
router.get('/car-categories/:id', carCategoryController.show)
router.post('/car-categories', carCategoryController.create)
router.put('/car-categories/:id', carCategoryController.update)
router.delete('/car-categories/:id', carCategoryController.delete)

module.exports = router;