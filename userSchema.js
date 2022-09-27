//Otetaan Mongoose käytöönString
const mongoose = require('mongoose');

const userSchema = mongoose.Schema;

//Muokkaa tämä osion harjoitustyössä oman tietorakenteen mukaan
let user = new userSchema ( {
    name: {
       type: String
    },
    password: {
      type: String
    }
  },
    { collection: 'users'}
  )

// Export model, huom! Parametreina kokoelman nimi ja skeeman nimi, jotka pitää vaihtaa harkkatyön mukaiseksi.
module.exports = mongoose.model('users', user);