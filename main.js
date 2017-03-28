
var router = new VueRouter();

/* COMENTAR PARA FUNCIONAR A API
var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent,
        'dashboard-component': dashboardComponent        
    },
    template: '<bill-component></bill-component>',
    data: function () {
        return {
            billsPay: [
                { date_due: "19/03/2017", name: "Conta de Luz", value: 25.99, done: true },
                { date_due: "21/03/2017", name: "Conta de Água", value: 31.99, done: false },
                { date_due: "22/03/2017", name: "Conta de telefone", value: 5.30, done: false },
                { date_due: "25/03/2017", name: "Supermercado", value: 125.20, done: false },
                { date_due: "01/04/2017", name: "Cartão de Crédito", value: 225.99, done: false },
                { date_due: "02/04/2017", name: "Empréstimo", value: 525.99, done: false },
                { date_due: "03/04/2017", name: "Gasolina", value: 170.00, done: false },
            ],
             billsReceive: [
                { date_due: "19/03/2017", name: "Conta de Luz", value: 25.99, done: true },
                { date_due: "21/03/2017", name: "Conta de Água", value: 31.99, done: true },
                { date_due: "22/03/2017", name: "Conta de telefone", value: 5.30, done: true },
                { date_due: "25/03/2017", name: "Supermercado", value: 125.20, done: false },
                { date_due: "01/04/2017", name: "Cartão de Crédito", value: 225.99, done: false },
                { date_due: "02/04/2017", name: "Empréstimo", value: 525.99, done: false },
                { date_due: "03/04/2017", name: "Gasolina", value: 170.00, done: false },
            ]
        };
    }

});
*/

router.map({
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:id/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            },
        }
    },
    '/bill-receives': {        
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },           
                '/:id/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            }
        }
    },
    '/dashboard':{
        name: 'dashboard',
        component: dashboardComponent        
    },
    '*': {
        component: billPayListComponent
    }

});

router.start({
    components: {
      //  'main-component': mainComponent //cOMENTAR PARA FUNCIONAR A API
      'bill-component': billComponent //DESCOMENTAR PARA FUNCIONAR A API
    },

}, '#app')

/*Conserta erros de endereço e redireciona para rota padrão*/

router.redirect({
    '*': '/dashboard'
})




