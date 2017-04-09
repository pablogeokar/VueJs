'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n  <style type="text/css">            \n            .red{\n                color: red;\n            }\n            .green{\n                color: green;\n            }\n            .gray{\n                color: gray;\n            }\n            .minha-classe{\n                background-color: burlywood;\n            }\n        </style>\n        <div class="section">\n            <div class="container">\n                <h1>{{ title }}</h1> \n                <h3 :class="{ \'gray\': status === false, \'green\': status === 0, \'red\': status >0 }">{{ status | statusPay }}</h3>            \n                <div class="row">\n                    <div class="col s5 offset-s7 z-depth-1">\n                        <h3> {{ total | numberFormat \'pt-BR\'}} </h3>            \n                    </div>\n                </div>                \n            </div>       \n        </div>\n        <router-view></router-view>            \n       \n  ',
    data: function data() {
        return {
            title: "Contas a Pagar",
            status: false,
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
            Bill.query().then(function (response) {
                self.calculeteStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var self = this;
            Bill.total().then(function (response) {
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