'use strict';

Vue.http.options.root = 'http://127.0.0.1:8080/api';

window.Bill = Vue.resource('bills{/id}', {}, {
    total: { method: 'GET', url: 'bills/total' }
});

window.BillReceive = Vue.resource('bills-receive{/id}', {}, {
    total: { method: 'GET', url: 'bills-receive/total' }
});