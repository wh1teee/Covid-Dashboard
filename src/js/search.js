import list from './List';

class Search {

    inputListen() {
        const input = document.querySelector('.input')
        input.oninput = function() {
            let val = this.value.trim()
            const elasticItems = document.querySelectorAll('.stat__item')

            if (val !== '') {
                elasticItems.forEach(item => {
                    if(item.innerText.toLowerCase().search(val) === -1) {
                        item.classList.add('hide');
                    } else {
                        item.classList.remove('hide');
                        item.addEventListener('click', (event) => list.selectCountry(event));
                     
                    }
                })
            } else {
                elasticItems.forEach(item => item.classList.remove('hide'))
            }
         }
        }     

}

const search = new Search();

export default search