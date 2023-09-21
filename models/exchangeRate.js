const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let exchangeRateSchema = new mongoose.Schema({
  baseCurrency: String,
  targetCurrency: String,
  rate:{
    type: Number,
    required: [true, 'rate is required field'],
  } ,
},{
  collection: 'exchangeRate',
  timestamps: true 
});

exchangeRateSchema.plugin(uniqueValidator);

module.exports = mongoose.model('exchangeRate', exchangeRateSchema);
