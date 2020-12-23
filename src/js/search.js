export default function inputListen() {
    const input = document.querySelector('.input')
    input.oninput = function () {
        const val = this.value.trim()
        const elasticItems = document.querySelectorAll('.stat__item')

        if (val !== '') {
            elasticItems.forEach(item => {
                if (item.innerText.toLowerCase().search(val) === -1) {
                    item.classList.add('hide')
                } else {
                    item.classList.remove('hide')
                }
            })
        } else {
            elasticItems.forEach(item => item.classList.remove('hide'))
        }
    }

}

export function blockOrUnblockButtons(length) {
    const casesSortBtn = document.querySelector('.cases__sort')
    const namesSortBtn = document.querySelector('.name__sort')
    if (length > 0) {
        casesSortBtn.disabled = true
        namesSortBtn.disabled = true
    } else {
        casesSortBtn.disabled = false
        namesSortBtn.disabled = false
    }
}
