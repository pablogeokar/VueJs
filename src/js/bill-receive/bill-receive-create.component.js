const names = [
                "Conta de Luz",
                "Conta de Água",
                "Conta de telefone",
                "Supermercado",
                "Cartão de Crédito",
                "Empréstimo",
                "Gasolina"
            ];

window.billReceiveCreateComponent = Vue.extend({
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
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'UPDATE';
            this.getBill(this.$route.params.id);
        }

    },
    methods: {
        submit() {
            let self = this;
            if (this.formType == 'INSERT') {
                BillReceive.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                BillReceive.update({ id: this.bill.id }, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-receive.list' });
                });
            }

        },
        getBill(id) {
            let self = this;
            BillReceive.get({ id: id }).then(function (response) {
                self.bill = response.data;
            });
        }

    }
});
