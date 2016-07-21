function updatePayments() {
    var xhttp;
    var pathArray = window.location.pathname.split("/");
    var userId = pathArray[2];
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var paymentsList = JSON.parse(xhttp.responseText);

            alert("Server said: " + xhttp.responseText);
            var table = document.createElement('table');
            table.setAttribute('id', 'table');
            table.setAttribute('border', 1);
            table.setAttribute('id', 'paymentTable');

            var tableHead = document.createElement('thead');
            table.appendChild(tableHead);

            var headRow = document.createElement('tr');
            tableHead.appendChild(headRow);

            var headers = new Array('№', 'Дата', 'Сумма', 'Удалить');

            for (var i = 0; i < headers.length; i++) {
                var cell = document.createElement('th');
                var cellText = document.createTextNode(headers[i]);
                cell.appendChild(cellText);
                headRow.appendChild(cell);
            }

            for (var j = 0; j < paymentsList.length; j++) {
                var row = document.createElement('tr');
                table.appendChild(row);

                var cell = document.createElement('td');
                var rowNumber = document.createTextNode(j + 1);
                cell.appendChild(rowNumber);
                row.appendChild(cell);

                var payDate = formatDate(paymentsList[j].date);

                cellText = document.createTextNode(payDate);
                cell = document.createElement('td');
                cell.appendChild(cellText);
                row.appendChild(cell);

                cellText = document.createTextNode(paymentsList[j].summ);
                cell = document.createElement('td');
                cell.appendChild(cellText);
                row.appendChild(cell);

                var inputField = document.createElement('input');
                inputField.setAttribute('type', 'button');
                inputField.setAttribute('value', 'Удалить');
                inputField.setAttribute('onclick', 'deletePayment(' + paymentsList[j].id + ',' + paymentsList[j].userId + ')');
                cell = document.createElement('td');
                cell.appendChild(inputField);
                row.appendChild(cell);

            }

            document.getElementById('paymentsList').removeChild(document.getElementById('paymentTable'));
            document.getElementById('paymentsList').appendChild(table);

        }
    }
    xhttp.open("Get", "/getAllPayments?userId=" + userId, true)
    xhttp.send();
}

function formatDate(milliSec) {
    var d = new Date(milliSec),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}