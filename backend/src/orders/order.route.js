const express = require('express');
const { create } = require('./order.model');
const { createAOrder } = require('./order.controller');
const { getOrderByEmail } = require('./order.controller');

const router = express.Router();

// create order endpoint
router.post('/',createAOrder);

// get order by email address 
router.get('/email/:email',getOrderByEmail); 


module.exports = router;