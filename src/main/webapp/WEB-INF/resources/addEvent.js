function addEvent() {
    var eventName = document.getElementById("eventName").value;
    var eventDate = document.getElementById("eventDate").value;
    var summ = parseInt(document.getElementById("summ").value, 10);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("eventName").value = '';
            document.getElementById("eventDate").value = '';
            document.getElementById("summ").value = '';
            updateEvents();
            alert('Новое событие успешно добавлено');

        }
    }
    xmlhttp.open("Get", "/addEvent?eventName=" + eventName + "&eventDate=" + eventDate + "&summ=" + summ, true);
    xmlhttp.send();
}
