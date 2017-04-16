const names = [
    "Conta de Luz",
    "Conta de Água",
    "Conta de telefone",
    "Supermercado",
    "Cartão de Crédito",
    "Empréstimo",
    "Gasolina"
];

module.exports = {
    template: `
<div class="container">      
    <form name="form" @submit.prevent="submit">
        <div class="row">
        <h2>Nova Conta</h2>
            <div class="input-field col s6"> 
                <label class="active">Vencimento:</label>
                <!-- <input type="date" class="datepicker" v-model="bill.date_due | dateFormat 'pt-BR'">-->
                <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'" placeholder="Informe a Data">
            </div>

            <div class="input-field col s6">        
                <label class="active">valor:</label>
                <input type="text" v-model="bill.value | numberFormat 'pt-BR'"><br/><br/>
            </div>
        </div>

        <div class="row">            
            <div class="input-field col s6">
                <label class="active">Nome:</label>
                <select v-model="bill.name" id="name" class="browser-default">        
                    <option value="" disabled selected>Escolha uma conta</option>
                    <option v-for="o in names" :value="o">{{o}}</option>
                </select>            
            </div>

            <div class="input-field col s6">
                <input type="checkbox" v-model="bill.done" id="pago">
                <label for="pago">Pago?</label> 
            </div>
        </div>               

        <div class="row">        
        <div class="input-field col s12">
            <input type="button" value="Enviar" v-on:click="submit" class="btn btn-large right">
        </div>
        </div>        
    </form>
</div>
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
};
