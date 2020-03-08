Vue.component('calculator', {
    props: {
        initial_value: { type: Number, default: 0}
    },
    data() {
        function number(n) {
            console.log(n)
            this.value = (this.value * 10) + n
        }

        let rows = [[], [], []]
        for (let n = 1; n <= 9; ++n) {
            let button = {
                n,
                row: 2 - Math.trunc((n - 1) / 3),
                column: (n - 1) % 3
            }
            rows[button.row].push(button)
        }
        console.log(this.initial_value)
        return {rows, number, value: this.initial_value}
    },
    template: `
        <table class="calculator">
            <tr>
                <td colspan="4" class="calculator_display">{{value}}</td>
            </tr>
            <tr v-for="row in rows">
                <td v-for="button in row">
                    <button v-on:click="number(button.n)">{{button.n}}</button>
                </td>
            </tr>
        </table>`
})

new Vue({
    el: '#main_calculator'
})
