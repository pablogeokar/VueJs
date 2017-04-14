'use strict';

window.billComponent = Vue.extend({
    components: {
        'modal': window.modalComponent
    },
    template: '\n<ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">\n    <li v-for="item in o.items">\n        <a v-link="{name: item.routeName}">{{ item.name }}</a>\n    </li>\n</ul>    \n<ul id="nav-mobile" class="side-nav">\n    <li v-for="o in menus" >                        \n        <a v-link="{name: o.routeName}">{{ o.name }}</a>\n    </li>\n</ul>\n<div class="navbar-fixed">\n    <nav class="teal lighten-1">\n        <div class="nav-wrapper container" >                    \n            <a href="#" class="right brand-logo">Code Contas</a>\n            <a href="#" data-activates="nav-mobile" class="button-collapse">\n                <i class="material-icons">menu</i>\n            </a>\n            <ul class="left hide-on-med-and-down">\n                <li v-for="o in menus" >                        \n                    <a v-if="o.dropdownId" class="dropdown-button" href="#!" v-bind:data-activates="o.dropdownId">\n                        {{ o.name }} <i class="material-icons right">arrow_drop_down</i>\n                    </a>\n                    <a v-else v-link="{name: o.routeName}">{{ o.name }}</a>\n                </li>\n            </ul>                                                            \n        </div>        \n    </nav>                       \n</div>\n<modal></modal>            \n<router-view></router-view>            \n            \n    ',
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
});