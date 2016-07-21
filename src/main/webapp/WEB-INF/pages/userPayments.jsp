<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE HTML>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html lang="ru">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Платежи</title>
    <link href="/resources/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="/resources/requestObj.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/addPayment.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/updatePayments.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/deletePayment.js" charset="UTF-8"></script>

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
                <li><a href="/event/">Список событий</a></li>
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
    <div class="page-header" id="userId" data-userId="{c}" align="left">
        <div id="newEvent">
            <h3>Добавление платежа</h3>
            <table border="1">
                <tr>
                    <th>Сумма платежа, руб</th>
                    <td><input id="summ" type="number"></td>
                </tr>
                <tr>
                    <th>Дата платежа</th>
                    <td><input id="paymentDate" type="date"
                               value="<%= (new SimpleDateFormat("yyyy-MM-dd").format(Calendar.getInstance().getTime()))%>">
                    </td>
                </tr>
            </table>
            <input id="addPayment" type="button" value="Добавить" onclick="addPayment()">
        </div>
        <div id="paymentsList" align="center">
            <h3>Список платежей для<br> ${userName}</h3>
            <table id="paymentTable">
                <script>updatePayments()</script>
            </table>
        </div>
    </div>
</div>
</body>
</html>
