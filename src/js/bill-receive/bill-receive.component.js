window.billReceiveComponent = Vue.extend({    
    template: `
<div class="section">
    <div class="container">
        <h4 class="teal-text text-darken-3">{{ title }}</h4>
        <div class="row">
            <div class="col s6">
                <div class="card z-depth-2">
                    <div class="card-content white-text" :class="{ 'gray': status === false, 'green': status === 0, 'red': status >0 }">
                        <p class="card-title">
                            <i class="material-icons">account_balance</i>
                        </p>
                        <h4>{{ status | statusReceive }}</h4>
                    </div>
                </div>
            </div>
            <div class="col s6">
            <div class="card z-depth-2">
                    <div class="card-content" >
                        <p class="card-title">
                            <i class="material-icons">payment</i>
                        </p>
                        <h4> {{ total | numberFormat 'pt-BR'}} </h4>
                    </div>
                </div>
            </div>            
        </div>
    </div>
</div>
<div class="divider"></div>
<router-view></router-view>           
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

