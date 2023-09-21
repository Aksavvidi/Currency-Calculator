const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/currencyController');
//const authenticateToken = require('../authMiddleware');

/** // Protected route (requires authentication)*/
    // Create a new currency
    router.post('/create', CurrencyController.createCurrency);

    // Update a currency by code
    router.patch('/update/:code', CurrencyController.updateCurrency);

    // Delete a currency by code
    router.delete('/delete/:code', CurrencyController.deleteCurrency);

 /**public routes */   
    // Get all currencies
    router.get('/findAll', CurrencyController.getAllCurrencies);

    // Get a specific currency by code
    router.get('/find/:code', CurrencyController.getCurrencyByCode);

module.exports = router;
