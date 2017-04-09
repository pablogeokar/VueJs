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
        <div class="section">
            <div class="container">
                <h1 class="teal-text text-darken-3">{{ title }}</h1> 
                <h3 :class="{ 'gray': status === false, 'green': status === 0, 'red': status >0 }">{{ status | statusPay }}</h3>            
                <div class="row">
                    <div class="col s5 offset-s7 z-depth-1">
                        <h3> {{ total | numberFormat 'pt-BR'}} </h3>
                        <i class="material-icons medium teal-text text-lighten-1">add_circle</i>            
                    </div>
                    <!--
                    <button class="btn teal waves-effect waves-dark">
                    <i class="material-icons left">add_circle</i>
                    Teste
                    </button>
                    <button class="btn-flat teal waves-effect waves-dark">
                    <i class="material-icons left">add_circle</i>
                    Teste
                    </button>
                    <button class="btn-floating">
                    <i class="material-icons left">add_circle</i>
                    Teste
                    </button>
                    <div class="row">
                        <div class="col s4">
                            <div class="card green darken-3">
                                <div class="card-content white-text">
                                    <p class="card-title">Meu Título</p>
                                    <p>Pablo George</p>
                                </div>
                                <div class="card-action">
                                    <a href="#">Minha âncora</a>
                                </div>
                             </div>
                        </div>
                         <div class="col s4">
                            <div class="card">
                                <div class="card-image">
                                    <img src="http://mundoeducacao.bol.uol.com.br/upload/conteudo_legenda/7a81297b1ef3b8dd7a7ab8b5618577aa.jpg"/>     
                                    <p class="card-title">Meu Título</p>
                                </div>
                                <div class="card-content">
                                    <p class="card-title">Meu Título</p>
                                    <p>Pablo George</p>
                                </div>
                                <div class="card-action">
                                    <a href="#">Minha âncora</a>
                                </div>
                             </div>
                        </div>
                        -->
                    </div>
                </div>                
            </div>       
        </div>
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

