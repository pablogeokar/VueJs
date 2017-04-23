'use strict';

//require('style!css!');
require('./bill');
require('./filters');
require('./resources');
require(['./bill-pay/bill-pay.component', './bill-pay/bill-pay-list.component', './bill-pay/bill-pay-create.component', './bill-receive/bill-receive.component', './bill-receive/bill-receive-list.component', './bill-receive/bill-receive-create.component', './dashboard.component', './bill.component'], function (billPayComponent, billPayListComponent, billPayCreateComponent, billReceiveComponent, billReceiveListComponent, billReceiveCreateComponent, dashboardComponent, billComponent) {
    var router = new VueRouter();

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
                }
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
        '/dashboard': {
            name: 'dashboard',
            component: dashboardComponent
        },
        '*': {
            component: billPayListComponent
        }

    });

    router.start({
        components: {
            'bill-component': billComponent
        }

    }, '#app');

    /*Conserta erros de endereço e redireciona para rota padrão*/
    router.redirect({
        '*': '/dashboard'
    });
});