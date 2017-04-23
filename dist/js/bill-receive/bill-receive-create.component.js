"use strict";

var names = ["Conta de Luz", "Conta de Água", "Conta de telefone", "Supermercado", "Cartão de Crédito", "Empréstimo", "Gasolina"];

module.exports = {
    template: "\n<div class=\"container\">      \n    <form name=\"form\" @submit.prevent=\"submit\">\n        <div class=\"row\">\n        <h2>Nova Conta</h2>\n            <div class=\"input-field col s6\"> \n                <label class=\"active\">Vencimento:</label>\n                <!-- <input type=\"date\" class=\"datepicker\" v-model=\"bill.date_due | dateFormat 'pt-BR'\">-->\n                <input type=\"text\" v-model=\"bill.date_due | dateFormat 'pt-BR'\" placeholder=\"Informe a Data\">\n            </div>\n\n            <div class=\"input-field col s6\">        \n                <label class=\"active\">valor:</label>\n                <input type=\"text\" v-model=\"bill.value | numberFormat 'pt-BR'\"><br/><br/>\n            </div>\n        </div>\n\n        <div class=\"row\">            \n            <div class=\"input-field col s6\">\n                <label class=\"active\">Nome:</label>\n                <select v-model=\"bill.name\" id=\"name\" class=\"browser-default\">        \n                    <option value=\"\" disabled selected>Escolha uma conta</option>\n                    <option v-for=\"o in names\" :value=\"o\">{{o}}</option>\n                </select>            \n            </div>\n\n            <div class=\"input-field col s6\">\n                <input type=\"checkbox\" v-model=\"bill.done\" id=\"pago\">\n                <label for=\"pago\">Pago?</label> \n            </div>\n        </div>               \n\n        <div class=\"row\">        \n        <div class=\"input-field col s12\">\n            <input type=\"button\" value=\"Enviar\" v-on:click=\"submit\" class=\"btn btn-large right\">\n        </div>\n        </div>        \n    </form>\n</div>\n",
    data: function data() {
        return {
            formType: "INSERT",
            names: names,
            bill: {
                date_due: "",
                name: "",
                value: 0,
                done: false
            }
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'UPDATE';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var self = this;
            if (this.formType == 'INSERT') {
                BillReceive.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                BillReceive.update({ id: this.bill.id }, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var self = this;
            BillReceive.get({ id: id }).then(function (response) {
                self.bill = response.data;
            });
        }
    }
};