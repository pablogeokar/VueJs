window.billPayMenuComponent = Vue.extend({
    template:
    `
            <nav>
                <ul>
                    <li v-for="o in menus" >
                        <!--
                        <a href="#" v-on:click.prevent="showView(o.id)">{{o.name}}</a>
                        <a v-link="{path: o.url}">{{ o.name }}</a>
                        -->
                        <a v-link="{name: o.routeName}">{{ o.name }}</a>
                    </li>
                </ul>
            </nav>
    `,
    data() {
        return {
            menus: [                
                { id: 0, name: "Listar Contas", routeName: 'bill-pay.list' },
                { id: 1, name: "Nova Conta", routeName: 'bill-pay.create' },
            ],
        };
    }
});
