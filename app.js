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
    data: function () {
        return {
            menus: [
                { id: 0, name: "Listar Contas" }, { id: 1, name: "Nova Conta" },
            ],
        };
    },
    methods: {
        showView: function (id) {
            // this.$parent.activedView = id;
            this.$dispatch('change-activedView', id);
            //this.$root.$children[0].activedView = id;
            if (id == 1) {
                //this.$root.$children[0].formType = "INSERT";
                //this.$parent.formType = "INSERT";
                this.$dispatch('change-formType', 'INSERT');
            }
        },
    }
});

var billCreateComponent = Vue.extend({
    template: `
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
`,
    data: function () {
        return {
            formType: "INSERT",
            names: [
                "Conta de Luz",
                "Conta de Água",
                "Conta de telefone",
                "Supermercado",
                "Cartão de Crédito",
                "Empréstimo",
                "Gasolina"
            ],
            bill: {
                date_due: "",
                name: "",
                value: 0,
                done: false
            }
        };
    },
    methods: {
        submit: function () {
            if (this.formType == 'INSERT') {
                //this.$parent.$children[1].bills.push(this.bill);
                //this.$parent.$refs.billListComponent.bills.push(this.bill);
                this.$dispatch('new-bill', this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false,
            }

            //this.$parent.activedView = 0;
            this.$dispatch('change-activedView', 0);

        },

    },
    events: {
        'change-formType': function (formType) {
            this.formType = formType;
        },
        'change-bill': function (bill) {
            this.bill = bill;
        },
    }
});

var billListComponent = Vue.extend({
    template: `
 <style type="text/css">
            .pago{
                color: green;
            }
            .nao-pago{
                color: red;
            }
 </style>
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
`,
    data: function () {
        return {

            bills: [
                { date_due: "19/03/2017", name: "Conta de Luz", value: 25.99, done: true },
                { date_due: "21/03/2017", name: "Conta de Água", value: 31.99, done: false },
                { date_due: "22/03/2017", name: "Conta de telefone", value: 5.30, done: false },
                { date_due: "25/03/2017", name: "Supermercado", value: 125.20, done: false },
                { date_due: "01/04/2017", name: "Cartão de Crédito", value: 225.99, done: false },
                { date_due: "02/04/2017", name: "Empréstimo", value: 525.99, done: false },
                { date_due: "03/04/2017", name: "Gasolina", value: 170.00, done: false },
            ]
        };
    },
    methods: {
        loadBill: function (bill) {
            //this.$parent.bill = bill;
            //this.$parent.activedView = 1;
            //this.$parent.formType = 'UPDATE';
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-activedView', 1);
            this.$dispatch('change-formType', 'UPDATE');
        },
        deleteBill: function (bill) {
            if (confirm("Deseja excluir esta conta?")) {
                this.bills.$remove(bill);
            }
        }
    },
    events: {
        'new-bill': function (bill) {
            this.bills.push(bill);
        }
    },
    filters: {
        doneLabel: function (argument) {
            if (argument === false) {
                return "Não Paga";
            } else {
                return "Paga";
            }
        },
        statusGeneral: function (argument) {
            if (argument === false) {
                return "Nenhuma Conta Cadastrada";
            }

            if (!argument) {
                return "Nenhuma conta a pagar"
            } else {
                return "Existem " + argument + " conta(s) a ser(em) paga(s)";
            }
        }
    }
});

var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
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
            <div v-show="activedView == 0">
               <bill-list-component v-ref:bill-list-component></bill-list-component> 
            </div> 
            <div v-show="activedView == 1">
                <bill-create-component :bill.sync="bill"></bill-create-component>                
            </div>
        </div>
  `,
    data: function () {
        return {
            test: "",
            title: "Contas a Pagar",
            activedView: 0,
        }
    },
    computed: {
        status: function () {
            var billListComponent = this.$refs.billListComponent;
            if (!billListComponent.bills.length) {
                return false;
            }
            var count = 0;
            for (var i in billListComponent.bills) {
                if (!billListComponent.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },
    methods: {


    },
    events: {
        'change-activedView': function (activedView) {
            this.activedView = activedView;
        },
        'change-formType': function (formType) {
            //this.formType = formType;
            this.$broadcast('change-formType', formType);
        },
        'change-bill': function (bill) {
            this.$broadcast('change-bill', bill);
        },
        'new-bill': function (bill) {
            this.$broadcast('new-bill', bill);
        }
    },
    filters: {
        statusGeneral: function (argument) {
            if (argument === false) {
                return "Nenhuma Conta Cadastrada";
            }

            if (!argument) {
                return "Nenhuma conta a pagar"
            } else {
                return "Existem " + argument + " conta(s) a ser(em) paga(s)";
            }
        }
    }

});


Vue.component('app-component', appComponent);

/* REGISTRA COMPONENTES
Vue.component('menu-component', menuComponent);
Vue.component('bill-list-component', billListComponent);
Vue.component('bill-create-component', billCreateComponent);
*/


var app = new Vue({
    el: "#app",

});

