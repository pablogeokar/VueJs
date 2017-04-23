"use strict";

var names = ["Conta de luz", "Conta de água", "Conta de telefone", "Supermercado", "Cartão de Crédito", "Empréstimo", "Gasolina"];

module.exports = {
    template: "\n<div class=\"container\">      \n    <form name=\"form\" @submit.prevent=\"submit\">\n        <div class=\"row\">\n        <h2>Nova Conta</h2>\n            <div class=\"input-field col s6\"> \n                <label class=\"active\">Vencimento:</label>\n                <!-- <input type=\"date\" class=\"datepicker\" v-model=\"bill.date_due | dateFormat 'pt-BR'\">-->\n                <input type=\"text\" v-model=\"bill.date_due | dateFormat 'pt-BR'\" placeholder=\"Informe a Data\">\n            </div>\n\n            <div class=\"input-field col s6\">        \n                <label class=\"active\">valor:</label>\n                <input type=\"text\" v-model=\"bill.value | numberFormat 'pt-BR'\"><br/><br/>\n            </div>\n        </div>\n\n        <div class=\"row\">            \n            <div class=\"input-field col s6\">\n                <label class=\"active\">Nome:</label>\n                <select v-model=\"bill.name\" id=\"name\" class=\"browser-default\">        \n                    <option value=\"\" disabled selected>Escolha uma conta</option>\n                    <option v-for=\"o in names\" :value=\"o\">{{o}}</option>\n                </select>            \n            </div>\n\n            <div class=\"input-field col s6\">\n                <input type=\"checkbox\" v-model=\"bill.done\" id=\"pago\">\n                <label for=\"pago\">Pago?</label> \n            </div>\n        </div>               \n\n        <div class=\"row\">        \n        <div class=\"input-field col s12\">\n            <input type=\"button\" value=\"Enviar\" v-on:click=\"submit\" class=\"btn btn-large right\">\n        </div>\n        </div>        \n    </form>\n</div>\n",
    data: function data() {
        return {
            formType: "INSERT",
            names: names,
            bill: new BillPay()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'UPDATE';
            this.getBill(this.$route.params.id);
        };
        $(document).ready(function () {
            $('#name').material_select();
        });
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            //let data = Vue.util.extend(this.bill, {date_due: this.getDateDue(this.bill.date_due)});
            if (this.formType == 'INSERT') {
                Bill.save({}, data).then(function (response) {
                    Materialize.toast("Conta criada com sucesso", 4000);
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill.update({ id: this.bill.id }, data).then(function (response) {
                    Materialize.toast("Conta atualizada com sucesso", 4000);
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            Bill.get({ id: id }).then(function (response) {
                //this.bill = response.data;
                _this2.bill = new BillPay(response.data);
            });
        },
        getDateDue: function getDateDue(date_due) {
            var date_dueObject = date_due;
            if (!(date_due instanceof Date)) {
                date_dueObject = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            }
            return date_dueObject.toISOString().split('T')[0];
        }
    }
};