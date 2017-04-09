window.billComponent = Vue.extend({
    template:
    `
            <nav>
                <ul>
                    <li v-for="o in menus" >                        
                        <a v-link="{name: o.routeName}">{{ o.name }}</a>
                    </li>
                </ul>
            </nav>
             <div class="container">           
            <router-view></router-view>            
            </div>
    `,
    data() {
        return {
            menus: [
                { name: "Dashboard", routeName: 'dashboard' },
                { name: "Contas a Pagar", routeName: 'bill-pay.list' },
                { name: "Contas a Receber", routeName: 'bill-receive.list' },
            ],
        };
    }
});
