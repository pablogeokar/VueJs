window.dashboardComponent = Vue.extend({
    template: `
    <h1>Dashboard<h1>
    <h2>
    Contas a Pagar: {{pays}}
    </h2>
    <h2>
    Contas a Receber: {{receives}}
    </h2>
    `,
   computed: {
        pays: function () {
            var bills = this.$root.$children[0].billsPay;

            if (!bills.length) {
                return false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            return count;
        },
        receives: function () {
            var bills = this.$root.$children[0].billsReceive;

            if (!bills.length) {
                return false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    }

});
