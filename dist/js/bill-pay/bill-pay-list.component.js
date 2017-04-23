'use strict';

var modalComponent = require('../modal-component');

module.exports = {
    components: {
        'modal': modalComponent
    },
    template: '\n    <div class="container">\n    <div class="row">\n        <h2>Minhas Contas a Pagar</h2>\n        <table class="bordered striped highlight centered responsive-table z-depth-5">\n            <thead>\n                <tr>\n                    <th>#</th>\n                    <th>Vencimento</th>\n                    <th>Nome</th>                    \n                    <th>Valor</th>\n                    <th>Paga?</th>\n                    <th>A\xE7\xF5es</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr v-for="(index,o) in bills">\n                    <td>{{ index+1 }}</td>\n                    <td>{{ o.date_due | dateFormat \'pt-BR\' }}</td>\n                    <td>{{ o.name | text_upper }}</td>\n                    <td align="right">{{ o.value | numberFormat \'pt-BR\'}}</td>\n                    <td class="white-text" :class="{\'green lighten-2\' : o.done, \'red lighten-2\' : !o.done}">\n                        {{ o.done | doneLabel }}\n                    </td>\n                    <td>\n                        <a v-link="{ name: \'bill-pay.update\', params: {id: o.id} }">Editar</a> |\n                        <!--<a href="#" @click.prevent="deleteBill(o)">Excluir</a>-->\n                        <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n\n<modal :modal="modal">\n    <div slot="content">\n        <h4>Mensagem de Confirma\xE7\xE3o</h4>\n        <p><strong>Deseja excluir esta conta?</strong></p>\n        <div class="divider"></div>\n        <p> Nome : <strong>{{billToDelete.name}}</strong></p>\n        <p> Valor : <strong>{{billToDelete.value | numberFormat \'pt-BR\'}}</strong></p>\n        <p> Data de Vencimento : <strong>{{billToDelete.date_due | dateFormat \'pt-BR\'}}</strong></p>\n        <div class="divider"></div>\n    </div>\n    <div slot="footer">\n        <button class="btn btn-flat waves-effect green lighten-2 modal-close"\n         @click="deleteBill()">OK</button>\n        <button class="btn btn-flat waves-effect waves-red modal-close">Cancelar</button>\n    </div>\n</modal>\n\n ',

    created: function created() {
        var _this = this;

        Bill.query().then(function (response) {
            _this.bills = response.data;
        });
    },
    data: function data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },

    methods: {
        deleteBill: function deleteBill() {
            var _this2 = this;

            Bill.delete({ id: this.billToDelete }).then(function (response) {
                _this2.bills.$remove(_this2.billToDelete);
                _this2.billToDelete = null;
                Materialize.toast("Conta excluída com sucesso", 4000);
                _this2.$dispatch('change-info');
            });
        },
        openModalDelete: function openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').modal();
            $('#modal-delete').modal('open');
        }
    }
};