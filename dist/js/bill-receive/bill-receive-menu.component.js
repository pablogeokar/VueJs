"use strict";

window.billReceiveMenuComponent = Vue.extend({
    template: "\n            <nav>\n                <ul>\n                    <li v-for=\"o in menus\" >\n                        <!--\n                        <a href=\"#\" v-on:click.prevent=\"showView(o.id)\">{{o.name}}</a>\n                        <a v-link=\"{path: o.url}\">{{ o.name }}</a>\n                        -->\n                        <a v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n                    </li>\n                </ul>\n            </nav>\n    ",
    data: function data() {
        return {
            menus: [{ id: 0, name: "Listar Contas", routeName: 'bill-receive.list' }, { id: 1, name: "Nova Conta", routeName: 'bill-receive.create' }]
        };
    }
});