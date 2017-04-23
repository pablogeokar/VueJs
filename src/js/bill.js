export class BillPay {
    constructor(data = {}) {
        this.date_due = '';
        this.name = '';
        this.value = 0;
        this.done = false;
        Object.assign(this, data);
    }

    toJSON() {
        let date_due = (typeof this.date_due === 'string' && this.date_due.length == 10)
            ? this.date_due : this.date_due.toISOString().substring(0, 10);
        return {
            date_due: date_due,
            name: this.name,
            value: this.value,
            done: this.done
        }
    }
}
