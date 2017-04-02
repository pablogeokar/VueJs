const names = [
    "Conta de luz",
    "Conta de água",
    "Conta de telefone",
    "Supermercado",
    "Cartão de Crédito",
    "Empréstimo",
    "Gasolina"
];

window.billPayCreateComponent = Vue.extend({
    template: `
<form name="form" @submit.prevent="submit">
                    <label>Vencimento:</label>
                    <input type="text" v-model="bill.date_due | dateFormat"><br/><br/>
                    <label>Nome:</label>
                    <select v-model="bill.name">
                        <option v-for="o in names" :value="o">{{ o }}</option>
                    </select>
                    <br/><br/>
                    <label>valor:</label>
                    <input type="text" v-model="bill.value | numberFormat"><br/><br/>
                     <label>Pago?</label>
                    <input type="checkbox" v-model="bill.done"><br/><br/>
                    <input type="button" value="Enviar" v-on:click="submit">
                </form>
`,
    data() {
        return {
            formType: "INSERT",
            names: names,
            bill: {
                date_due: "",
                name: "",
                value: 0,
                done: false
            }
        };
    },
    created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'UPDATE';
            this.getBill(this.$route.params.id);
        }

    },
    methods: {
        submit() {
            let data = Vue.util.extend(this.bill, {date_due: this.getDateDue(this.bill.date_due)});
            if (this.formType == 'INSERT') {
                Bill.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill.update({ id: this.bill.id }, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({ name: 'bill-pay.list' });
                });
            }

        },
        getBill(id) {                        
            Bill.get({ id: id }).then((response) => {
                this.bill = response.data;
            });
        },
        getDateDue(date_due){
            let date_dueObject = date_due;
            if(!(date_due instanceof Date)){
                date_dueObject = new Date(dateString.split('/').reverse().join('-')+"T03:00:00");
            }
            return date_dueObject.toISOString().split('T')[0];
        }

    }
});
