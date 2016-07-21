<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE HTML>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html lang="ru">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Пользователи</title>
    <link href="/resources/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="/resources/requestObj.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/addUser.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/deleteUser.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/updateUserList.js" charset="UTF-8"></script>
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
                <li class="active">
                    <a href="/userList/">
                        <span class="badge">Список пользователей</span>
                    </a>
                </li>
                <li><a href="/event/">Список событий </a></li>
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
    <div class="page-header" id="newUser" align="left">

        <h3>Добавление сотрудника</h3>
        <table border="1">
            <tr>
                <th>Ф.И.О сотрудника</th>
                <td><input id="userName" type="text">
            </tr>
            <tr>
                <th>Пароль</th>
                <td><input id="userPassword" type="text"></td>
            </tr>
            <tr>
                <th>E-mail</th>
                <td><input id="email" type="email"></td>
            </tr>
        </table>
        <input id="addUser" type="button" value="Добавить" onclick="addUser()">


    </div>
    <div id="userList" align="center">
        <h3>Список сотрудников</h3>
        <table id="userTable">
            <script>updateUserList()</script>
        </table>

    </div>
</div>
</body>
</html>