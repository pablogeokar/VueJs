window.billCreateComponent = Vue.extend({
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
    created: function(){
        if(this.$route.name == 'bill.update'){
            this.formType = 'UPDATE';
            this.getBill(this.$route.params.index);        
        }
        
    },
    methods: {
        submit: function () {
            if (this.formType == 'INSERT') {                
                this.$root.$children[0].bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false,
            };
            
           this.$router.go({name:'bill.list'});

        },
        getBill: function(index){
            var bills = this.$root.$children[0].bills;
            this.bill = bills[index];
        }

    }
});
