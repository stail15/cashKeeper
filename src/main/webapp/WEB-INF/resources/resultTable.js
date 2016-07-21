function getUsersInfo() {
    var xmlRequest1;
    var xmlResponse1;
    if (window.XMLHttpRequest) {
        xmlRequest1 = new XMLHttpRequest();
    }
    else {
        xmlRequest1 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlRequest1.onreadystatechange = function () {
        if (xmlRequest1.readyState == 4 && xmlRequest1.status == 200) {
            xmlResponse1 = JSON.parse(xmlRequest1.responseText);
            getEventsInfo(xmlResponse1);
        }
    }

    xmlRequest1.open("Get", "/getUsersInfo", true);
    xmlRequest1.send();

}

function getEventsInfo(usersInfo) {
    var xmlRequest2;
    var xmlResponse2;
    if (window.XMLHttpRequest) {
        xmlRequest2 = new XMLHttpRequest();
    }
    else {
        xmlRequest2 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlRequest2.onreadystatechange = function () {
        if (xmlRequest2.readyState == 4 && xmlRequest2.status == 200) {
            xmlResponse2 = JSON.parse(xmlRequest2.responseText);
            resultTable(usersInfo, xmlResponse2);
        }
    }

    xmlRequest2.open("Get", "/getEventsInfo", true);
    xmlRequest2.send();

}

function resultTable(usersInfo, eventsInfo) {
    var userList = toJSON(usersInfo);

    var table = document.createElement('table');
    table.setAttribute('border', 1);
    // table.className='table table-hover table-responsive';
    table.setAttribute('id', 'resultTable');

    var tableHead1 = document.createElement('thead');
    var tableHead2 = document.createElement('thead');
    table.appendChild(tableHead1);
    table.appendChild(tableHead2);

    var headRow1 = document.createElement('tr');
    var headRow2 = document.createElement('tr');
    tableHead1.appendChild(headRow1);
    tableHead2.appendChild(headRow2);


    for (var i = 0; i <= eventsInfo.length; i++) {
        var cell;
        var cellText;
        if (i == 0) {
            cell = document.createElement('th');

            cellText = document.createTextNode('Дата события');
            cell.appendChild(cellText);
            headRow1.appendChild(cell);

            cell = document.createElement('th');
            cellText = document.createTextNode('Баланс');
            cell.appendChild(cellText);
            headRow1.appendChild(cell);
        } else {
            cell = document.createElement('th');
            if (eventsInfo[i - 1].isActive == false) {
                cell.style.background = "#DADAD4";
            }
            cellText = document.createTextNode(eventsInfo[i - 1].eventDate);
            cell.appendChild(cellText);
            cell.setAttribute('ondblclick', 'changeEventStatus(' + eventsInfo[i - 1].id + ')');
            headRow1.appendChild(cell);

            var title;
            if (eventsInfo[i - 1].isActive == true) {
                title = 'Активное событие: ' + eventsInfo[i - 1].eventName;
            }
            else {
                title = 'Неактивное событие: ' + eventsInfo[i - 1].eventName;
            }
            cell.setAttribute('title', title);
        }
    }

    for (var i = 0; i <= eventsInfo.length; i++) {
        var cell;
        var cellText;
        if (i == 0) {
            cell = document.createElement('th');
            cellText = document.createTextNode('Сумма сбора');
            cell.appendChild(cellText);
            headRow2.appendChild(cell);

            cell = document.createElement('th');
            cellText = document.createTextNode('');
            cell.appendChild(cellText);
            headRow2.appendChild(cell);
        } else {
            cell = document.createElement('th');
            cell.setAttribute('ondblclick', 'changeEventStatus(' + eventsInfo[i - 1].id + ')');

            if (eventsInfo[i - 1].isActive == false) {
                cell.style.background = "#DADAD4";
                cellText = document.createTextNode('Неактивно');
            }
            else {
                cellText = document.createTextNode(eventsInfo[i - 1].summ);
            }

            cell.appendChild(cellText);
            headRow2.appendChild(cell);
        }
    }

    var tbody = document.createElement('tbody');
    table.appendChild(tbody);


    for (var i = 0; i < userList.length; i++) {
        var row = document.createElement('tr');
        tbody.appendChild(row);

        var cell = document.createElement('th');
        cell.setAttribute('align', 'left');
        var userId = userList[i].id;
        cell.setAttribute('ondblclick', 'window.location="/userPayments/' + userId + '\"');
        var userName = document.createTextNode(userList[i].name);
        cell.appendChild(userName);
        row.appendChild(cell);

        var userResult = getUserResult(userList[i].id, userList[i].summ, eventsInfo);
        for (var j = 0; j < userResult.length; j++) {
            cell = document.createElement('td');
            cell.setAttribute('align', 'center');
            if (userResult[j] == 0) {
                cell.style.background = "#DADAD4";
            }
            else {
                if (userResult[j] < 0) {
                    cell.style.color = "#FF0000";
                }
            }

            var cellText = document.createTextNode(userResult[j]);

            cell.appendChild(cellText);
            row.appendChild(cell);
        }
    }


    document.getElementById('resultTableList').removeChild(document.getElementById('resultTable'));
    document.getElementById('resultTableList').appendChild(table);
}

function toJSON(usersInfo) {
    var arrayOfUsers = new Array;
    for (User in usersInfo) {
        var indexOfId = User.indexOf("id=");
        var indexOfComma = User.indexOf("\,");
        var id = User.substring(indexOfId + 3, indexOfComma);

        var indexOfName = User.indexOf("name=");
        indexOfComma = User.indexOf("\,", indexOfComma + 1);
        var userName = User.substring(indexOfName + 6, indexOfComma).replace("\'", "");

        var indexOfActiveStatus = User.indexOf("isActive=")
        indexOfComma = User.indexOf("\,", indexOfComma + 1);
        var isActive = User.substring(indexOfActiveStatus + 9, indexOfComma);

        var summ = usersInfo[User];

        var user = '{' + '\"id\":' + id + ', \"name\":\"' + userName + '\", \"isActive\":' + isActive + ', \"summ\":' + summ + '}';
        arrayOfUsers.push(JSON.parse(user));
    }
    return arrayOfUsers;
}

function getUserResult(userId, summ, eventsInfo) {
    var userArray = new Array;
    var userSumm = Number(summ);
    for (var i = (eventsInfo.length - 1); i >= 0; i--) {
        var isEventActive = eventsInfo[i].inactiveUsers.indexOf(userId, 0);
        var eventSumm = Number(eventsInfo[i].summ);
        var eventStatus = Boolean(eventsInfo[i].isActive);
        if (isEventActive > (-1) || eventStatus == false) {
            userArray.unshift(0);
        } else {
            if (userSumm >= eventSumm) {
                userArray.unshift(eventSumm);
                userSumm -= eventSumm;
            } else {
                if (userSumm > 0) {
                    userArray.unshift(userSumm);
                    userSumm -= eventSumm;

                } else {
                    userArray.unshift(0);
                    userSumm -= eventSumm;
                }

            }

        }

    }
    userArray.unshift(userSumm);
    return userArray;
}

function changeEventStatus(eventId) {
    var xmlrequest;
    if (window.XMLHttpRequest) {
        xmlrequest = new XMLHttpRequest();
    }
    else {
        xmlrequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlrequest.onreadystatechange = function () {
        getUsersInfo();
    }
    xmlrequest.open("Get", "/changeEventStatus?eventId=" + eventId, true);
    xmlrequest.send();
}