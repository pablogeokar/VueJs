module.exports = {
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
                        <h4>{{ status | statusPay }}</h4>
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
        updateStatus() {
            let self = this;
            Bill.query().then((response) => {
                self.calculeteStatus(response.data);
            });

        },
        updateTotal() {
            let self = this;
            Bill.total().then((response) => {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
};

