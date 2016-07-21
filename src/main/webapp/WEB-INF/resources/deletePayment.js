function deletePayment(paymentId, userId) {
    if (confirm('Подтвердите удаление платежа.')) {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                updatePayments();
                alert('Платеж успешно удален');
            }
        }
        xmlhttp.open("Get", "/deletePayment?paymentId=" + paymentId + "&userId=" + userId, true);
        xmlhttp.send();
    }
}