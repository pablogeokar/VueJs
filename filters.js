Vue.filter('doneLabel', function (value) {
    if (value === false) {
        return "Não Paga";
    } else {
        return "Paga";
    }
});

Vue.filter('statusPay', function (value) {
    if (value === false) {
        return "Nenhuma Conta Cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a pagar"
    } else {
        return "Existem " + value + " conta(s) a ser(em) paga(s)";
    }    
});

Vue.filter('statusReceive', function (value) {
    if (value === false) {
        return "Nenhuma Conta Cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a Receber"
    } else {
        return "Existem " + value + " conta(s) a ser(em) Recebida(s)";
    }    
});

