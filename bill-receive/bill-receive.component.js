window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },
    template: `    
  <style type="text/css">            
            .red{
                color: red;
            }
            .green{
                color: green;
            }
            .gray{
                color: gray;
            }
            .minha-classe{
                background-color: burlywood;
            }
        </style>

 <div>
            <h1>{{ title }}</h1> 
            <h3 :class="{ 'gray': status === false, 'green': status === 0, 'red': status >0 }">{{ status | statusReceive }}</h3>            
            <menu-component></menu-component>
            <router-view></router-view>
        </div>    
       
  `,
    data: function () {
        return {
            test: "",
            title: "Contas a Receber",
        }
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].billsReceive;

            if (!bills.length) {
                return false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    }
});


//Vue.component('app-component', appComponent);