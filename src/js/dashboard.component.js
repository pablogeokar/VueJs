window.dashboardComponent = Vue.extend({
    template: `
    <h1>Dashboard<h1>
    <h2>
    Contas a Pagar: {{totalPay | numberFormat 'pt-BR'}}
    </h2>
    <h2>
    Contas a Receber: {{totalReceive | numberFormat 'pt-BR'}}
    </h2>
    `,
    data: function () {
        return {
            totalReceive: 0,
            totalPay: 0
        }
    },
    created: function () {
        this.TotalReceive();
        this.TotalPay();
    },
    methods: {
        TotalReceive: function () {
            var self = this;
          BillReceive.total().then(function(response){
                self.totalReceive = response.data.total;
            });
        },
        TotalPay: function () {
            var self = this;
          Bill.total().then(function(response){
                self.totalPay = response.data.total;
            });
        }
    },   
    

});
