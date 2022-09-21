//Otetaan Mongoose käytöön
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema;

//Muokkaa tämä osion harjoitustyössä oman tietorakenteen mukaan
let customer = new customerSchema ( {
    name: {
       type: String
    },
    birthday: {
      type: Date
    },
    email: {
      type: String
    },
    address: {
      type: String
    },
    postalcode: {
      type: Number
    },
    phonenumber: {
      type: Number
    }
  },
    { collection: 'customer'}
  )

// Export model, huom! Parametreina kokoelman nimi ja skeeman nimi, jotka pitää vaihtaa harkkatyön mukaiseksi.
module.exports = mongoose.model('customer', customer);