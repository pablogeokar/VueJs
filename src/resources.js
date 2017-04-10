Vue.http.options.root =  'http://192.168.1.101:8080/api';

window.Bill = Vue.resource('bills{/id}',{},{
    total: {method: 'GET', url: 'bills/total'}
});

window.BillReceive = Vue.resource('bills-receive{/id}',{},{
    total: {method: 'GET', url: 'bills-receive/total'}
});