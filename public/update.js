document.body.onload = function() {
    document.getElementById('name').value = getParam('name'); // Kokeillaan yhdellä
    document.getElementById('birthday').value = getParam('birthday');
    document.getElementById('email').value = getParam('email');
    document.getElementById('address').value = getParam('address');
    document.getElementById('postalcode').value = getParam('postalcode');
    document.getElementById('phonenumber').value = getParam('phonenumber');
} 
function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}