
var router = new VueRouter();

var mainComponent = Vue.extend({
    components: {
        'app-component': appComponent
    },
    template: '<app-component></app-component>',
    data: function () {
        return {
            bills: [
                { date_due: "19/03/2017", name: "Conta de Luz", value: 25.99, done: true },
                { date_due: "21/03/2017", name: "Conta de Água", value: 31.99, done: false },
                { date_due: "22/03/2017", name: "Conta de telefone", value: 5.30, done: false },
                { date_due: "25/03/2017", name: "Supermercado", value: 125.20, done: false },
                { date_due: "01/04/2017", name: "Cartão de Crédito", value: 225.99, done: false },
                { date_due: "02/04/2017", name: "Empréstimo", value: 525.99, done: false },
                { date_due: "03/04/2017", name: "Gasolina", value: 170.00, done: false },
            ]
        };
    }

});

router.map({
    '/bills': {
        name: 'bill.list',
        component: billListComponent
    },
    '/bill/create': {
        name: 'bill.create',
        component: billCreateComponent
    },
    '/bill/:index/update': {
        name: 'bill.update',
        component: billCreateComponent
    },
    /*Rota default*/
    '*': {
        component: billListComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    },

}, '#app')

/*Conserta erros de endereço e redireciona para rota padrão*/
router.redirect({
    '*': '/bills'
})



