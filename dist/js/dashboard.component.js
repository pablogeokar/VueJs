"use strict";

window.dashboardComponent = Vue.extend({
    template: "\n    <h1>Dashboard<h1>\n    <h2>\n    Contas a Pagar: {{totalPay | numberFormat 'pt-BR'}}\n    </h2>\n    <h2>\n    Contas a Receber: {{totalReceive | numberFormat 'pt-BR'}}\n    </h2>\n    ",
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
    }

});