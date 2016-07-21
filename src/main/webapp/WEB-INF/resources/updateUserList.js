function updateUserList() {
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var userList = JSON.parse(xhttp.responseText);
            alert(xhttp.responseText);
            var table = document.createElement('table');
            table.setAttribute('id', 'table');
            table.setAttribute('border', 1);
            table.setAttribute('id', 'userTable');

            var tableHead = document.createElement('thead');
            table.appendChild(tableHead);

            var headRow = document.createElement('tr');
            tableHead.appendChild(headRow);

            var headers = new Array('№', 'Имя пользователя', 'Пароль', 'E-mail', 'Статус', 'Удаление');

            for (var i = 0; i < headers.length; i++) {
                var cell = document.createElement('th');
                var cellText = document.createTextNode(headers[i]);
                cell.appendChild(cellText);
                headRow.appendChild(cell);
            }


            for (var j = 0; j < userList.length; j++) {
                var row = document.createElement('tr');
                row.setAttribute('ondblclick', 'changeStatus(' + userList[j].id + ')');


                var cell = document.createElement('td');
                var rowNumber = document.createTextNode(j + 1);
                cell.appendChild(rowNumber);
                row.appendChild(cell);

                cellText = document.createTextNode(userList[j].name);
                cell = document.createElement('td');
                cell.appendChild(cellText);
                row.appendChild(cell);

                cellText = document.createTextNode(userList[j].password);
                cell = document.createElement('td');
                cell.appendChild(cellText);
                row.appendChild(cell);

                cellText = document.createTextNode(userList[j].email);
                cell = document.createElement('td');
                cell.appendChild(cellText);
                row.appendChild(cell);

                var isActive = "Aктивен";
                var activeStatus = Boolean(userList[j].isActive);
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
                inputField.setAttribute('onclick', 'deleteUser(' + userList[j].id + ',\'' + userList[j].name + '\')');
                cell = document.createElement('td');
                cell.appendChild(inputField);
                row.appendChild(cell);

                table.appendChild(row);

            }

            document.getElementById('userList').removeChild(document.getElementById('userTable'));
            document.getElementById('userList').appendChild(table);

        }
    }
    xhttp.open("Get", "/getAllUsers", true);
    xhttp.send();
}

function changeStatus(userId) {
    var xmlrequest;
    if (window.XMLHttpRequest) {
        xmlrequest = new XMLHttpRequest();
    }
    else {
        xmlrequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlrequest.onreadystatechange = function () {
        updateUserList();
    }
    xmlrequest.open("Get", "/changeUserStatus?userId=" + userId, true);
    xmlrequest.send();
}

