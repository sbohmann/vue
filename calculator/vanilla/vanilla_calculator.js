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

    let display_text = text(value)
    function numberPressed(n) {
        value = (value * 10) + n
        display_text.textContent = value.toString()
    }

    let table = element('table',
        element('tr',
            display(display_text)))
    table.classList.add('calculator')
    for (let row of rows) {
        let tr = element('tr')
        for (let buttonDescription of row) {
            let button = element('button', text(buttonDescription.n))
            button.onclick = () => { numberPressed(buttonDescription.n) }
            tr.appendChild(element('td', button))
        }
        table.appendChild(tr)
    }
    mainElement.appendChild(table)
}

function display(text) {
    let result = element('td', text)
    result.colSpan = 4
    result.classList.add('calculator_display')
    return result
}

function element(type, ... childElements) {
    let result = document.createElement(type)
    for (let childElement of childElements) {
        result.appendChild(childElement)
    }
    return result
}

function text(value) {
    return document.createTextNode(value.toString())
}

calculator(document.getElementById('main_calculator'))
