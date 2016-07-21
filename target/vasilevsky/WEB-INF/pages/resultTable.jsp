<!DOCTYPE HTML>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html lang="ru">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width = device-width, initial-scale = 1.0, maximum-scale = 1.0, user-scalable = no">
    <title>Итоги</title>
    <link href="/resources/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="/resources/requestObj.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/resultTable.js" charset="UTF-8"></script>
    <script type="text/javascript" src="/resources/js/dhtmlxgrid.js" charset="UTF-8"></script>

</head>

<body id="text">

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
                <li class="active">
                    <a href="/resultTable/">
                        <span class="badge">Итоговая таблица</span>
                    </a>
                </li>
                <li><a href="/userList/">Список пользователей</a></li>
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
<br><br><br>

<div class="col-sm-1 col-md-1 sidebar">

    <ul class="nav nav-sidebar">
        <li class="active"><a href="#">Итоговая таблица <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Список пользователей</a></li>
        <li>
            <button type="button" class="btn btn-default">
                <span class="glyphicon glyphicon-sort-by-attributes"></span>
            </button>
        </li>
        <li><a href="#">Список событий</a></li>
    </ul>
</div>
<div class="container">
    <div class="page-header" id="resultTableList" align="left">
        <h3>Сводная таблица оплат</h3>
        <table id="resultTable">
            <script>getUsersInfo()</script>
        </table>
    </div>
</div>

</body>

</html>