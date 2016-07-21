var myLayout;
var myLayout2;
function doOnload() {
    myLayout = new dhtmlXLayoutObject({
        parent: document.body,
        pattern: "3U",
        skin: "dhx_skyblue"
    });

    myLayout.cells("a").setText("Главное меню");
    myLayout.cells("b").setText("Активное окно");
    myLayout.cells("c").setText("ResultTable");
    myLayout.cells("a").setWidth("250");
    myLayout2 = myLayout.cells("b").attachLayout("2U");
    myLayout2.cells("a").setWidth("800");

    var menu = myLayout.attachMenu(); //sets menu
    menu.loadStruct("/resources/xml/menu.xml"); //menu source

    var toolbar = myLayout2.cells("a").attachToolbar(); //sets toolbar
    toolbar.loadStruct("/resources/xml/toolbar.xml"); //toolbar source

    var userGrid = myLayout2.cells("a").attachGrid();
    userGrid.setHeader("ID, Имя пользователя, Пароль, Email, Платежи,Статус");   //sets the headers of columns
    userGrid.setColumnIds("id,name,password,email,userPayment,isActive");         //sets the columns' ids
    userGrid.attachHeader(",#text_filter,,,,"); //sets filteres
    userGrid.setInitWidths("50,250,150,150,100,*");   //sets the initial widths of columns
    userGrid.setColAlign("left,left,left,left,left,left");     //sets the alignment of columns
    userGrid.setColTypes("ro,ro,ro,ro,ro,ro");               //sets the types of columns
    userGrid.setColSorting("str,str,str,str,str,str");  //sets the sorting types of columns
    userGrid.setColumnHidden(0, true);
    userGrid.init();
    userGrid.load("/getAllUsers", function () {
        userGrid.forEachRow(function (id) {
            var isActive = "Aктивен";
            var cellObj = userGrid.cells(id, 5);
            var activeStatus = Boolean(cellObj.getValue());
            if (!activeStatus) {
                isActive = "Неактивен";
            }
            cellObj.setValue(isActive);
        })

    }, "js");


    var userGrid2 = myLayout2.cells("b").attachGrid();
    userGrid2.setHeader("ID, Дата платежа, Сумма руб.");
    userGrid2.setColumnIds("id,date,summ");
    userGrid2.setInitWidths("50,100,*");
    userGrid2.setColAlign("left,left,left");
    userGrid2.setColTypes("ro,ro,ro");
    userGrid2.setColSorting("str,str,str");
    userGrid2.init();


    userGrid.attachEvent("onRowSelect", function (rowId) {  // binds userGrid2 to userGrid
        var userName = userGrid.cells(rowId, 1).getValue();
        myLayout2.cells("b").setText("Список платежей для " + userName);
        userGrid2.selectAll();
        userGrid2.clearAll();
        userGrid2.load("/getAllPayments?userId=" + rowId, function () {
            userGrid2.forEachRow(function (id) {
                var cellObj = userGrid2.cells(id, 1);
                var milliSec = parseInt(cellObj.getValue());
                cellObj.setValue(formatDate(milliSec));
            });
        }, "js");


    })

    var dpg = new dataProcessor("/userGrid");  //adding dataProcessor
    dpg.setTransactionMode("POST", false);  // switch to Post,  update rows by one per request
    dpg.enableDataNames(true);
    dpg.init(userGrid);

    //dpg.attachEvent("onAfterUpdate", function(sid, action, tid, tag){  //after update row
    //  if (action == "inserted"){
    //      userGrid.selectRowById(tid);        //selects the newly-created row
    //   }
    //  });

    toolbar.attachEvent("onclick", function (id) {
        if (id == "newUser") {
            // var rowId=userGrid.uid();
            // var pos = userGrid.getRowsNum();
            //userGrid.addRow(rowId,["","тест","тест","тестовая запись"],pos);
            // userGrid.selectRowById(rowId);
            myLayout2.cells("b").showView("newUserForm");
            myLayout2.cells("b").setText("Создание нового пользователя");
            var form = myLayout2.cells("b").attachForm();
            form.loadStruct("/resources/xml/newPaymentForm.xml");
            form.bind(userGrid);
            form.attachEvent("onButtonClick", function (name, command) {
                form.save();
            })
        }

        if (id == "delUser") {
            var rowId = userGrid.getSelectedRowId();
            var rowIndex = userGrid.getRowIndex(rowId);
            if (rowId != null) {
                userGrid.deleteRow(rowId);
                if (rowIndex != (userGrid.getRowsNum() - 1)) {
                    userGrid.selectRow(rowIndex + 1, true);
                } else {
                    userGrid.selectRow(rowIndex - 1, true)
                }

            }
            userGrid.clearAll();
            userGrid.load("/getAllUsers", function () {
                userGrid.forEachRow(function (id) {
                    var isActive = "Aктивен";
                    var cellObj = userGrid.cells(id, 5);
                    var activeStatus = Boolean(cellObj.getValue());
                    if (!activeStatus) {
                        isActive = "Неактивен";
                    }
                    cellObj.setValue(isActive);
                })

            }, "js");
        }
    });

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
