function deleteUser(userId, userName) {
    if (confirm('Подтвердите удаление пользователя \"' + userName + '\"?')) {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                updateUserList();
                alert('Пользователь ' + userName + ' успешно удален');
            }
        }
        xmlhttp.open("Get", "/deleteUser?userId=" + userId, true);
        xmlhttp.send();
    }
}
