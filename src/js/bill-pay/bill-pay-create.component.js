require('../bill');
const names = [
    "Conta de luz",
    "Conta de água",
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
            bill: new BillPay(),
        };
    },
    created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'UPDATE';
            this.getBill(this.$route.params.id);
        };
        $(document).ready(function () {
            $('#name').material_select();
        });
    },
    methods: {
        submit() {
            let data = this.bill.toJSON();            
            if (this.formType == 'INSERT') {
                Bill.save({}, data).then((response) => {
                    Materialize.toast("Conta criada com sucesso", 4000);
                    this.$dispatch('change-info');
                    this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill.update({ id: this.bill.id }, data).then((response) => {
                    Materialize.toast("Conta atualizada com sucesso", 4000);
                    this.$dispatch('change-info');
                    this.$router.go({ name: 'bill-pay.list' });
                });
            }

        },
        getBill(id) {
            Bill.get({ id: id }).then((response) => {                
                this.bill = new BillPay(response.data);
            });
        },
        getDateDue(date_due) {
            let date_dueObject = date_due;
            if (!(date_due instanceof Date)) {
                date_dueObject = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            }
            return date_dueObject.toISOString().split('T')[0];
        }

    }
};
