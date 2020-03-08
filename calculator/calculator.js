Vue.component('calculator', {
    props: ['value', 'c'],
    data() {
        function number(n) {
            console.log(n)
            this.display_text = n
        }

        let rows = [[], [], []]
        for (let n = 1; n <= 9; ++n) {
            let button = {
                n,
                row: 2 - Math.trunc((n - 1) / 3),
                column: (n - 1) % 3,
                action() {
                    number(n)
                }
            }
            rows[button.row].push(button)
        }
        return {rows, number, display_text: 'Hi! ^^'}
    },
    template: `
        <table>
            <tr>
                <td colspan="4">{{display_text}}</td>
            </tr>
            <tr v-for="row in rows">
                <td v-for="button in row">
                    <button v-on:click="button.action">{{button.n}}</button>
                </td>
            </tr>
        </table>`
})

new Vue({
    el: '#main_calculator'
})
