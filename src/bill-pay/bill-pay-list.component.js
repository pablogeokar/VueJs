window.billPayListComponent = Vue.extend({
    template:`
    <style type="text/css">
        .pago{
            color: green;
            }
            .nao-pago{
            color: red;
            }
 </style>    
     <div class="container">
        <div class="row">
            <div class="col s2 m10">
                Teste
            </div>
            <div class="col s10 m2">
                Teste 2
            </div>
        </div>
        <div class=row>
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
                        <td>{{ o.date_due | dateFormat 'pt-BR' }}</td>
                        <td>{{ o.name | text_upper }}</td>
                        <td align="right">{{ o.value | numberFormat 'pt-BR'}}</td>
                        <td class="minha-classe" :class="{'pago' : o.done, 'nao-pago' : !o.done}">
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
