'use strict';

window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },
    template: '    \n  <style type="text/css">            \n            .red{\n                color: red;\n            }\n            .green{\n                color: green;\n            }\n            .gray{\n                color: gray;\n            }\n            .minha-classe{\n                background-color: burlywood;\n            }\n        </style>\n\n <div>\n            <h1>{{ title }}</h1> \n            <h3 :class="{ \'gray\': status === false, \'green\': status === 0, \'red\': status >0 }">{{ status | statusReceive }}</h3>            \n            <h3> {{ total | numberFormat}} </h3>            \n            <menu-component></menu-component>\n            <router-view></router-view>\n        </div>    \n       \n  ',
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