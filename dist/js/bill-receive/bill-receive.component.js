"use strict";

window.billReceiveComponent = Vue.extend({
    template: "\n<div class=\"section\">\n    <div class=\"container\">\n        <h4 class=\"teal-text text-darken-3\">{{ title }}</h4>\n        <div class=\"row\">\n            <div class=\"col s6\">\n                <div class=\"card z-depth-2\">\n                    <div class=\"card-content white-text\" :class=\"{ 'gray': status === false, 'green': status === 0, 'red': status >0 }\">\n                        <p class=\"card-title\">\n                            <i class=\"material-icons\">account_balance</i>\n                        </p>\n                        <h4>{{ status | statusReceive }}</h4>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col s6\">\n            <div class=\"card z-depth-2\">\n                    <div class=\"card-content\" >\n                        <p class=\"card-title\">\n                            <i class=\"material-icons\">payment</i>\n                        </p>\n                        <h4> {{ total | numberFormat 'pt-BR'}} </h4>\n                    </div>\n                </div>\n            </div>            \n        </div>\n    </div>\n</div>\n<div class=\"divider\"></div>\n<router-view></router-view>           \n  ",
    data: function data() {
        return {
            status: false,
            title: "Contas a Receber",
            total: 0
        };
    },

    computed: {},
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        calculeteStatus: function calculeteStatus(bills) {

            if (!bills.length) {
                this.status = false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function updateStatus() {
            var self = this;
            BillReceive.query().then(function (response) {
                self.calculeteStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var self = this;
            BillReceive.total().then(function (response) {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }

});