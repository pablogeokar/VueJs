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
            <h3> {{ total | numberFormat 'pt-BR'}} </h3>            
            <menu-component></menu-component>
            <router-view></router-view>
        </div>    
       
  `,
    data() {
        return {
            status: false,
            title: "Contas a Receber",
            total: 0
        }
    },
    computed: {

    },
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculeteStatus(bills) {         

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
        updateStatus(){            
                var self = this;
                BillReceive.query().then(function(response){
                self.calculeteStatus(response.data);
            });
            
        },
        updateTotal(){
            var self = this;
            BillReceive.total().then(function(response){
                self.total = response.data.total;
            });
        }
    },
    events: {
       'change-info'(){
           this.updateStatus();
           this.updateTotal();
       }
    }

});

