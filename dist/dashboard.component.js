"use strict";

window.dashboardComponent = Vue.extend({
    template: "\n    <h1>Dashboard<h1>\n    <h2>\n    Contas a Pagar: {{totalPay | numberFormat}}\n    </h2>\n    <h2>\n    Contas a Receber: {{totalReceive | numberFormat}}\n    </h2>\n    ",
    data: function data() {
        return {
            totalReceive: 0,
            totalPay: 0
        };
    },
    created: function created() {
        this.TotalReceive();
        this.TotalPay();
    },
    methods: {
        TotalReceive: function TotalReceive() {
            var self = this;
            BillReceive.total().then(function (response) {
                self.totalReceive = response.data.total;
            });
        },
        TotalPay: function TotalPay() {
            var self = this;
            Bill.total().then(function (response) {
                self.totalPay = response.data.total;
            });
        }
    },

    computed: {
        pays: function pays() {
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
        receives: function receives() {
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