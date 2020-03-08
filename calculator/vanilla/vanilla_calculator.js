function calculator(mainElement) {
    let initialValueAttribute = mainElement.attributes['initial_value']
    let value = initialValueAttribute ? parseFloat(initialValueAttribute.value) : 0

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

    let table = document.createElement('table')
    table.classList.add('calculator')
    let display_tr = document.createElement('tr')
    let display_td = document.createElement('td')
    display_td.colSpan = 4
    display_td.classList.add('calculator_display')
    let display_text = document.createTextNode(value.toString())
    display_td.appendChild(display_text)
    display_tr.appendChild(display_td)
    table.appendChild(display_tr)

    function numberPressed(n) {
        value = (value * 10) + n
        display_text.textContent = value.toString()
    }

    for (let row of rows) {
        let tr = document.createElement('tr')
        for (let buttonDescription of row) {
            let td = document.createElement('td')
            let button = document.createElement('button')
            button.appendChild(document.createTextNode(buttonDescription.n.toString()))
            button.onclick = () => { numberPressed(buttonDescription.n) }
            td.appendChild(button)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    mainElement.appendChild(table)
}

calculator(document.getElementById('main_calculator'))
