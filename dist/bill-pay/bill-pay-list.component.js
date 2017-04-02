"use strict";

window.billPayListComponent = Vue.extend({
    template: "\n <style type=\"text/css\">\n            .pago{\n                color: green;\n            }\n            .nao-pago{\n                color: red;\n            }\n </style>\n<table border=\"1\" cellpadding=\"10\">\n                    <thead>\n                        <tr>\n                            <th>#</th>\n                            <th>Vencimento</th>\n                            <th>Nome</th>\n                            <th>Valor</th>\n                            <th>Paga?</th>\n                            <th>A\xE7\xF5es</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr v-for=\"(index,o) in bills\">\n                            <td>{{ index+1 }}</td>\n                            <td>{{ o.date_due | dateFormat }}</td>\n                            <td>{{ o.name }}</td>\n                            <td align=\"right\">{{ o.value | numberFormat}}</td>\n                            <td class=\"minha-classe\" :class=\"{'pago' : o.done, 'nao-pago' : !o.done}\">\n                                {{ o.done | doneLabel }}\n                            </td>\n                            <td>                              \n                                <a v-link=\"{ name: 'bill-pay.update', params: {id: o.id} }\">Editar</a> | \n                                <a href=\"#\" @click.prevent=\"deleteBill(o)\">Excluir</a>                                \n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n",
    created: function created() {
        var _this = this;

        Bill.query().then(function (response) {
            _this.bills = response.data;
        });
    },
    data: function data() {
        return {
            bills: []
        };
    },

    methods: {
        deleteBill: function deleteBill(bill) {
            var _this2 = this;

            if (confirm("Deseja excluir esta conta?")) {
                Bill.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info');
                });
            }
        }
    }
});