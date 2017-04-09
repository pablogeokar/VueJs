"use strict";

window.billComponent = Vue.extend({
    template: "\n            <nav>\n                <ul>\n                    <li v-for=\"o in menus\" >                        \n                        <a v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n                    </li>\n                </ul>\n            </nav>\n             <div class=\"container\">           \n            <router-view></router-view>            \n            </div>\n    ",
    data: function data() {
        return {
            menus: [{ name: "Dashboard", routeName: 'dashboard' }, { name: "Contas a Pagar", routeName: 'bill-pay.list' }, { name: "Contas a Receber", routeName: 'bill-receive.list' }]
        };
    }
});