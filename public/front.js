// Luo taulukon kirjoista etusivulle
function readCustomer() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/customers",true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
  const customers = JSON.parse(xmlhttp.responseText); 

   // Luodaan taulukko, jossa käyttäjät näytetään
   let table = document.createElement('table');

   // Silmukka kirjojen läpikäymiseen
   for (let i = 0; i < customers.length; i++) {

    // Luo taulukkorivin
    let newRow = document.createElement('tr');

    // Luo solut title, author ja publisher-kentille
    // Käyttää funktiota createCell
    newRow.appendChild(createCell(customers[i].name));
    newRow.appendChild(createCell(customers[i].birthday));
    newRow.appendChild(createCell(customers[i].email));
    newRow.appendChild(createCell(customers[i].address));
    newRow.appendChild(createCell(customers[i].postalcode));
    newRow.appendChild(createCell(customers[i].phonenumber));

    //Luodaan päivitä-painike
    newRow.appendChild(createForm(customers[i], 'update'));

    //Luodaan poista-painike
    newRow.appendChild(createForm(customers[i], 'delete'));
    table.appendChild(newRow);
   }
   document.getElementById("demo").appendChild(table);

  }
}
// Etusivun taulukon luonnissa kutsutaan funktiota, ettei tarvi kirjoittaa auki jokaiseen solun luontiin erikseen.
function createCell(value) {
  let newCell = document.createElement('td');
  newCell.innerHTML = value;
  return newCell;
}
  }
  readCustomer();

// Luo päivitys, lisäys ja poistoformit
function createForm(customer, action) {
  let newCell = document.createElement('td');
  let form = document.createElement('form');
  form.method = (action == 'delete') ? 'POST' : 'GET';

  // Ternääri (ternatry) operaatio, ensimmäinen vaihtoehto true ja jälkimmäinen false. Vertaa IF
  form.action = (action == 'delete') ? '/deleteCustomer' : '/updateCustomer.html';

  //Lisää piilokenttä id:lle
  let input = document.createElement('input');
  input.value = customer._id;
  input.type = 'hidden'
  input.name = '_id'
  form.appendChild(input);

  // Jos update -> lisää lomakkeelle muutkin tiedot
  // lisätään asiakkaan nimi
  input = document.createElement('input');
  input.value = customer.name;
  input.type = 'hidden' //palataan
  input.name = 'name'
  form.appendChild(input);

  // lisätään syntymäpäivä
  input = document.createElement('input');
  input.value = customer.birthday;
  input.type = 'hidden'
  input.name = 'birthday'
  form.appendChild(input);

  // lisätään sähköposti
  input = document.createElement('input');
  input.value = customer.email;
  input.type = 'hidden'
  input.name = 'email'
  form.appendChild(input);

  // lisätään osoite
  input = document.createElement('input');
  input.value = customer.address;
  input.type = 'hidden'
  input.name = 'address'
  form.appendChild(input);

  // lisätään postinumero
  input = document.createElement('input');
  input.value = customer.postalcode;
  input.type = 'hidden'
  input.name = 'postalcode'
  form.appendChild(input);

  // lisätään puhelinnumero
  input = document.createElement('input');
  input.value = customer.phonenumber;
  input.type = 'hidden'
  input.name = 'phonenumber'
  form.appendChild(input);

  // Lisää painike
  input = document.createElement('input');
  input.type = 'submit';
  input.value = (action == 'delete') ? 'Delete customer' : 'Update customer';
  form.appendChild(input)
  newCell.appendChild(form);
  return newCell;

}

function newCustomer() {

  if(!alert('Customer added succesfully!')) {
    window.location.hreff = "frontpage.html";
  }

}