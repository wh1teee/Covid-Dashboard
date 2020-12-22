export default function inputListen() {
    const input = document.querySelector('.input')
    input.oninput = function() {
        const val = this.value.trim()
        const elasticItems = document.querySelectorAll('.stat__item')

        if (val !== '') {
            elasticItems.forEach(item => {
                if(item.innerText.toLowerCase().search(val) === -1) {
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