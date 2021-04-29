import list from './List';
import table from './Table';

class Search {

  inputListen (result) {
    const input = document.querySelector('.input');
    input.oninput = function () {
      let val = input.value.trim();
      const elasticItems = document.querySelectorAll('.stat__item');

      if (val !== '') {
        elasticItems.forEach(item => {
          if (item.innerText.toLowerCase().search(val) === -1) {
            item.classList.add('hide');
          } else {
            item.classList.remove('hide');
            item.addEventListener('click', (event) => list.selectCountry(event));
          }
        });
      } else {
        table.clearCountryName(result);
        elasticItems.forEach(item => item.classList.remove('hide'));
      }
    };
  }

  blockOrUnblockButtons (length) {
    const casesSortBtn = document.querySelector('.cases__sort');
    const namesSortBtn = document.querySelector('.name__sort');
    if (length > 0) {
      casesSortBtn.disabled = true;
      namesSortBtn.disabled = true;
    } else {
      casesSortBtn.disabled = false;
      namesSortBtn.disabled = false;
    }
  }
}

const search = new Search();

export default search;
