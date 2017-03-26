window.billListComponent = Vue.extend({
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
                                <!--
                                <a href="#" @click.prevent="loadBill(o)">Editar</a> | 
                                -->
                                <a v-link="{ name: 'bill.update', params: {index: index} }">Editar</a> | 
                                <a href="#" @click.prevent="deleteBill(o)">Excluir</a>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
`,
    data: function () {
        return {
            bills: this.$root.$children[0].bills
        };
    },
    methods: {       
        deleteBill: function (bill) {
            if (confirm("Deseja excluir esta conta?")) {                
                this.$root.$children[0].bills.$remove(bill);
            }
        }
    }
});
