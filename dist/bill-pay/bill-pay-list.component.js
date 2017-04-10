'use strict';

window.billPayListComponent = Vue.extend({
    template: '\n    <div class="container">\n    <div class="row">\n        <h2>Minhas Contas a Pagar</h2>\n        <table class="bordered striped highlight centered responsive-table z-depth-5">\n            <thead>\n                <tr>\n                    <th>#</th>\n                    <th>Vencimento</th>\n                    <th>Nome</th>                    \n                    <th>Valor</th>\n                    <th>Paga?</th>\n                    <th>A\xE7\xF5es</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr v-for="(index,o) in bills">\n                    <td>{{ index+1 }}</td>\n                    <td>{{ o.date_due | dateFormat \'pt-BR\' }}</td>\n                    <td>{{ o.name | text_upper }}</td>\n                    <td align="right">{{ o.value | numberFormat \'pt-BR\'}}</td>\n                    <td class="white-text" :class="{\'green lighten-2\' : o.done, \'red lighten-2\' : !o.done}">\n                        {{ o.done | doneLabel }}\n                    </td>\n                    <td>\n                        <a v-link="{ name: \'bill-pay.update\', params: {id: o.id} }">Editar</a> |\n                        <a href="#" @click.prevent="deleteBill(o)">Excluir</a>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n\n<a href=\'#meu-modal\' id="btnmodal" class="btn waves-effect">Abrir Modal</a>\n<div class="modal" id="meu-modal">\n    <div class="modal-content">\n        <h2>Meu primeiro Modal</h2>\n        <p>TExto teste</p>\n    </div>\n    <div class="modal-footer">\n        <button class="btn btn-flat green">OK</button>\n    </div>    \n</div>\n\n ',

    created: function created() {
        var _this = this;

        Bill.query().then(function (response) {
            _this.bills = response.data;
        });

        $(document).ready(function () {
            $('#btnmodal').leanModal();
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