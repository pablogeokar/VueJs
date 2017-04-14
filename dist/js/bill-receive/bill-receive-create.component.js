"use strict";

var names = ["Conta de Luz", "Conta de Água", "Conta de telefone", "Supermercado", "Cartão de Crédito", "Empréstimo", "Gasolina"];

window.billReceiveCreateComponent = Vue.extend({
    template: "\n<form name=\"form\" @submit.prevent=\"submit\">\n                    <label>Vencimento:</label>\n                    <input type=\"text\" v-model=\"bill.date_due\"><br/><br/>\n                    <label>Nome:</label>\n                    <select v-model=\"bill.name\">\n                        <option v-for=\"o in names\" :value=\"o\">{{ o }}</option>\n                    </select>\n                    <br/><br/>\n                    <label>valor:</label>\n                    <input type=\"text\" v-model=\"bill.value | numberFormat\"><br/><br/>\n                     <label>Pago?</label>\n                    <input type=\"checkbox\" v-model=\"bill.done\"><br/><br/>\n                    <input type=\"button\" value=\"Enviar\" v-on:click=\"submit\">\n                </form>\n",
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
});