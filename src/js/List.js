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
      this.insertCountryInTableBySelector(dom.statistic, allData, chooseSelector);
      map.changeMap(allDataFull, '1');
      table.changeTable(allDataFull, '1');
    }

    if (chooseSelector === 'TotalRecovered') {
      this.insertCountryInTableBySelector(dom.statistic, allData, chooseSelector);
      map.changeMap(allDataFull, '9');
      table.changeTable(allDataFull, '1');
      chart.destroy();
      chart.createChart(
        Object.keys(allDataFull.allDataForChart.recovered),
        Object.values(allDataFull.allDataForChart.recovered),
        '#48DD00',
      );
    }

    if (chooseSelector === 'TotalDeaths') {
      this.insertCountryInTableBySelector(dom.statistic, allData, chooseSelector);
      map.changeMap(allDataFull, '5');
      table.changeTable(allDataFull, '1');
      chart.destroy();
      chart.createChart(
        Object.keys(allDataFull.allDataForChart.deaths),
        Object.values(allDataFull.allDataForChart.deaths),
        '#FF5C00',
      );
    }

    if (chooseSelector === 'NewRecovered') {
      this.insertCountryInTableBySelector(dom.statistic, allData, chooseSelector);
      map.changeMap(allDataFull, '11');
      table.changeTable(allDataFull, '3');
    }

    if (chooseSelector === 'NewDeaths') {
      this.insertCountryInTableBySelector(dom.statistic, allData, chooseSelector);
      map.changeMap(allDataFull, '7');
      table.changeTable(allDataFull, '3');
    }

    if (chooseSelector === 'NewConfirmed') {
      this.insertCountryInTableBySelector(dom.statistic, allData, chooseSelector);
      map.changeMap(allDataFull, '3');
      table.changeTable(allDataFull, '3');
    }

    if (chooseSelector === 'TotalConfirmed per 100 thou') {
      this.insertCountryInTableBySelectorPerThou(dom.statistic, allData, 'TotalConfirmed');
      map.changeMap(allDataFull, '2');
      table.changeTable(allDataFull, '2');
    }

    if (chooseSelector === 'TotalRecovered per 100 thou') {
      this.insertCountryInTableBySelectorPerThou(dom.statistic, allData, 'TotalRecovered');
      map.changeMap(allDataFull, '10');
      table.changeTable(allDataFull, '2');
    }

    if (chooseSelector === 'TotalDeaths per 100 thou') {
      this.insertCountryInTableBySelectorPerThou(dom.statistic, allData, 'TotalDeaths');
      map.changeMap(allDataFull, '6');
      table.changeTable(allDataFull, '2');
    }

    if (chooseSelector === 'NewRecovered per 100 thou') {
      this.insertCountryInTableBySelectorPerThou(dom.statistic, allData, 'NewRecovered');
      map.changeMap(allDataFull, '12');
      table.changeTable(allDataFull, '4');
    }

    if (chooseSelector === 'NewDeaths per 100 thou') {
      this.insertCountryInTableBySelectorPerThou(dom.statistic, allData, 'NewDeaths');
      map.changeMap(allDataFull, '8');
      table.changeTable(allDataFull, '4');
    }

    if (chooseSelector === 'NewConfirmed per 100 thou') {
      this.insertCountryInTableBySelectorPerThou(dom.statistic, allData, 'NewConfirmed');
      map.changeMap(allDataFull, '4');
      table.changeTable(allDataFull, '4');
    }
  }

  select () { // logic for drop-down list
    const selectHeader = document.querySelectorAll('.select__header');

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
    chart.destroy();
    chart.createChart(
      Object.keys(result.allDataForChartCountries.find(item => item.country === country).timeline.cases),
      Object.values(result.allDataForChartCountries.find(item => item.country === country).timeline.cases),
      '#0E53A7',
    );
  }

  insertCountryInTableBySelector (container, data, selector) {
    data.forEach(item => {
      container.insertAdjacentHTML('beforeEnd', `
            <div class='stat__item' id='${item.Country}'>
            <span class="cases">${item[selector]}</span>  
            <span class="name">${item.Country}</span>
            <span>
            <img 
            src="https://flagcdn.com/${item.CountryCode.toLowerCase()}.svg"
            width="16"
            alt="${item.Country}">
            </span>
            </div>`);
    });
  }

  insertCountryInTableBySelectorPerThou (container, data, selector) {
    data.forEach(item => {
      countryPopulation = allDataFull.resultCountries.find(el => el.alpha2Code === item.CountryCode).population;
      container.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item" id='${item.Country}'>
            <span class="cases">${Math.ceil(item[selector] * 100000 / countryPopulation)}</span>  
            <span class="name">${item.Country}</span>
            <span>
            <img 
            src="https://flagcdn.com/${item.CountryCode.toLowerCase()}.svg"
            width="16"
            alt="${item.Country}">
            </span>
            </div>`);
    });
  }
}

const list = new List();

export default list;
export { allData, currentChoosingStatistic };
