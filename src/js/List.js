import DOMLinks from './DOMLinks';
import map from './Map';
import table from './Table';
import search from './search';
import sortingData, { sortByCasesListen, sortByNamesListen } from './sort';
import { showKeyboardListen } from './keys';
import chart from './Chart';

let currentChoosingStatistic = 'TotalConfirmed'; // default case
let allData;
let allDataFull;
let element;
let worldPopulation;
let countryPopulation;

const listOfStatistics = `
<div class="title">
    <div class="header__table">
        <div class="select">
            <div class="select__header">
            <span class="select__current">TotalConfirmed</span>
                <div class="select__icon">&times;</div>
            </div>
            <div class="select__body">
                <div class="select__item" id='TotalConfirmed'>TotalConfirmed</div>
                <div class="select__item" id='TotalDeaths'>TotalDeaths</div>
                <div class="select__item" id='TotalRecovered'>TotalRecovered</div>
                <div class="select__item" id='NewConfirmed'>NewConfirmed</div>
                <div class="select__item" id='NewDeaths'>NewDeaths</div>
                <div class="select__item" id='NewRecovered'>NewRecovered</div>
                <div class="select__item" id='TotalConfirmed per 100 thou'>TotalConfirmed per 100 thou</div>
                <div class="select__item" id='TotalDeaths per 100 thou'>TotalDeaths per 100 thou</div>
                <div class="select__item" id='TotalRecovered per 100 thou'>TotalRecovered per 100 thou</div>
                <div class="select__item" id='NewConfirmed per 100 thou'>NewConfirmed per 100 thou</div>
                <div class="select__item" id='NewDeaths per 100 thou'>NewDeaths per 100 thou</div>
                <div class="select__item" id='NewRecovered per 100 thou'>NewRecovered per 100 thou</div>
            </div>
        </div>
        <div class="input__block">
            <input class="input" type="text">
            <span class="material-icons keyboard__show" title="show virtual keyboard">keyboard</span>
        </div>
        <div class="sort__block">
            <button class="cases__sort">cases sort</button>
            <button class="name__sort">name sort</button>
        </div>
    </div>
    <div class="statistic" id="style-13"></div>
</div>
`;

class List {

  createList (result) {
    const dom = DOMLinks.getHTMLElements();
    allDataFull = result;
    allData = result.resultCOVID.Countries;
    worldPopulation = result.resultCountries.reduce((accum, item) => accum + item.population, 0);
    dom.list.insertAdjacentHTML('beforeEnd', listOfStatistics); // render landing drop-down-list
    this.renderTable('TotalConfirmed');
    this.select(); // start drop-down list logic for click
    sortByCasesListen();
    sortByNamesListen();
    search.inputListen(result);
    showKeyboardListen();
  }

  renderTable (chooseSelector) {
    const dom = DOMLinks.getHTMLElements();
    dom.statistic.innerHTML = '';
    if (chooseSelector === 'TotalConfirmed') {
      allData.forEach((item) => {
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class='stat__item' id='${item.Country}'><span class="cases">${item.TotalConfirmed}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '1');
      table.changeTable(allDataFull, '1');
    }

    if (chooseSelector === 'TotalRecovered') {
      allData.forEach((item) => {
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${item.TotalRecovered}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '9');
      table.changeTable(allDataFull, '1');
      chart.createChart(
        Object.keys(allDataFull.allDataForChart.recovered),
        Object.values(allDataFull.allDataForChart.recovered),
        '#48DD00',
      );
    }

    if (chooseSelector === 'TotalDeaths') {
      allData.forEach((item) => {
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${item.TotalDeaths}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '5');
      table.changeTable(allDataFull, '1');
      chart.createChart(
        Object.keys(allDataFull.allDataForChart.deaths),
        Object.values(allDataFull.allDataForChart.deaths),
        '#FF5C00',
      );
    }

    if (chooseSelector === 'NewRecovered') {
      allData.forEach((item) => {
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${item.NewRecovered}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '11');
      table.changeTable(allDataFull, '3');
    }

    if (chooseSelector === 'NewDeaths') {
      allData.forEach((item) => {
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${item.NewDeaths}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '7');
      table.changeTable(allDataFull, '3');
    }

    if (chooseSelector === 'NewConfirmed') {
      allData.forEach((item) => {
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${item.NewConfirmed}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '3');
      table.changeTable(allDataFull, '3');
    }

    if (chooseSelector === 'TotalConfirmed per 100 thou') {

      allData.forEach((item) => {
        countryPopulation = allDataFull.resultCountries.find(el => el.alpha2Code === item.CountryCode).population;
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class='stat__item' id='${item.Country}'><span class="cases">${Math.ceil(item.TotalConfirmed * 100000 / countryPopulation)}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '2');
      table.changeTable(allDataFull, '2');
    }

    if (chooseSelector === 'TotalRecovered per 100 thou') {
      allData.forEach((item) => {
        countryPopulation = allDataFull.resultCountries.find(el => el.alpha2Code === item.CountryCode).population;
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${Math.ceil(item.TotalRecovered * 100000 / countryPopulation)}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '10');
      table.changeTable(allDataFull, '2');
    }

    if (chooseSelector === 'TotalDeaths per 100 thou') {

      allData.forEach((item) => {
        countryPopulation = allDataFull.resultCountries.find(el => el.alpha2Code === item.CountryCode).population;
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${Math.ceil(item.TotalDeaths * 100000 / countryPopulation)}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '6');
      table.changeTable(allDataFull, '2');
    }

    if (chooseSelector === 'NewRecovered per 100 thou') {
      allData.forEach((item) => {
        countryPopulation = allDataFull.resultCountries.find(el => el.alpha2Code === item.CountryCode).population;
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${Math.ceil(item.NewRecovered * 100000 / countryPopulation)}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '12');
      table.changeTable(allDataFull, '4');
    }

    if (chooseSelector === 'NewDeaths per 100 thou') {
      allData.forEach((item) => {
        countryPopulation = allDataFull.resultCountries.find(el => el.alpha2Code === item.CountryCode).population;
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${Math.ceil(item.NewDeaths * 100000 / countryPopulation)}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '8');
      table.changeTable(allDataFull, '4');
    }

    if (chooseSelector === 'NewConfirmed per 100 thou') {
      allData.forEach((item) => {
        countryPopulation = allDataFull.resultCountries.find(el => el.alpha2Code === item.CountryCode).population;
        dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${Math.ceil(item.NewConfirmed * 100000 / countryPopulation)}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`);
      });
      map.changeMap(allDataFull, '4');
      table.changeTable(allDataFull, '4');
    }
  }

  select () { // logic for drop-down list
    const selectHeader = document.querySelectorAll('.select__header');
    const selectItem = document.querySelectorAll('.select__item');
    const selectBody = document.querySelector('.select__body');
    const input = document.querySelector('.input');

    selectHeader.forEach(item => {
      item.addEventListener('click', function () {
        this.parentElement.classList.toggle('is-active');
      });
    });
  };

  selectParam (e) {
    const text = e.target.getAttribute('id');
    const select = e.target.closest('.select');
    const currentText = select.querySelector('.select__current');
    currentText.innerText = text;
    select.classList.remove('is-active');

    search.blockOrUnblockButtons(0); // refresh search area if choose another statistic
    currentChoosingStatistic = text;
    sortingData(text); // sorting by selected parameter in drop-down list
    this.renderTable(e.target.getAttribute('id')); // render sorted country statistic array
  }

  selectCountry (result, e) {
    const dom = DOMLinks.getHTMLElements();
    const country = e.target.closest('.stat__item').getAttribute('id');
    const statItems = document.querySelectorAll('.stat__item');
    statItems.forEach(statItem => {
      if (statItem.classList.contains('highlighed')) {
        statItem.classList.remove('highlighed');
      }
    });

    document.getElementById(country).classList.add('highlighed');

    table.getData(allDataFull, country, '1');
    const element = allData.find(item => item.Country === country);

    const countryInfo = allDataFull.resultCountries.find(item => item.alpha2Code === element.CountryCode);
    map.fly(countryInfo.latlng, 7);
    dom.checkBox.checked = true;
    chart.createChart(
      Object.keys(result.allDataForChartCountries.find(item => item.country === country).timeline.cases),
      Object.values(result.allDataForChartCountries.find(item => item.country === country).timeline.cases),
      '#0E53A7',
    );
  }
}

const list = new List();

export default list;
export { allData, currentChoosingStatistic };
