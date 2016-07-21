function updateEvents() {
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var eventsList = JSON.parse(xhttp.responseText);
            alert(xhttp.responseText);

            var table = document.createElement('table');
            table.setAttribute('id', 'table');
            table.setAttribute('border', 1);
            table.setAttribute('id', 'eventTable');

            var tableHead = document.createElement('thead');
            table.appendChild(tableHead);

            var headRow = document.createElement('tr');
            tableHead.appendChild(headRow);

            var headers = new Array('№', 'Описание события', 'Дата', 'Сумма сбора', 'Статус', 'Удаление');

            for (var i = 0; i < headers.length; i++) {
                var cell = document.createElement('th');
                var cellText = document.createTextNode(headers[i]);
                cell.appendChild(cellText);
                headRow.appendChild(cell);
            }


            for (var j = 0; j < eventsList.length; j++) {
                var row = document.createElement('tr');
                if (!Boolean(eventsList[j].isActive)) {
                    row.style.background = "#DADAD4";
                }

                table.appendChild(row);

                var cell = document.createElement('td');
                var rowNumber = document.createTextNode(j + 1);
                cell.appendChild(rowNumber);
                row.appendChild(cell);

                cellText = document.createTextNode(eventsList[j].eventName);
                cell = document.createElement('td');
                cell.appendChild(cellText);
                row.appendChild(cell);

                cellText = document.createTextNode(eventsList[j].eventDate);
                cell = document.createElement('td');
                cell.appendChild(cellText);
                row.appendChild(cell);

                cellText = document.createTextNode(eventsList[j].summ);
                cell = document.createElement('td');
                cell.appendChild(cellText);
                row.appendChild(cell);

                var isActive = "Aктивен";
                var activeStatus = Boolean(eventsList[j].isActive);
                if (!activeStatus) {
                    isActive = "Неактивен";
                    row.style.background = "#DADAD4";
                }
                cellText = document.createTextNode(isActive);
                cell = document.createElement('td');
                cell.appendChild(cellText);
                row.appendChild(cell);


                var inputField = document.createElement('input');
                inputField.setAttribute('type', 'button');
                inputField.setAttribute('value', 'Удалить');
                inputField.setAttribute('onclick', 'deleteEvent(' + eventsList[j].id + ',\'' + eventsList[j].eventName + '\')');
                cell = document.createElement('td');
                cell.appendChild(inputField);
                row.appendChild(cell);

            }

            document.getElementById('eventList').removeChild(document.getElementById('eventTable'));
            document.getElementById('eventList').appendChild(table);

        }
    }
    xhttp.open("Get", "/getAllEvents", true)
    xhttp.send();
}