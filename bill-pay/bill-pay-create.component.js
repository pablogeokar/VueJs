window.billPayCreateComponent = Vue.extend({
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
                "Conta de luz",
                "Conta de água",
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
    created: function () {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'UPDATE';
            this.getBill(this.$route.params.id);
        }

    },
    methods: {
        submit: function () {           
           var self = this;          
            if (this.formType == 'INSERT') {                
                Bill.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            } else {                
                Bill.update({ id: this.bill.id }, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            }

        },
        getBill: function (id) {            
            var self = this;
            /*
            query - usa para consultar coleção inteira
            get - usa para consultar um registro só
            */
            //this.$http.get('bills/' + id).then(function (response) {
            Bill.get({id: id}).then(function (response) {
                self.bill = response.data;
            });
        }

    }
});
