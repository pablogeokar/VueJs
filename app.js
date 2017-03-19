var app = new Vue({
    el: "#app",
    data: {
        test:"",
        title: "Contas a Pagar",
        menus:[
            {id: 0 , name:"Listar Contas"},{id: 1 , name:"Nova Conta"}  ,
        ],
        activedView: 1,
        bill:{
            date_due:"",
            name:"",
            value:0
        },
        names:[
          "Conta de Luz",
          "Conta de Água",
          "Conta de telefone",
          "Supermercado",
          "Cartão de Crédito",
          "Empréstimo",
          "Gasolina"
        ],
        bills: [
            {date_due: "19/03/2017", name: "Conta de Luz", value: 25.99, done: 1},
            {date_due: "21/03/2017", name: "Conta de Água", value: 31.99, done: 0},
            {date_due: "22/03/2017", name: "Conta de telefone", value: 5.30, done: 0},
            {date_due: "25/03/2017", name: "Supermercado", value: 125.20, done: 0},
            {date_due: "01/04/2017", name: "Cartão de Crédito", value: 225.99, done: 0},
            {date_due: "02/04/2017", name: "Empréstimo", value: 525.99, done: 0},
            {date_due: "03/04/2017", name: "Gasolina", value: 170.00, done: 0},
        ]
    },
    computed: {
        status: function(){
            var count = 0;
            for (var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            return !count ? "Nnhuma Conta a Pagar" : "Existem " + count +" contas a serem pagas";
        }
    },
    methods: {
        showView: function(id){
            this.activedView = id;
        },
        submit: function(){
            this.bills.push(this.bill);
            this.activedView =0;
        }
    }
})

/* EXEMPLO DE OBSERVADOR
app.$watch('test', function(novoValor, velhoValor){
    console.log("velhoValor: " + velhoValor +", novoValor " + novoValor );
})
*/

