
let router = new VueRouter();

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






