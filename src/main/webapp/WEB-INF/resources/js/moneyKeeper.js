/**
 * Created by stail on 06.04.2016.
 */
var mainLayout;
var secondLayout;
var sideBar;
var userGrid;
var resultTableGrid;
var activeUsersGrid;
var inActiveUsersGrid;
var userPaymentsGrid;
var eventGrid;
var addPaymentForm;
var addUserForm;
var addEventForm;
var dProForUserGrid;
var dProForEventGrid;
var dProForUserPaymentsGrid;
var userPaymentsToolBar;
var userGridToolBar;
var eventGridToolBar;
var userSelectedId;
var userPaymentSelectedId;
var eventSelectedId;


function doOnload() {


    mainLayout = createMainLayout();

    sideBar = createSideBar();

    userPaymentsToolBar = createToolBar("/resources/xml/toolbar.xml", '/resources/images/', mainLayout.cells("b"));
    userPaymentsToolBar.attachEvent("onclick", function (id) {
        onUserPaymentGridToolBarClick(id)
    }, "js");

    userGridToolBar = createToolBar("/resources/xml/userToolbar.xml", '/resources/images/', sideBar.cells('user_sidebar'));
    userGridToolBar.attachEvent("onclick", function (name) {
        onUserGridToolBarClick(name)
    });

    eventGridToolBar = createToolBar("/resources/xml/eventToolbar.xml", '/resources/images/', sideBar.cells('event_sidebar'));
    eventGridToolBar.attachEvent("onclick", function (name) {
        onEventGridToolBarClick(name)
    });

    eventGrid = createEventGrid("/getAllEvents");
    dProForEventGrid = createDataProcessor("/eventGrid", eventGrid);

    userGrid = createUserGrid("/getAllUsers");
    dProForUserGrid = createDataProcessor("/userGrid", userGrid);

    resultTableGrid = createResultTableGrid("/resources/xml/resultTable.xml");

    userPaymentsGrid = createUserPaymentsGrid();
    dProForUserPaymentsGrid = createDataProcessor("/paymentGrid", userPaymentsGrid); // create DataProcessor object for userPaymentGrid

    addPaymentForm = createAddPaymentForm("/resources/xml/newPaymentForm.xml");
    addPaymentForm.attachEvent("onButtonClick", function (name) {
        onAddPaymentFormClick(name)
    });

    userGrid.attachEvent("onRowSelect", function (rowId) {
        bindUserPaymentsGrid(rowId, "/getAllPayments?userId=" + rowId)
    }, "js"); //bind userPaymentsGrid to userGrid
    userGrid.attachEvent("onEditCell", function (stage, rId, cInd, nValue, oValue) {
        userGridOnEditCell(stage, rId, cInd, nValue, oValue)
    }, "js");
    userGrid.attachEvent("onSelectStateChanged", function (rowId) {
        setGridRowInBold(userGrid, rowId)
    }, "js");

    eventGrid.attachEvent("onRowSelect", function (rowId) {
        bindEventActiveUsersGrid(rowId)
    }, "js");
    eventGrid.attachEvent("onEditCell", function (stage, rId, cInd, nValue, oValue) {
        eventGridOnEditCell(stage, rId, cInd, nValue, oValue)
    }, "js");
    eventGrid.attachEvent("onSelectStateChanged", function (rowId) {
        setGridRowInBold(eventGrid, rowId)
    }, "js");


    addUserForm = createAddForm("/resources/xml/newUserForm.xml", "newUser");
    addUserForm.attachEvent("onButtonClick", function (name) {
        onAddUserFormClick(name)
    });

    addEventForm = createAddForm("/resources/xml/newEventForm.xml", "newEvent");
    addEventForm.attachEvent("onButtonClick", function (name) {
        onAddEventFormClick(name)
    });

    sideBar.attachEvent("onSelect", function (id, lastId) {
        onSideBarSelect(id, lastId)
    }, "js");

    secondLayout = createSecondLayout();
    inActiveUsersGrid = createActiveUsersGrid("b", "/getUsers/inactive");
    activeUsersGrid = createActiveUsersGrid("a", "/getUsers/active");

    inActiveUsersGrid.attachEvent("onRowDblClicked", function (rId, cInd) {
        onDblClickEventUserGrid(rId)
    });
    activeUsersGrid.attachEvent("onRowDblClicked", function (rId, cInd) {
        onDblClickEventUserGrid(rId)
    });
}

function createMainLayout() {
    var layout = new dhtmlXLayoutObject({

        parent: document.body,
        pattern: "3U",
        skin: "dhx_skyblue"
    });

    layout.cells("a").setText("CASH Keeper v1.0");
    layout.cells("a").setWidth(1000);
    layout.cells("a").setHeight(400);

    layout.cells("b").setText("Список платежей пользователя");

    return layout;
}

function createSecondLayout() {
    var cell = mainLayout.cells("b");
    cell.showView("event");
    var secondLayout = cell.attachLayout("2U");
    cell.showView("def");
    secondLayout.cells("b").setText("Неактивные пользователи:");
    secondLayout.cells("a").setText("Активные пользователи:");
    return secondLayout;
}

function createSideBar() {
    var sidebar;
    sidebar = mainLayout.cells("a").attachSidebar({
        template: 'tiles',
        single_cell: 'false',
        width: '230',
        icons_path: '/resources/images/',
        autohide: '',
        header: ''
    });

    sidebar.addItem({id: 'user_sidebar', text: 'Управление пользователями', icon: 'users.png'});
    sidebar.addItem({id: 'event_sidebar', text: 'Управление событиями', icon: 'event.png'});
    sidebar.addItem({id: 'email_sidebar', text: 'Рассылка сообщений', icon: 'mail.png'});
    sidebar.addItem({id: 'separator_1_sidebar', type: 'separator'});
    sidebar.addItem({id: 'separator_2_sidebar', type: 'separator'});
    sidebar.addItem({id: 'separator_3_sidebar', type: 'separator'});
    sidebar.addItem({id: 'separator_4_sidebar', type: 'separator'});
    sidebar.cells('user_sidebar').setActive();

    return sidebar;
}

function createToolBar(toolBarResource, iconResourse, cell) {
    var toolbar = cell.attachToolbar(); //sets toolbar
    toolbar.loadStruct(toolBarResource); //toolbar source
    toolbar.setIconsPath(iconResourse);
    return toolbar;
}

function onUserPaymentGridToolBarClick(id) {
    if (id == "newPayment") {
        if (userSelectedId) {
            mainLayout.cells("b").showView("newPayment");
        } else {
            dhtmlx.alert("Для добавления платежа необходимо выбрать пользователя.");
        }

    } else {
        if (id == "delPayment") {
            if (userPaymentSelectedId) {
                dhtmlx.confirm({
                    title: "Внимание!!!",
                    text: "Вы действительно хотите удалить платёж?",
                    callback: function (result) {
                        if (result) {
                            userPaymentsGrid.deleteRow(userPaymentSelectedId);
                            userPaymentSelectedId = null;
                            dhtmlx.alert("Платеж удален");
                        }
                    }
                });


            } else {
                dhtmlx.alert("Для удаления необходимо выбрать платеж.");
            }
        } else {
            if (id == "reload") {
                reloadUserPaymentGrid(userPaymentsGrid, "/getAllPayments?userId=" + userSelectedId);
            }
        }
    }

}

function createAddPaymentForm(path) {
    mainLayout.cells("b").showView("newPayment");
    var form = mainLayout.cells("b").attachForm();
    form.loadStruct(path);
    form.enableLiveValidation(true);
    form.attachEvent("onValidateError", function (name, value, result) {    // var status - status of validation
        form.setNote(name, {
            text: "Проверьте заполненные данные.", width: 300
        });
    });
    form.attachEvent("onValidateSuccess", function (name, value, result) {    // var status - status of validation
        form.clearNote(name);
    });
    mainLayout.cells("b").showView("def");

    return form;
}

function createAddForm(path, viewName) {
    mainLayout.cells("b").showView(viewName);
    var form = mainLayout.cells("b").attachForm();
    form.loadStruct(path);
    form.enableLiveValidation(true);
    form.attachEvent("onValidateError", function (name, value, result) {    // var status - status of validation
        form.setNote(name, {
            text: "Проверьте заполненные данные.", width: 300
        });
    });
    form.attachEvent("onValidateSuccess", function (name, value, result) {    // var status - status of validation
        form.clearNote(name);
    });

    mainLayout.cells("b").showView("def");

    return form;
}

function onAddPaymentFormClick(name) {
    if (name == "addPayment") {
        addPaymentForm.setItemValue("userId", userSelectedId);
        addPaymentForm.send("/addPayment", "post", function () {
            dhtmlx.alert("Платеж добавлен");
            addPaymentForm.clear();
            reloadUserPaymentGrid(userPaymentsGrid, "/getAllPayments?userId=" + userSelectedId);
        });
    } else {
        if (name == "escape") {
            addPaymentForm.clear();
        }
    }
    mainLayout.cells("b").showView("def");
}

function onAddUserFormClick(name) {
    if (name == "addUser") {
        var userName = addUserForm.getItemValue("name");
        addUserForm.send("/addUser", "post", function () {
            dhtmlx.alert("Пользователь " + userName + " успешно добавлен.");
            reloadUserGrid(userGrid, '/getAllUsers');
            addUserForm.clear();
        });

    } else {
        if (name == "escape") {
            addUserForm.clear();

        }
    }
    mainLayout.cells("b").showView("def");
}

function onAddEventFormClick(name) {
    if (name == "addEvent") {
        var eventName = addEventForm.getItemValue("eventName");
        addEventForm.send("/addEvent", "post", function () {
            dhtmlx.alert("Событие " + eventName + " успешно добавлено.");
            reloadEventGrid(eventGrid, '/getAllEvents');
            addEventForm.clear();
        });
    } else {
        if (name == "escape") {
            addEventForm.clear();
        }
    }
    mainLayout.cells("b").showView("event");

}

function onUserGridToolBarClick(name) {
    if (name == "addUser") {
        var rowId = userGrid.uid();                  //generates an unique id
        //userGrid.selectRowById(rowId);
        mainLayout.cells("b").setText("");
        addUserForm.setItemValue("id", rowId);
        addUserForm.setFocusOnFirstActive();
        mainLayout.cells("b").showView("newUser");

    } else {
        if (name == "delUser") {
            if (userSelectedId) {
                addPaymentForm.clear();
                mainLayout.cells("b").showView("def");
                dhtmlx.confirm({
                    title: "Внимание!!!",
                    text: "Вы действительно хотите удалить пользователя?",
                    callback: function (result) {
                        if (result) {
                            userGrid.deleteRow(userSelectedId);
                            userSelectedId = null;
                            dhtmlx.alert("Пользователь удален.");
                        }
                    }
                });
            } else {
                dhtmlx.alert("Для удаления необходимо выбрать пользователя.");
            }

        } else if (name == "reload") {
            addPaymentForm.clear();
            mainLayout.cells("b").showView("def");
            reloadUserGrid(userGrid, '/getAllUsers');
        }
    }
}

function onEventGridToolBarClick(name) {
    if (name == "addEvent") {
        var rowId = eventGrid.uid();
        mainLayout.cells("b").showView("newEvent");

    } else {
        if (name == "delEvent") {
            if (eventSelectedId) {
                //addPaymentForm.clear();
                mainLayout.cells("b").showView("event");
                dhtmlx.confirm({
                    title: "Внимание!!!",
                    text: "Вы действительно хотите удалить событие?",
                    callback: function (result) {
                        if (result) {
                            eventGrid.deleteRow(eventSelectedId);
                            eventSelectedId = null;
                            dhtmlx.alert("Событие удалено.");
                        }
                    }
                });
            } else {
                dhtmlx.alert("Для удаления необходимо выбрать событие");
            }

        } else if (name == "reload") {
            mainLayout.cells("b").showView("event");
            inActiveUsersGrid.clearAll();
            activeUsersGrid.clearAll();
            reloadEventGrid(eventGrid, '/getAllEvents');
        }
    }
}

function onDblClickEventUserGrid(rId) {
    dhtmlx.confirm({
        title: "Внимание!!!",
        text: "Вы действительно хотите перенести пользователя в/из событие(я)?",
        callback: function (result) {
            if (result) {
                doAjax(rId);
            }
        }

    });
}

function createUserGrid(url) {
    var userGrid = sideBar.cells('user_sidebar').attachGrid();
    userGrid.setHeader("ID, Имя пользователя,Пароль,Email,Платежи,Лог_статус,Статус");   //sets the headers of columns
    userGrid.setColumnIds("id,name,password,email,userPayment,isActive,status");         //sets the columns' ids
    userGrid.attachHeader(",#text_filter,,,,"); //sets filteres
    userGrid.setInitWidths("50,250,150,150,100,50,*");   //sets the initial widths of columns
    userGrid.setColAlign("left,left,left,left,left,left,left");     //sets the alignment of columns
    userGrid.setColTypes("ro,ed,ed,ed,ro,ed,ed");               //sets the types of columns
    userGrid.setColSorting("str,str,str,str,str,str,str");
    //userGrid.setColValidators(",NotEmpty,NotEmpty,ValidEmail");//sets the sorting types of columns
    userGrid.enableEditEvents(false, true, false);
    userGrid.setColumnHidden(0, true);
    userGrid.setColumnHidden(4, true);
    userGrid.setColumnHidden(5, true);
    userGrid.init();

    reloadUserGrid(userGrid, url);


    return userGrid;
}

function createResultTableGrid(url) {
    var resultTableGrid = mainLayout.cells("c").attachGrid();
    //resultTableGrid.setImagePath("../codebase/imgs/");
    resultTableGrid.load(url)
    return resultTableGrid;
}

function createEventGrid(url) {
    var eventGrid = sideBar.cells('event_sidebar').attachGrid();
    eventGrid.setHeader("ID, Событие, Дата, Сумма, Неактивные_пользователи,Лог_статус,Статус");   //sets the headers of columns
    eventGrid.setColumnIds("id,eventName,eventDate,summ,inactiveUsers,isActive,status");         //sets the columns' ids
    eventGrid.attachHeader(",#text_filter,,,,"); //sets filteres
    eventGrid.setInitWidths("50,250,150,150,100,100,*");   //sets the initial widths of columns
    eventGrid.setColAlign("left,left,left,left,left,left");     //sets the alignment of columns
    eventGrid.setColTypes("ro,ed,dhxCalendar,ed,ro,ed,ed");               //sets the types of columns
    eventGrid.setColSorting("str,str,str,str,str,str,str");  //sets the sorting types of columns
    eventGrid.enableEditEvents(false, true, false); // enter to editMode - (onclick - false,onDblclick - true, on F2 - false)
    eventGrid.setDateFormat("%Y-%m-%d", "%Y-%m-%d");
    eventGrid.setColumnHidden(0, true);
    eventGrid.setColumnHidden(4, true);
    eventGrid.setColumnHidden(5, true);

    eventGrid.init();

    reloadEventGrid(eventGrid, url);

    return eventGrid;
}

function createUserPaymentsGrid() {
    var userPaymentsGrid = mainLayout.cells("b").attachGrid();
    userPaymentsGrid.setHeader("ID, Дата платежа, Сумма руб., userId");
    userPaymentsGrid.setColumnIds("id,date,summ,userId");
    userPaymentsGrid.setInitWidths("50,100,*");
    userPaymentsGrid.setColAlign("left,left,left,left");
    userPaymentsGrid.setColTypes("ro,ro,ro,ro");
    userPaymentsGrid.setColSorting("str,str,str,str");
    userPaymentsGrid.setColumnHidden(3, true);
    userPaymentsGrid.init();
    userPaymentsGrid.attachEvent("onRowSelect", function (id, ind) {
        userPaymentSelectedId = id;
    });

    return userPaymentsGrid;
}

function createActiveUsersGrid(cell, url) {
    var activeUsersGrid = secondLayout.cells(cell).attachGrid();
    activeUsersGrid.setHeader("ID, Имя пользователя");   //sets the headers of columns
    activeUsersGrid.setColumnIds("id,name");         //sets the columns' ids
    activeUsersGrid.setInitWidths("50,*");   //sets the initial widths of columns
    activeUsersGrid.setColAlign("left,left");     //sets the alignment of columns
    activeUsersGrid.setColTypes("ro,ro");               //sets the types of columns
    activeUsersGrid.setColSorting("str,str");
    activeUsersGrid.setColumnHidden(0, true);
    activeUsersGrid.init();

    return activeUsersGrid;
}

function bindUserPaymentsGrid(rowId, url) {
    userSelectedId = rowId;
    userPaymentSelectedId = null;
    addPaymentForm.clear();
    addUserForm.clear();
    mainLayout.cells("b").showView("def");
    var userName = userGrid.cells(rowId, 1).getValue();
    mainLayout.cells("b").setText("Список платежей для " + userName);
    reloadUserPaymentGrid(userPaymentsGrid, url);

}

function bindEventActiveUsersGrid(rowId) {
    eventSelectedId = rowId;
    addEventForm.clear();
    mainLayout.cells("b").showView("event");

    reloadActiveUserGrid(inActiveUsersGrid, "/getUsers/false/" + eventSelectedId);
    reloadActiveUserGrid(activeUsersGrid, "/getUsers/true/" + eventSelectedId);

}

function createDataProcessor(url, gRid) {
    var dProcessor = new dataProcessor(url);
    dProcessor.setTransactionMode("POST", false);  // switch to Post,  update rows by one per request
    dProcessor.enableDataNames(true);
    dProcessor.init(gRid);

    return dProcessor;
}

function reloadUserPaymentGrid(gRid, url) {
    gRid.selectAll();
    gRid.clearAll();
    gRid.load(url, function () {
        gRid.forEachRow(function (id) {
            var cellObj = gRid.cells(id, 1);
            var milliSec = parseInt(cellObj.getValue());
            cellObj.setValue(formatDate(milliSec));
        });
    }, "js")

}

function reloadEventGrid(gRid, url) {
    gRid.selectAll();
    gRid.clearAll();
    setTimeout(function () {
        gRid.load(url, function () {
            translateActiveStatus(gRid, 5, 6);
            formatDate2(gRid, 2, 7);
        }, "js");
    }, 300);
}

function reloadUserGrid(gRid, url) {
    gRid.selectAll();
    gRid.clearAll();
    setTimeout(function () {
        gRid.load(url, function () {
            translateActiveStatus(gRid, 5, 6);
        }, "js");
    }, 300);

}

function reloadActiveUserGrid(gRid, url) {
    gRid.selectAll();
    gRid.clearAll();
    setTimeout(function () {
        //gRid.load(url,function(){}, "js");
        gRid.load(url, function () {
        }, "js");
    }, 300);

}

function userGridOnEditCell(stage, rId, cInd, nValue, oValue) {
    if (stage == 1 && cInd == 6) {
        var status = userGrid.cells(rId, cInd).getValue();
        JSON.stringify(status);
        var boolenStatus = true;
        if (status == "Aктивен") {
            status = "неактивным";
            boolenStatus = false
        } else {
            status = "активным";
        }
        dhtmlx.confirm({
            title: "Внимание!!!",
            text: "Вы действительно хотите сделать  пользователя " + status + " ?",
            callback: function (result) {
                if (result) {
                    userGrid.cells(rId, cInd - 1).setValue(JSON.stringify(boolenStatus));


                } else {
                    userGrid.editStop();
                }
            }
        });
    }
    if (stage == 2) {
        dProForUserGrid.setUpdated(userSelectedId, true, "updated");
        reloadUserGrid(userGrid, "/getAllUsers");

    }

}

function eventGridOnEditCell(stage, rId, cInd, nValue, oValue) {
    if (stage == 0) {
        activeUsersGrid.clearAll();
        inActiveUsersGrid.clearAll();
    }
    if (stage == 1 && cInd == 6) {

        var status = eventGrid.cells(rId, cInd).getValue();
        JSON.stringify(status);
        var boolenStatus = true;
        if (status == "Aктивен") {
            status = "неактивным";
            boolenStatus = false
        } else {
            status = "активным";
        }
        dhtmlx.confirm({
            title: "Внимание!!!",
            text: "Вы действительно хотите сделать  событие " + status + " ?",
            callback: function (result) {
                if (result) {
                    eventGrid.cells(rId, cInd - 1).setValue(JSON.stringify(boolenStatus));
                } else {
                    eventGrid.editStop();
                }
            }
        });

    }

    if (stage == 2) {
        dProForEventGrid.setUpdated(eventSelectedId, true, "updated");
        activeUsersGrid.clearAll();
        inActiveUsersGrid.clearAll();
        reloadEventGrid(eventGrid, "/getAllEvents");

    }

}

function setGridRowInBold(gRid, rowId) {

    gRid.forEachRow(function (id) {
        gRid.setRowTextNormal(id)
    });
    gRid.setRowTextBold(rowId);

}

function prepareLayout() {
    reloadUserGrid(userGrid, '/getAllUsers');
    reloadEventGrid(eventGrid, '/getAllEvents')
    userPaymentsGrid.clearAll();
    inActiveUsersGrid.clearAll();
    activeUsersGrid.clearAll();
    addPaymentForm.clear();
    addUserForm.clear();
    userSelectedId = null;
    userPaymentSelectedId = null;
    eventSelectedId = null;
}

function onSideBarSelect(id, lastId) {
    if (!(id == lastId)) {
        prepareLayout();
        if (id == 'user_sidebar') {
            mainLayout.cells("b").setText("Список платежей пользователя");
            mainLayout.cells("b").showView("def");
        }
        if (id == 'event_sidebar') {
            //mainLayout.cells("b").setText("Список участников для события ");
            mainLayout.cells("b").showView("event");
        }
        if (id == 'email_sidebar') {
            mainLayout.cells("b").setText("E-mail");
            mainLayout.cells("b").showView("mail");
        }
    }

}

function translateActiveStatus(gRid, statusCell, targetCell) {
    gRid.forEachRow(function (id) {
        var isActive = "Aктивен";
        var cellObj = gRid.cells(id, statusCell);
        var activeStatus = Boolean(cellObj.getValue());
        if (!activeStatus) {
            isActive = "Неактивен";
            gRid.setRowColor(id, "gainsboro");
        }
        var cell = gRid.cells(id, targetCell);
        cell.setValue(isActive);
    })
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

function formatDate2(gRid, cId, targetCid) {
    gRid.forEachRow(function (id) {
        var date = gRid.cells(id, cId).getValue;
        date = new Date(date);
        var month = '' + (date.getMonth() + 1);
        var day = '' + date.getDate();
        var year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        //date = [year,month,day].join('-');
        //gRid.cells(id,targetCid).setFormatedDate("%Y-%m-%d", date);
        gRid.cells(id, targetCid).setValue(date);
    });
}

function doAjax(userId) {
    userSelectedId = userId;
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            reloadActiveUserGrid(inActiveUsersGrid, "/getUsers/false/" + eventSelectedId);
            reloadActiveUserGrid(activeUsersGrid, "/getUsers/true/" + eventSelectedId);
        }
    }
    xmlhttp.open("Get", "/userForEvent/" + eventSelectedId + "/" + userSelectedId, true);
    xmlhttp.send();
}