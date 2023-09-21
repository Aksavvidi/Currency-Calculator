const Currency = require('../models/currencies');

// Implement CRUD operations for currencies
//Create
exports.createCurrency = async (req, res) => {
    try {
      const { code, name } = req.body;
      const currency = new Currency({ code, name });
      await currency.save();
      res.status(201).json(currency);
      console.log(currency);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create currency' });
    }
  };
  //Retrieve a list of all currencies (Read)
  exports.getAllCurrencies = async (req, res) => {
    try {
      const currencies = await Currency.find();
      console.log('Currencies found:',currencies);
      res.status(200).json({currencies});
      console.log("Success in finding All currencies");
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to fetch currencies' });
      console.log(error);
    }
  };

  //Retrieve a specific currency by its code.
  exports.getCurrencyByCode = async (req, res) => {
    const { code } = req.params;
    try {
      const currency = await Currency.findOne({ code });
      if (!currency) {
        return res.status(404).json({ error: 'Currency not found' });
      }
      res.json(currency);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch currency' });
    }
  };

  //Update an existing currency by its code.
  exports.updateCurrency = async (req, res) => {
    const { code } = req.params;
    const { name } = req.body;
    try {
      const currency = await Currency.findOneAndUpdate(
        { code },
        { name },
        { new: true }
      );
      if (!currency) {
        return res.status(404).json({ error: 'Currency not found' });
      }
      res.json(currency);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update currency' });
    }
  };

  //Delete a currency by its code
  exports.deleteCurrency = async (req, res) => {
    const { code } = req.params;
    try {
      const currency = await Currency.findOneAndDelete({ code });
      if (!currency) {
        return res.status(404).json({ error: 'Currency not found' });
      }
      res.json({ message: 'Currency deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete currency' });
    }
  };
