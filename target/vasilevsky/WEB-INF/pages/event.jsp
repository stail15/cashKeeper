<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE HTML>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html lang="ru">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Новое событие</title>
    <link href="/resources/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="/resources/requestObj.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/addEvent.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/updateEvents.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/deleteEvent.js" charset="UTF-8"></script>
</head>
<body>

<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand">
                <span class="glyphicon glyphicon-usd"></span>
                &nbsp; CASH Keeper 1.0 &nbsp;
                <span class="glyphicon glyphicon-usd"></span>
            </a>
        </div>
        <div>
            <ul class="nav navbar-nav">
                <li><a href="/resultTable/">Итоговая таблица</a></li>
                <li><a href="/userList/">Список пользователей</a></li>
                <li class="active">
                    <a href="/event/">
                        <span class="badge">Список событий</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="navbar-right">
            <ul class="nav navbar-nav">
                <li><a href="#"><span class="glyphicon glyphicon-question-sign"></span></a></li>
            </ul>
        </div>
    </div>

</nav>
<br><br>

<div class="container">
    <div class="page-header" id="newEvent" align="left">
        <h3>Добавление события</h3>
        <table border="1">
            <tr>
                <th>Наименование</th>
                <td><input id="eventName" type="text"></td>
            </tr>
            <tr>
                <th>Дата события</th>
                <td><input id="eventDate" type="date"
                           value="<%= (new SimpleDateFormat("yyyy-MM-dd").format(Calendar.getInstance().getTime()))%>">
                </td>
            </tr>
            <tr>
                <th>Сумма сбора, руб.</th>
                <td><input id="summ" type="number"></td>
            </tr>
        </table>
        <input id="addEvent" type="button" value="Добавить" onclick="addEvent()">
    </div>
    <div id="eventList" align="center">
        <h3>Список событий</h3>
        <table id="eventTable">
            <script>updateEvents()</script>
        </table>

    </div>
</div>
</body>
</html>
