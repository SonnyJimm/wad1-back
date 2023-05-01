const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
const isAuthenticated = require('../middleware/authentication').isAuthenticated;

router.post('/api/event/attend', isAuthenticated, eventController.attend);
//day

router.get('/api/event/attend/get', isAuthenticated, eventController.getAttend);

router.post('/api/event/attend/cancel', isAuthenticated, eventController.cancelAttend);
//day

router.post('/api/event/food/add', eventController.addFood);
//food_name, day, category

router.get('/api/event/food/get/:day', eventController.getFood);


router.put('/api/event/food/edit', eventController.editFood);
//food_id, day, category, new_name

router.delete('/api/event/food/delete/:category/:day/:food_id', eventController.deleteFood);
//example
//http://localhost:3000/api/event/food/delete/Main Course/Friday/zbSNEnJKS9960L5jxIkM

module.exports = router;