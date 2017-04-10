window.billPayListComponent = Vue.extend({
    template: `
  <div class="container">
    <div class="row">
    <h2>Minhas Contas a Pagar</h2>
        <table class="bordered striped highlight centered responsive-table z-depth-5">
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
                    <td>{{ o.date_due | dateFormat 'pt-BR' }}</td>
                    <td>{{ o.name | text_upper }}</td>
                    <td align="right">{{ o.value | numberFormat 'pt-BR'}}</td>
                    <td class="white-text" :class="{'green lighten-2' : o.done, 'red lighten-2' : !o.done}">
                    {{ o.done | doneLabel }}
                    </td>
                    <td>
                    <a v-link="{ name: 'bill-pay.update', params: {id: o.id} }">Editar</a> |
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>                                
                    </td>
                </tr>
            </tbody>
        </table>        
    </div>        
</div> 
 `
    ,
    created() {
        Bill.query().then((response) => {
            this.bills = response.data;
        });
    },
    data() {
        return {
            bills: []
        };
    },
    methods: {
        deleteBill(bill) {
            if (confirm("Deseja excluir esta conta?")) {
                Bill.delete({ id: bill.id }).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});
