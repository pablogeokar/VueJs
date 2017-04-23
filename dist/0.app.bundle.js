webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var modalComponent = __webpack_require__(12);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    template: "\n<div class=\"section\">\n    <div class=\"container\">\n        <h4 class=\"teal-text text-darken-3\">{{ title }}</h4>\n        <div class=\"row\">\n            <div class=\"col s6\">\n                <div class=\"card z-depth-2\">\n                    <div class=\"card-content white-text\" :class=\"{ 'gray': status === false, 'green': status === 0, 'red': status >0 }\">\n                        <p class=\"card-title\">\n                            <i class=\"material-icons\">account_balance</i>\n                        </p>\n                        <h4>{{ status | statusPay }}</h4>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col s6\">\n            <div class=\"card z-depth-2\">\n                    <div class=\"card-content\" >\n                        <p class=\"card-title\">\n                            <i class=\"material-icons\">payment</i>\n                        </p>\n                        <h4> {{ total | numberFormat 'pt-BR'}} </h4>\n                    </div>\n                </div>\n            </div>            \n        </div>\n    </div>\n</div>\n<div class=\"divider\"></div>\n<router-view></router-view>\n  ",
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
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var modalComponent = __webpack_require__(12);

module.exports = {
    components: {
        'modal': modalComponent
    },
    template: '\n<div class="container">\n    <div class="row">\n        <h2>Minhas Contas a Receber</h2>\n        <table class="bordered striped highlight centered responsive-table z-depth-5">\n            <thead>\n                <tr>\n                    <th>#</th>\n                    <th>Vencimento</th>\n                    <th>Nome</th>                    \n                    <th>Valor</th>\n                    <th>Paga?</th>\n                    <th>A\xE7\xF5es</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr v-for="(index,o) in bills">\n                    <td>{{ index+1 }}</td>\n                    <td>{{ o.date_due | dateFormat \'pt-BR\' }}</td>\n                    <td>{{ o.name | text_upper }}</td>\n                    <td align="right">{{ o.value | numberFormat \'pt-BR\'}}</td>\n                    <td class="white-text" :class="{\'green lighten-2\' : o.done, \'red lighten-2\' : !o.done}">\n                        {{ o.done | doneLabel }}\n                    </td>\n                    <td>\n                        <a v-link="{ name: \'bill-receive.update\', params: {id: o.id} }">Editar</a> |                         \n                        <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n\n<modal :modal="modal">\n    <div slot="content">\n        <h4>Mensagem de Confirma\xE7\xE3o</h4>\n        <p><strong>Deseja excluir esta conta?</strong></p>\n        <div class="divider"></div>\n        <p> Nome : <strong>{{billToDelete.name}}</strong></p>\n        <p> Valor : <strong>{{billToDelete.value | numberFormat \'pt-BR\'}}</strong></p>\n        <p> Data de Vencimento : <strong>{{billToDelete.date_due | dateFormat \'pt-BR\'}}</strong></p>\n        <div class="divider"></div>\n    </div>\n    <div slot="footer">\n        <button class="btn btn-flat waves-effect green lighten-2 modal-close"\n         @click="deleteBill()">OK</button>\n        <button class="btn btn-flat waves-effect waves-red modal-close">Cancelar</button>\n    </div>\n</modal>\n\n',
    created: function created() {
        var _this = this;

        BillReceive.query().then(function (response) {
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

            BillReceive.delete({ id: this.billToDelete }).then(function (response) {
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
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

};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    template: '\n<ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">\n    <li v-for="item in o.items">\n        <a v-link="{name: item.routeName}">{{ item.name }}</a>\n    </li>\n</ul>    \n<ul id="nav-mobile" class="side-nav">\n    <li v-for="o in menus" >                        \n        <a v-link="{name: o.routeName}">{{ o.name }}</a>\n    </li>\n</ul>\n<div class="navbar-fixed">\n    <nav>\n        <div class="nav-wrapper container" >                    \n            <a href="#" class="right brand-logo">Code Contas</a>\n            <a href="#" data-activates="nav-mobile" class="button-collapse">\n                <i class="material-icons">menu</i>\n            </a>\n            <ul class="left hide-on-med-and-down">\n                <li v-for="o in menus" >                        \n                    <a v-if="o.dropdownId" class="dropdown-button" href="#!" v-bind:data-activates="o.dropdownId">\n                        {{ o.name }} <i class="material-icons right">arrow_drop_down</i>\n                    </a>\n                    <a v-else v-link="{name: o.routeName}">{{ o.name }}</a>\n                </li>\n            </ul>                                                            \n        </div>        \n    </nav>                       \n</div>         \n<router-view></router-view>            \n            \n    ',
    created: function created() {
        $(document).ready(function () {
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        });
    },
    data: function data() {
        return {
            menus: [{ name: "Dashboard", routeName: 'dashboard' }, { name: "Contas a Pagar", routeName: 'bill-pay.list', dropdownId: 'bill-pay' }, { name: "Contas a Receber", routeName: 'bill-receive.list', dropdownId: 'bill-receive' }],
            menusDropdown: [{
                id: 'bill-pay', items: [{ id: 0, name: "Listar Contas", routeName: 'bill-pay.list' }, { id: 1, name: "Nova Conta", routeName: 'bill-pay.create' }]
            }, {
                id: 'bill-receive', items: [{ id: 0, name: "Listar Contas", routeName: 'bill-receive.list' }, { id: 1, name: "Nova Conta", routeName: 'bill-receive.create' }]
            }]
        };
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    template: "\n    <h1>Dashboard<h1>\n    <h2>\n    Contas a Pagar: {{totalPay | numberFormat 'pt-BR'}}\n    </h2>\n    <h2>\n    Contas a Receber: {{totalReceive | numberFormat 'pt-BR'}}\n    </h2>\n    ",
    data: function data() {
        return {
            totalReceive: 0,
            totalPay: 0
        };
    },
    created: function created() {
        this.TotalReceive();
        this.TotalPay();
    },
    methods: {
        TotalReceive: function TotalReceive() {
            var self = this;
            BillReceive.total().then(function (response) {
                self.totalReceive = response.data.total;
            });
        },
        TotalPay: function TotalPay() {
            var self = this;
            Bill.total().then(function (response) {
                self.totalPay = response.data.total;
            });
        }
    }

};

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    template: '\n        <div :id="modal.id" class="modal my-custom-modal">\n            <div class="modal-content">\n                <slot name="content"></slot>\n            </div>\n            <div class="modal-footer">\n                <slot name="footer"></slot>\n            </div>\n        </div>            \n    ',
    props: ['modal'],
    data: function data() {
        return {
            modal: {
                id: ''
            }
        };
    }
};

/***/ })
]);