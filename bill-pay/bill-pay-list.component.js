window.billPayListComponent = Vue.extend({
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
                                <a v-link="{ name: 'bill-pay.update', params: {id: o.id} }">Editar</a> | 
                                <a href="#" @click.prevent="deleteBill(o)">Excluir</a>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
`,
    created: function () {
        //var resource = this.$resource('bills{/id}');
        var self = this;
        Bill.query().then(function (response) {
            self.bills = response.data;
        });
        /*
        this.$http.get('bills').then(function (response) {
            this.bills = response.data;
        })
        */
    },
    data: function () {
        return {
            bills: []
        };
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm("Deseja excluir esta conta?")) {
               // var resource = this.$resource('bills{/id}');
               var self = this;
                Bill.delete({ id: bill.id }).then(function (response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
                /*
                this.$http.delete('bills/' + bill.id).then(function (response) {
                    this.bills.$remove(bill);
                    this.$dispatch('change-status');
                });
                */
            }
        }
    }
});
