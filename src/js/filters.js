Vue.filter('doneLabel', (value) => value == 0 ? "Não Paga" : "Paga");

Vue.filter('statusPay', (value) => {
    if (value === false) {
        return "Nenhuma Conta Cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a pagar"
    } else {
        return value + " conta(s) a pagar";
    }
});

Vue.filter('statusReceive', (value) => {
    if (value === false) {
        return "Nenhuma Conta Cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a Receber"
    } else {
        return value + " conta(s) a Receber";
    }
});

//Formata Moeda
Vue.filter('numberFormat', {
    read(value, locale) { //mostrar a informação na tela       
        var number = 0;
        if (value && typeof value !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        if (locale == 'pt-BR') {
            return new Intl.NumberFormat(locale, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL'
            }).format(number);
        } else {
            return number;
        }
    },
    write(value) { //salva a informação da tela
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '')
                .replace(/\,/g, '.')
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

//Formata Data
Vue.filter('dateFormat', {
    read(value, locale) { //mostrar a informação na tela
        if (value && typeof value !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : null;
                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }
            if (locale == 'pt-BR'){
                return new Intl.DateTimeFormat(locale).format(value).split(' ')[0];
            }
        }
        return value;
    },
    write(value) { //salva a informação da tela
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return value;
    }
});

Vue.filter('text_upper',{
    read(value){
        return value.toUpperCase();
    },
    write(value){
        return value;
    }
});
