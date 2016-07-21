function addUser() {
    var name = document.getElementById("userName").value;
    var password = document.getElementById("userPassword").value;
    var email = document.getElementById("email").value;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("userName").value = '';
            document.getElementById("userPassword").value = '';
            document.getElementById("email").value = '';
            updateUserList();
            alert('Пользователь ' + name + ' успешно добавлен');
        }

    }

    xmlhttp.open("Get", "/addUser?name=" + name + "&password=" + password + "&email=" + email, true);
    xmlhttp.send();
}