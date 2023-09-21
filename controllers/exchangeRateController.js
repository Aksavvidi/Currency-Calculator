const ExchangeRate = require('../models/exchangeRate');

// Implement CRUD operations for exchange rates
//Create a new exchange rate
exports.createExchangeRate = async (req, res) => {
    try {
      const { baseCurrency, targetCurrency, rate } = req.body;
      const exchangeRate = new ExchangeRate({ baseCurrency, targetCurrency, rate });
      await exchangeRate.save();
      res.status(201).json(exchangeRate);
      console.log("A new exchange rate created" + exchangeRate);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create exchange rate' });
    }
  };

  //Retrieve a list of all exchange rates
  exports.getAllExchangeRates =  async (req, res) => {
    try {
      const exchangeRates = await ExchangeRate.find();
      res.json(exchangeRates);
      console.log("find All Exchange rate" + exchangeRates );
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
  };

  //Retrieve all exchange rates based on a specific base currency
  exports.getExchangeRatesByBaseCurrency = async (req, res) => {
    const { baseCurrency } = req.params;
    try {
      const exchangeRates = await ExchangeRate.find({ baseCurrency });
      res.json(exchangeRates);
      console.log("Find All the exchange rates based on a specific base currency " + exchangeRates );
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
  };

  //update an existing exchange rate based on its base and target currencies.
  exports.updateExchangeRate = async (req, res) => {
    const { baseCurrency, targetCurrency } = req.params;
    const { rate } = req.body;
    try {
      const exchangeRate = await ExchangeRate.findOneAndUpdate(
        { baseCurrency, targetCurrency },
        { rate },
        { new: true }        
      );
      console.log("Updated"  )
      if (!exchangeRate) {
        return res.status(404).json({ error: 'Exchange rate not found' });
      }
      res.json(exchangeRate);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update exchange rate' });
    }
  };

  //Delete an exchange rate based on its base and target currencies.
  exports.deleteExchangeRate = async (req, res) => {
    const { baseCurrency, targetCurrency } = req.params;
    try {
      const exchangeRate = await ExchangeRate.findOneAndDelete({
        baseCurrency,
        targetCurrency,
      });
      console.log("Exchange rate"+ exchangeRate +"deleted ");
      if (!exchangeRate) {
        return res.status(404).json({ error: 'Exchange rate not found' });
      }
      res.json({ message: 'Exchange rate deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete exchange rate' });
    }
  };

// Service to convert a specific amount from base to target currency 
  exports.convert = async (req, res) => {
    const { baseCurrency, targetCurrency, amount } = req.body;
  
    try {
      // Query the exchange rate from the database
      const exchangeRate = await ExchangeRate.findOne({
        baseCurrency,
        targetCurrency,
      });
      console.log(exchangeRate);
  
      if (!exchangeRate) {
        return res.status(404).json({ error: 'Exchange rate not found' });
      }
  
      // Calculate the converted amount (amount given from the user)
      const convertedAmount = amount * exchangeRate.rate; 
      res.json({ convertedAmount });
      console.log(`The amount ${amount} ${baseCurrency} is ${convertedAmount} ${targetCurrency}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

