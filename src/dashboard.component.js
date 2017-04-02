window.dashboardComponent = Vue.extend({
    template: `
    <h1>Dashboard<h1>
    <h2>
    Contas a Pagar: {{totalPay | numberFormat}}
    </h2>
    <h2>
    Contas a Receber: {{totalReceive | numberFormat}}
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
    
    computed: {
        pays: function () {
            /*
            var bills = this.$root.$children[0].billsPay;
 
            if (!bills.length) {
                return false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            return count;
            */

        },
        receives: function () {
            /*
            var bills = this.$root.$children[0].billsReceive;
 
            if (!bills.length) {
                return false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            return count;
            */
        }
    }

});
