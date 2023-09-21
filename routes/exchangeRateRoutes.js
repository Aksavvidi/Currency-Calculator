const express = require('express');
const router = express.Router();
const ExchangeRateController = require('../controllers/exchangeRateController');
const authenticateToken = require('../authMiddleware');

/**Protected route (requires authentication) */
    // Create a new exchange rate
    router.post('/', ExchangeRateController.createExchangeRate);

    // Update an exchange rate by base and target currency
    router.patch('/:baseCurrency/:targetCurrency', ExchangeRateController.updateExchangeRate);

    // Delete an exchange rate by base and target currency
    router.delete('/:baseCurrency/:targetCurrency', ExchangeRateController.deleteExchangeRate);

    //Convert a specific amount from base to target currency 
    router.post('/convert', ExchangeRateController.convert);

/** public routes */
    // Get all exchange rates
    router.get('/', ExchangeRateController.getAllExchangeRates);

    // Get exchange rates by base currency
    router.get('/base/:baseCurrency', ExchangeRateController.getExchangeRatesByBaseCurrency);

module.exports = router;
