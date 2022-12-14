// Ota express käyttöön
const express =  require('express');
const app = express();

// Ota mongoose käyttöön -> tietokantayhteys
const mongoose = require('mongoose');

//Ota customer käyttöön - muista vaihtaa harkassa oikea tiedoston nimi
const customer = require('./customerSchema.js');
const user = require('./userSchema.js');

//Ota mongodb käyttöön -- palataan asiaan, tarviiko asentaa erikseen
const mongodb = require('mongodb');

//Ota bodyparser käyttöön lomakkeen käsittelyä varten
const bodyparser = require('body-parser');

//Aseta määritykset express-palvelimelle
//Ota käyttöön public-tiedosto
app.use(express.static('public'));
//Ota käyttöön bodyparser
app.use(bodyparser.urlencoded({extended:false}));

//Muodostetaan tietokantayhteys
// Luo vakio connectionstringille

const uri = 'mongodb+srv://Miika:admin@cluster0.fdgqsic.mongodb.net/customerdb?retryWrites=true&w=majority'

// Muodostetaan yhteys tietokantaan
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser:true});

// Luodaan vakio tietokantayhteydelle
const db = mongoose.connection;
// Näytä ilmoitus, jos yhteys ok
db.once('open', function() {
    console.log('Tietokantayhteys avattu');
})

// Kirjoita get-funktio
app.get('/customers', function(req,res) {
     // Hae asiakkaat tietokannasta
    customer.find(req.query, function( err, result) { //tyhjät {} hakuehdossa tuo kaikki, req.query rajaa hakua
        if (err) {
        res.send(err)
        } else {
        res.send(result);
        }
    })
});

// Asiakkaan lisäys post-funktio
app.post('/newCustomer', function (req, res) {
    //console.log(req.body)
    //Varmistetaan, ettei ole ID:tä ja poistetaan jos on.
    delete req.body._id; 
    //Lisätään collectioniin uusi asiakas
    db.collection('customers').insertOne(req.body);
    res.redirect('/frontpage.html');   
});

// Poistofunktio
app.post('/deleteCustomer', function (req, res) {
    //Poistetaan collectionista kirja
    db.collection('customers').deleteOne({ _id: new mongodb.ObjectId(req.body._id)}, function( err, result) {
        if (err) {
        res.send('Error deleting with following data: ' + err);
        } else {
        res.redirect('/frontpage.html');
        }
    });
});

// Päivitysfunktio
app.post('/updateCustomer', function(req, res) {
    //Päivitetän collectionista asiakas. Kolme parametria: ID, mitä päivitetään ja funktio virheenkäsittelyyn ja palautteeseen.
    db.collection('customers').updateOne({ _id: new mongodb.ObjectId(req.body._id)},
    {$set: {name: req.body.name, birthday: req.body.birthday, email: req.body.email, address: req.body.address, 
        postalcode: req.body.postalcode, phonenumber: req.body.phonenumber}}, function(err, results) {
        if (err) {
        res.send('Error updating: ' + err);
        } else {
        res.redirect('/frontpage.html');
        }
    });   
});

// Käyttäjän lisäys post-funktio
app.post('/newUser', function (req, res) {
    delete req.body._id; 
    //Lisätään collectioniin uusi käyttäjä
    db.collection('users').insertOne(req.body);
    res.redirect('/login.html');
});

// Tarkastetaan onko käyttäjä olemassa
app.get('/getUser', function(req,res) {
   user.find(req.query, function( err, result) {
       if (err) {
        res.send(err)
       } else if (result.length == 0) {
        res.redirect('/login2.html');
       } else { 
        res.redirect('/frontpage.html');
       }
   })
});

//Laitetaan palvelin kuuntelemaan porttia 8080
const server = app.listen(8080, function(){});