Vue.component('calculator', {
    props: {
        initial_value: {type: Number, default: 0}
    },
    data() {
        let rows = []

        function add_button(row, column, button) {
            if (!rows[row]) {
                rows[row] = []
            }
            rows[row][column] = button
        }

        for (let n = 1; n <= 9; ++n) {
            let row = 2 - Math.trunc((n - 1) / 3)
            let column = (n - 1) % 3
            let button = {n, row, column}
            add_button(row, column, button)
        }

        return {
            rows,
            numberPressed(n) {
                this.value = (this.value * 10) + n
            },
            value: this.initial_value
        }
    },
    template: `
        <table class="calculator">
            <tr>
                <td colspan="4" class="calculator_display">{{value}}</td>
            </tr>
            <tr v-for="row in rows">
                <td v-for="button in row">
                    <button v-on:click="numberPressed(button.n)">{{button.n}}</button>
                </td>
            </tr>
        </table>`
})

new Vue({
    el: '#main_calculator'
})
