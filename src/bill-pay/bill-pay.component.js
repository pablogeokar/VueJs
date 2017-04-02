window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
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
            <h3 :class="{ 'gray': status === false, 'green': status === 0, 'red': status >0 }">{{ status | statusPay }}</h3>            
            <h3> {{ total | numberFormat}} </h3>            
            <menu-component></menu-component>            
            <router-view></router-view>
        </div>
  `,
    data() {
        return {
            title: "Contas a Pagar",
            status: false,
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
            let count = 0;
            for (let i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus(){            
                let self = this;
                Bill.query().then((response) =>{
                self.calculeteStatus(response.data);
            });
            
        },
        updateTotal(){
            let self = this;
            Bill.total().then((response) =>{
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

