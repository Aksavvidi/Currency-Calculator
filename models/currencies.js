const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let currencySchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: String,
},{
  collection: 'currencies',
  timestamps: true 
});

currencySchema.plugin(uniqueValidator)

module.exports = mongoose.model('currencies', currencySchema);
