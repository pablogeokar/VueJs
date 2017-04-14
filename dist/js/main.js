'use strict';

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
        //  'main-component': mainComponent //cOMENTAR PARA FUNCIONAR A API
        'bill-component': billComponent //DESCOMENTAR PARA FUNCIONAR A API
    }

}, '#app');

/*Conserta erros de endereço e redireciona para rota padrão*/

router.redirect({
    '*': '/dashboard'
});

/*
class Bills {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }

    showVariables(texto = "Nenhum Nome") {
        console.log(this.id);
        console.log(this.name);
        console.log(texto);
    }

    get id() { return this._id };
    get name() { return this._name };

    set id(id) { return this._id = id };
    set name(name) { return this._name = name };
}


class BillPay extends Bills {
    constructor(id, name, pago){
        super(id, name)
        this._pago = pago;
    }

    get pago(){return this._pago};
    set pago(pago){return this._pago = pago};
}

let bill = new BillPay(1, "Supermercado", true);
bill.id = 1000;
bill.name = "Fatura de Cartão de Crédito";
console.log(bill.id);
console.log(bill.name);
console.log(bill.pago);
*/