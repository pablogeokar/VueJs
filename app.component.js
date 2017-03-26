window.appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent
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
            <h3 :class="{ 'gray': status === false, 'green': status === 0, 'red': status >0 }">{{ status | statusGeneral }}</h3>            
            <menu-component></menu-component>
            <!--<div v-if="activedView == 0">-->
            <!--
            <div v-show="activedView == 0">
               <bill-list-component v-ref:bill-list-component></bill-list-component> 
            </div> 
            <div v-show="activedView == 1">
                <bill-create-component :bill.sync="bill"></bill-create-component>                
            </div>
            -->
            <router-view></router-view>
        </div>
  `,
    data: function () {
        return {
            test: "",
            title: "Contas a Pagar",            
        }
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].bills;
            
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


Vue.component('app-component', appComponent);