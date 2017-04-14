window.billPayListComponent = Vue.extend({
    components: {
        'modal': modalComponent
    },
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
                        <!--<a href="#" @click.prevent="deleteBill(o)">Excluir</a>-->
                        <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<modal :modal="modal">
    <div slot="content">
        <h4>Mensagem de Confirmação</h4>
        <p><strong>Deseja excluir esta conta?</strong></p>
        <div class="divider"></div>
        <p> Nome : <strong>{{billToDelete.name}}</strong></p>
        <p> Valor : <strong>{{billToDelete.value | numberFormat 'pt-BR'}}</strong></p>
        <p> Data de Vencimento : <strong>{{billToDelete.date_due | dateFormat 'pt-BR'}}</strong></p>
        <div class="divider"></div>
    </div>
    <div slot="footer">
        <button class="btn btn-flat waves-effect green lighten-2 modal-close"
         @click="deleteBill()">OK</button>
        <button class="btn btn-flat waves-effect waves-red modal-close">Cancelar</button>
    </div>
</modal>

 `
    ,
    created() {
        Bill.query().then((response) => {
            this.bills = response.data;
        });

    },
    data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    methods: {
        deleteBill() {
            Bill.delete({ id: this.billToDelete }).then((response) => {
                this.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast("Conta excluída com sucesso", 4000);    
                this.$dispatch('change-info');
            });

        },
        openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').modal();
            $('#modal-delete').modal('open');
        }
    }
});
