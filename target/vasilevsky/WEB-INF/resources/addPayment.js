function addPayment() {
    var summ = document.getElementById("summ").value;
    var paymentDate = document.getElementById("paymentDate").value;
    var pathArray = window.location.pathname.split("/");
    var userId = pathArray[2];

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("summ").value = '';
            document.getElementById("paymentDate").value = '';
            updatePayments();
            alert("Платеж успешно добавлен");
        }
    }
    xmlhttp.open("Get", "/addPayment?summ=" + summ + "&paymentDate=" + paymentDate + "&userId=" + userId, true);
    xmlhttp.send();
}