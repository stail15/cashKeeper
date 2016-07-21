function deleteEvent(eventId, eventName) {
    if (confirm('Подтвердите удаление события \"' + eventName + '\"?')) {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                updateEvents();
                alert('Событие ' + eventName + ' успешно удалено');
            }
        }
        xmlhttp.open("Get", "/deleteEvent?eventId=" + eventId, true);
        xmlhttp.send();
    }
}