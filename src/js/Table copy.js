import DOMLinks from './DOMLinks';
import Map from './Map';

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
                    'Total recovered cases per 100 thou' ];
                                       
const [tcc, tcc100, tdcc, tdcc100, td, td100, tdd, tdd100, tr, tr100,  tdr, tdr100] = variables;                   
const countryNames = [];
let dataList = '';
let inputFill = '';


class Table {

    constructor(country, mode){
        this.country = country;
        this.mode = mode;
    }

   /* createTable() {
        const dom = DOMLinks.getHTMLElements();


    }*/

    getData(country, mode) {  
        const dom = DOMLinks.getHTMLElements(); 

        async function getData(){
            let infoCOVID = await fetch('https://api.covid19api.com/summary');
            let infoCountries = await fetch('https://restcountries.eu/rest/v2/all');
            let resultCOVID = await infoCOVID.json();
            let resultCountries = await infoCountries.json();
            return { resultCOVID, resultCountries };
        }

        getData(country, mode).then(result => {
            const dom = DOMLinks.getHTMLElements(); 
            console.log(country);
            console.log(mode);
            console.log(dom.checkBox.checked);
        
            result.resultCOVID.Countries.forEach(elem => {
                countryNames.push(elem.Country);
            });

            dataList = countryNames.map(el => 
                `<option>${el}</option>`).join('').toString();

            let title = '';
            let text1 = '';
            let text2 = '';
            let text3 = '';
            let variableToShow1 = null;
            let variableToShow2 = null;
            let variableToShow3 = null;
            
            if (country === 'world' || dom.checkBox.checked)   {
                title = mode;
                inputFill = mode;
                const element = result.resultCOVID.Countries.find(item => item.Country === mode)
                console.log(element);
                const country = result.resultCountries.find(item => item.alpha2Code === element.CountryCode);
                console.log(country);
                switch(mode) {
                    case '1':
                        console.log('bol=true1');
                        text1 = tcc;
                        variableToShow1 = element.TotalConfirmed;
                        text2 = td;
                        variableToShow2 = Math.ceil(element.TotalDeaths);
                        text3 = tr;
                        variableToShow3 = Math.ceil(element.TotalRecovered);
                        break;
                    case '2':
                        console.log('bol=true2');
                        text1 = tcc100;
                        variableToShow1 = Math.ceil(element.TotalConfirmed * 100000 / country.population);
                        text2 = td100;
                        variableToShow2 = Math.ceil(element.TotalDeaths * 100000 / country.population);
                        text3 = tr100;
                        variableToShow3 = Math.ceil(element.TotalRecovered * 100000 / country.population);
                        break;
                    case '3':
                        console.log('bol=true3');
                        text1 = tdcc;
                        variableToShow1 = element.NewConfirmed;
                        text2 = tdd;
                        variableToShow2 = Math.ceil(element.NewDeaths);
                        text3 = tdr;
                        variableToShow3 = Math.ceil(element.NewRecovered);
                        break;
                    case '4':
                        console.log('bol=true4');
                        text1 = tdcc100;
                        variableToShow1 = Math.ceil(element.NewConfirmed * 100000 / country.population);
                        text2 = tdd100;
                        variableToShow2 = Math.ceil(element.NewDeaths * 100000 / country.population);
                        text3 = tdr100;
                        variableToShow3 = Math.floor(element.NewRecovered * 100000 / country.population);
                        break;                                                     
                    default: 
                        console.log('bol=true-def');
                        text1 = tcc;
                        variableToShow1 = element.TotalConfirmed;
                        text2 = td;
                        variableToShow2 = Math.ceil(element.TotalDeaths);
                        text3 = tr;
                        variableToShow3 = Math.ceil(element.TotalRecovered);
                        break;
                    };
                    
            } else {
                title = 'Global cases';
                inputFill = '';
                const element = result.resultCOVID.Global;
                const worldPopulation = result.resultCountries.reduce((accum, item) => accum + item.population, 0);
                switch(mode) {
                    case '1':
                        console.log('bol=false1');
                        text1 = tcc;
                        variableToShow1 = element.TotalConfirmed;
                        text2 = td;
                        variableToShow2 = Math.ceil(element.TotalDeaths);
                        text3 = tr;
                        variableToShow3 = Math.ceil(element.TotalRecovered);
                        break;
                    case '2':
                        console.log('bol=false2');
                        text1 = tcc100;
                        variableToShow1 = Math.ceil(element.TotalConfirmed * 100000 / worldPopulation);
                        text2 = td100;
                        variableToShow2 = Math.ceil(element.TotalDeaths * 100000 / worldPopulation);
                        text3 = tr100;
                        variableToShow3 = Math.ceil(element.TotalRecovered * 100000 / worldPopulation);
                        break;
                    case '3':
                        console.log('bol=false3');
                        text1 = tdcc;
                        variableToShow1 = element.NewConfirmed;
                        text2 = tdd;
                        variableToShow2 = Math.ceil(element.NewDeaths);
                        text3 = tdr;
                        variableToShow3 = Math.ceil(element.NewRecovered);
                        break;
                    case '4':
                        console.log('bol=false4');
                        text1 = tdcc100;
                        variableToShow1 = Math.ceil(element.NewConfirmed * 100000 / worldPopulation);
                        text2 = tdd100;
                        variableToShow2 = Math.ceil(element.NewDeaths * 100000 / worldPopulation);
                        text3 = tdr100;
                        variableToShow3 = Math.floor(element.NewRecovered * 100000 / worldPopulation);
                        break;                                                     
                    default: 
                        console.log('bol=false-def');
                        text1 = tcc;
                        variableToShow1 = element.TotalConfirmed;
                        text2 = td;
                        variableToShow2 = Math.ceil(element.TotalDeaths);
                        text3 = tr;
                        variableToShow3 = Math.ceil(element.TotalRecovered);
                        break;
                    };
                };

            dom.tablePanel.innerHTML = `<p>${title}</p>
                                <span>${text1}:</span><span>${variableToShow1}</span><br>
                                <span>${text2}:</span><span>${variableToShow2}</span><br>
                                <span>${text3}:</span><span>${variableToShow3}</span><br>`;
            dom.tableInput.innerHTML = `<input type='text' placeholder='Enter country name'
                                            list='countries' value='${inputFill}'
                                            id='input' disabled>
                                            <datalist id='countries'>
                                                ${dataList}
                                            </datalist>`;
          //  dom.input.disabled = true;

            if (document.getElementById('table__controlpanel').classList.contains('country')) {
                document.getElementById('table__controlpanel').addEventListener('click', (event) => this.changeTable2(event));
            } else {
                document.getElementById('table__controlpanel').addEventListener('click', (event) => this.changeTable(event));
            }
            
            document.getElementById('input').addEventListener('change', (event) => this.changeTable2(event.target.value));
        
        
        });
        this.createControlPanel();
    }    

    createControlPanel() {
        const dom = DOMLinks.getHTMLElements(); 
   
        dom.tableControlPanel.innerHTML = `<button id='1'>${tcc}</button>
                                <button id='2'>${tcc100}</button>
                                <button id='3'>${tdcc}</button>
                                <button id='4'>${tdcc100}</button>`;
    }

    changeTable(e){
        const dom = DOMLinks.getHTMLElements(); 
        console.log(e.target.innerHTML);
        console.log(e.target.getAttribute('id'));
        this.getData(e.target.getAttribute('id'), false);
    }

    changeTable2(e){
        const dom = DOMLinks.getHTMLElements(); 
        console.log(e);
      //  console.log(e.target.innerHTML);
     //   console.log(e.target.getAttribute('id'));
       // if (!dom.tableControlPanel.classList.contains('country'))
        dom.tableControlPanel.classList.add('country');
        dom.checkBox.checked = false;
        this.getData(e, true);
    }

    changeCheckBox(e){
        const dom = DOMLinks.getHTMLElements();
        console.log(e);
        if (dom.checkBox.checked) {
            console.log('checked');
            dom.input.disabled = false;
        } else {
            console.log('not disabled');
            dom.input.disabled = true;
        }
    }

}
// const table = new Table();

export default Table;