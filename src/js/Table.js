import DOMLinks from './DOMLinks';
import map from './Map';
import search from './search';
import chart from './Chart';

const variables = ['Total confirmed cases',
  'Total confirmed cases per 100 thou',
  'Today confirmed cases',
  'Today confirmed cases per 100 thou',
  'Total deaths',
  'Total deaths per 100 thou',
  'Today deaths',
  'Today deaths per 100 thou',
  'Total recovered cases',
  'Total recovered cases per 100 thou',
  'Total recovered cases',
  'Total recovered cases per 100 thou'];

const [tcc, tcc100, tdcc, tdcc100, td, td100, tdd, tdd100, tr, tr100, tdr, tdr100] = variables;
const countryNames = [];
let dataList = '';
let inputFill = '';
let countryName = '';
let countryInfo = '';

class Table {

  constructor (country, mode) {
    this.country = country;
    this.mode = mode;
  }

  getData (result, country, mode) {

    const dom = DOMLinks.getHTMLElements();

    result.resultCOVID.Countries.forEach(elem => {
      countryNames.push(elem.Country);
    });

    dataList = countryNames.map(el => `<option>${el}</option>`)
      .join('').toString();

    let text1 = '';
    let text2 = '';
    let text3 = '';
    let variableToShow1 = null;
    let variableToShow2 = null;
    let variableToShow3 = null;

    const title = country;

    if (country !== 'World') { // || dom.checkBox.checked)   {
      // title = country;
      inputFill = country;
      countryName = country;
      console.log(country);
      const element = result.resultCOVID.Countries.find(item => item.Country === country);
      console.log(element);
      countryInfo = result.resultCountries.find(item => item.alpha2Code === element.CountryCode);
      console.log(countryInfo);
      console.log(mode);
      switch (mode) {
        case '1':
          text1 = tcc;
          variableToShow1 = element.TotalConfirmed;
          text2 = td;
          variableToShow2 = Math.ceil(element.TotalDeaths);
          text3 = tr;
          variableToShow3 = Math.ceil(element.TotalRecovered);
          break;
        case '2':
          text1 = tcc100;
          variableToShow1 = Math.ceil(element.TotalConfirmed * 100000 / countryInfo.population);
          text2 = td100;
          variableToShow2 = Math.ceil(element.TotalDeaths * 100000 / countryInfo.population);
          text3 = tr100;
          variableToShow3 = Math.ceil(element.TotalRecovered * 100000 / countryInfo.population);
          break;
        case '3':
          text1 = tdcc;
          variableToShow1 = element.NewConfirmed;
          text2 = tdd;
          variableToShow2 = Math.ceil(element.NewDeaths);
          text3 = tdr;
          variableToShow3 = Math.ceil(element.NewRecovered);
          break;
        case '4':
          text1 = tdcc100;
          variableToShow1 = Math.ceil(element.NewConfirmed * 100000 / countryInfo.population);
          text2 = tdd100;
          variableToShow2 = Math.ceil(element.NewDeaths * 100000 / countryInfo.population);
          text3 = tdr100;
          variableToShow3 = Math.floor(element.NewRecovered * 100000 / countryInfo.population);
          break;
        default:
          text1 = tcc;
          variableToShow1 = element.TotalConfirmed;
          text2 = td;
          variableToShow2 = Math.ceil(element.TotalDeaths);
          text3 = tr;
          variableToShow3 = Math.ceil(element.TotalRecovered);
          break;
      }
      ;

    } else {
      inputFill = '';
      const element = result.resultCOVID.Global;
      const worldPopulation = result.resultCountries.reduce((accum, item) => accum + item.population, 0);
      switch (mode) {
        case '1':
          text1 = tcc;
          variableToShow1 = element.TotalConfirmed;
          text2 = td;
          variableToShow2 = Math.ceil(element.TotalDeaths);
          text3 = tr;
          variableToShow3 = Math.ceil(element.TotalRecovered);
          break;
        case '2':
          text1 = tcc100;
          variableToShow1 = Math.ceil(element.TotalConfirmed * 100000 / worldPopulation);
          text2 = td100;
          variableToShow2 = Math.ceil(element.TotalDeaths * 100000 / worldPopulation);
          text3 = tr100;
          variableToShow3 = Math.ceil(element.TotalRecovered * 100000 / worldPopulation);
          break;
        case '3':
          text1 = tdcc;
          variableToShow1 = element.NewConfirmed;
          text2 = tdd;
          variableToShow2 = Math.ceil(element.NewDeaths);
          text3 = tdr;
          variableToShow3 = Math.ceil(element.NewRecovered);
          break;
        case '4':
          text1 = tdcc100;
          variableToShow1 = Math.ceil(element.NewConfirmed * 100000 / worldPopulation);
          text2 = tdd100;
          variableToShow2 = Math.ceil(element.NewDeaths * 100000 / worldPopulation);
          text3 = tdr100;
          variableToShow3 = Math.floor(element.NewRecovered * 100000 / worldPopulation);
          break;
        default:
          text1 = tcc;
          variableToShow1 = element.TotalConfirmed;
          text2 = td;
          variableToShow2 = Math.ceil(element.TotalDeaths);
          text3 = tr;
          variableToShow3 = Math.ceil(element.TotalRecovered);
          break;
      }
    }

    dom.tablePanel.innerHTML = `<p id='table__title'>${title}</p>
                                <p>${text1}: </p><p id='show1'>${variableToShow1}</p><br>
                                <p>${text2}: </p><p id='show2'>${variableToShow2}</p><br>
                                <p>${text3}: </p><p id='show3'>${variableToShow3}</p><br>`;

    this.createControlPanel();
  }

  createControlPanel () {
    const dom = DOMLinks.getHTMLElements();

    dom.tableControlPanel.innerHTML = `<button id='1'>${tcc}</button>
                                        <button id='2'>${tcc100}</button>
                                        <button id='3'>${tdcc}</button>
                                        <button id='4'>${tdcc100}</button>`;
  }

  changeTable (result, e) {  //  e.target.getAttribute('id') - mode
    const dom = DOMLinks.getHTMLElements();

    if (e > 4) {
      e -= 4;
      if (e > 4) {
        e -= 4;
      }
    }
    if (dom.checkBox.checked) {
      this.getData(result, countryName, String(e));
    } else {
      this.getData(result, 'World', String(e));
    }
  }

  changeTableViaInput (result, e) { // e - country name
    console.log(e);
    this.getData(result, e, '1');
  }

  changeCheckBox (result, e) {
    const dom = DOMLinks.getHTMLElements();
    console.log(e);
    if (dom.checkBox.checked) {
      console.log('checked');
      dom.input.disabled = false;

    } else {
      console.log('disabled');
      this.getData(result, 'World', '1');
      map.fly([51.505, -0.09], 2);
    }
  }

  clearCountryName (result, e) {
    const dom = DOMLinks.getHTMLElements();
    dom.checkBox.checked = false;
    search.blockOrUnblockButtons(0);
    this.getData(result, 'World', '1');
    map.fly([51.505, -0.09], 2);
    chart.createChart(
      Object.keys(result.allDataForChart.cases),
      Object.values(result.allDataForChart.cases),
      '#0E53A7',
    );
    const statItems = document.querySelectorAll('.stat__item');
    statItems.forEach(statItem => {
      if (statItem.classList.contains('highlighed')) {
        statItem.classList.remove('highlighed');
      }
      if (statItem.classList.contains('hide')) {
        statItem.classList.remove('hide');
      }
    });
    dom.input.value = '';
  }
}

const table = new Table();

export default table;
