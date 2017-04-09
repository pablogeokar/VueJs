'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n  <style type="text/css">            \n            .red{\n                color: red;\n            }\n            .green{\n                color: green;\n            }\n            .gray{\n                color: gray;\n            }\n            .minha-classe{\n                background-color: burlywood;\n            }\n        </style>\n        <div class="section">\n            <div class="container">\n                <h1 class="teal-text text-darken-3">{{ title }}</h1> \n                <h3 :class="{ \'gray\': status === false, \'green\': status === 0, \'red\': status >0 }">{{ status | statusPay }}</h3>            \n                <div class="row">\n                    <div class="col s5 offset-s7 z-depth-1">\n                        <h3> {{ total | numberFormat \'pt-BR\'}} </h3>\n                        <i class="material-icons medium teal-text text-lighten-1">add_circle</i>            \n                    </div>\n                    <!--\n                    <button class="btn teal waves-effect waves-dark">\n                    <i class="material-icons left">add_circle</i>\n                    Teste\n                    </button>\n                    <button class="btn-flat teal waves-effect waves-dark">\n                    <i class="material-icons left">add_circle</i>\n                    Teste\n                    </button>\n                    <button class="btn-floating">\n                    <i class="material-icons left">add_circle</i>\n                    Teste\n                    </button>\n                    <div class="row">\n                        <div class="col s4">\n                            <div class="card green darken-3">\n                                <div class="card-content white-text">\n                                    <p class="card-title">Meu T\xEDtulo</p>\n                                    <p>Pablo George</p>\n                                </div>\n                                <div class="card-action">\n                                    <a href="#">Minha \xE2ncora</a>\n                                </div>\n                             </div>\n                        </div>\n                         <div class="col s4">\n                            <div class="card">\n                                <div class="card-image">\n                                    <img src="http://mundoeducacao.bol.uol.com.br/upload/conteudo_legenda/7a81297b1ef3b8dd7a7ab8b5618577aa.jpg"/>     \n                                    <p class="card-title">Meu T\xEDtulo</p>\n                                </div>\n                                <div class="card-content">\n                                    <p class="card-title">Meu T\xEDtulo</p>\n                                    <p>Pablo George</p>\n                                </div>\n                                <div class="card-action">\n                                    <a href="#">Minha \xE2ncora</a>\n                                </div>\n                             </div>\n                        </div>\n                        -->\n                    </div>\n                </div>                \n            </div>       \n        </div>\n        <router-view></router-view>            \n       \n  ',
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