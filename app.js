var menuComponent = Vue.extend({
    template: 
    `
            <nav>
                <ul>
                    <li v-for="o in menus" >
                        <a href="#" v-on:click.prevent="showView(o.id)">{{o.name}}</a>
                    </li>
                </ul>
            </nav>
    `,
    data: function() {
        return {
            menus:[
            {id: 0 , name:"Listar Contas"},{id: 1 , name:"Nova Conta"}  ,
            ],
        } ;       
    },
    methods: {
        showView: function(id){
            //this.$parent.activedView = id;
            this.$root.$children[0].activedView = id;
            if(id == 1){
                this.$root.$children[0].formType = "INSERT";
                //this.$parent.formType = "INSERT";
            }  
        },
    } 
});

var appComponent = Vue.extend({
 template: `
  <style type="text/css">
            .pago{
                color: green;
            }
            .nao-pago{
                color: red;
            }
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
            <div v-if="activedView == 0">
                <table border="1" cellpadding="10">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Vencimento</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Paga?</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index,o) in bills">
                            <td>{{ index+1 }}</td>
                            <td>{{ o.date_due }}</td>
                            <td>{{ o.name }}</td>
                            <td align="right">{{ o.value | currency 'R$ ' 2}}</td>
                            <td class="minha-classe" :class="{'pago' : o.done, 'nao-pago' : !o.done}">
                                {{ o.done | doneLabel }}
                            </td>
                            <td>
                                <a href="#" @click.prevent="loadBill(o)">Editar</a> | 
                                <a href="#" @click.prevent="deleteBill(o)">Excluir</a>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> 
            <div v-if="activedView == 1">
                <form name="form" @submit.prevent="submit">
                    <label>Vencimento:</label>
                    <input type="text" v-model="bill.date_due"><br/><br/>
                    <label>Nome:</label>
                    <select v-model="bill.name">
                        <option v-for="o in names" :value="o">{{ o }}</option>
                    </select>
                    <br/><br/>
                    <label>valor:</label>
                    <input type="text" v-model="bill.value"><br/><br/>
                     <label>Pago?</label>
                    <input type="checkbox" v-model="bill.done"><br/><br/>
                    <input type="button" value="Enviar" v-on:click="submit">
                </form>
            </div>
        </div>
  `,
 data: function() {
        return {
        test:"",
        title: "Contas a Pagar",       
        activedView: 0,
        formType: "INSERT",
        bill:{
            date_due:"",
            name:"",
            value:0,
            done: 0
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
        }
    },
    computed: {
        status: function(){
            if(!this.bills.length){
                return false;
            }
            var count = 0;
            for (var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            return count;
        }
    },
    methods: {        
        submit: function(){
            if(this.formType == 'INSERT'){
                this.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            }
            
            this.activedView =0;
        },
        loadBill: function(bill){
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'UPDATE';
        },
        deleteBill: function(bill){
            if(confirm("Deseja excluir esta conta?")){
            this.bills.$remove(bill);
        }
        }
    },
    filters: {
        doneLabel: function(argument){
            if(argument == 0){
                return "Não Paga";
            } else {
                return "Paga";
            }
        },
        statusGeneral: function(argument){
            if(argument === false){
                return "Nenhuma Conta Cadastrada";
            }

            if(!argument){
                return "Nenhuma conta a pagar"
            } else {
                return "Existem " + argument +" conta(s) a ser(em) paga(s)";
            }
        }
    } 
});

Vue.component('app-component', appComponent);
Vue.component('menu-component', menuComponent);

var app = new Vue({
    el: "#app",
   
});

