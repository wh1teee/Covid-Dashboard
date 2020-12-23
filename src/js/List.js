import DOMLinks from './DOMLinks';
import map from './Map';
import table from './Table';
import search from './search';
import sortingData, {sortByCasesListen, sortByNamesListen} from './sort';

let currentChoosingStatistic = 'TotalConfirmed'; // default case
let allData;
let allDataFull;
/*
сonst variables = ['Total confirmed cases', 
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
*/
const listOfStatistics = `
<div class="title">
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
        </div>
    </div>
    <div class="input__block">
    <input class="input" type="text" >
</div>
    <div class="cases__sort">cases</div>
    <div class="name__sort">name</div>
    <div class="statistic"></div>
</div>
`;

class List {

    createList(result) {
        const dom = DOMLinks.getHTMLElements(); 
        allDataFull = result;
        allData = result.resultCOVID.Countries;
        dom.list.insertAdjacentHTML('beforeEnd', listOfStatistics); // render landing drop-down-list
        this.renderTable('TotalConfirmed');
        this.select(); // start drop-down list logic for click
        sortByCasesListen();
        sortByNamesListen();
        search.inputListen();
    }

    
    renderTable(chooseSelector) {
        const dom = DOMLinks.getHTMLElements(); 
        dom.statistic.innerHTML = '';
        if (chooseSelector === 'TotalConfirmed') {
            allData.forEach((item) => {
                dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class='stat__item' id='${item.Country}'><span class="cases">${item.TotalConfirmed}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`)
            })
        };
    
        if (chooseSelector === 'TotalRecovered') {
            allData.forEach((item) => {
                dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${item.TotalRecovered}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`)
            });
           map.changeMap(allDataFull, '9');
        };
    
        if (chooseSelector === 'TotalDeaths') {
            allData.forEach((item) => {
                dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${item.TotalDeaths}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`)
            })
        };
    
        if (chooseSelector === 'NewRecovered') {
            allData.forEach((item) => {
                dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${item.NewRecovered}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`)
            })
        };
    
        if (chooseSelector === 'NewDeaths') {
            allData.forEach((item) => {
                dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${item.NewDeaths}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`)
            })
        };
    
        if (chooseSelector === 'NewConfirmed') {
            allData.forEach((item) => {
                dom.statistic.insertAdjacentHTML('beforeEnd', `
            <div class="stat__item"><span class="cases">${item.NewConfirmed}</span>  
            <span class="name">${item.Country}</span>
            <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
            </div>`)
            })
        };
    }  
    
    select() { // logic for drop-down list
        const selectHeader = document.querySelectorAll('.select__header');
        const selectItem = document.querySelectorAll('.select__item');
        const selectBody = document.querySelector('.select__body');
    
    /*    function selectToggle() {
            this.parentElement.classList.toggle('is-active');
        }
    
        function selectChoose() {
            const text = this.innerText;
            const select = this.closest('.select');
            const currentText = select.querySelector('.select__current');
            currentText.innerText = text;
            select.classList.remove('is-active');
    
            currentChoosingStatistic = text;
            sortingData(text); // sorting by selected parameter in drop-down list
            this.renderTable(text); // render sorted country statistic array
        }
    */
        selectHeader.forEach(item => {
            item.addEventListener('click', function(){
                this.parentElement.classList.toggle('is-active')
            });
        });
    
    };

    selectParam(e){
            console.log(e.target.getAttribute('id'));
            const text = e.target.getAttribute('id');
            const select = e.target.closest('.select');
            const currentText = select.querySelector('.select__current');
            currentText.innerText = text;
            select.classList.remove('is-active');
    
            currentChoosingStatistic = text;
            console.log(text);
            sortingData(text); // sorting by selected parameter in drop-down list
            this.renderTable(e.target.getAttribute('id')); // render sorted country statistic array
    }

    selectCountry(e){
        const dom = DOMLinks.getHTMLElements();
        console.log(e.target);
        console.log(e.target.closest('.stat__item'));
        console.log(e.target.closest('.stat__item').getAttribute('id'));
        const country = e.target.closest('.stat__item').getAttribute('id');
        const statItems = document.querySelectorAll('.stat__item');
        statItems.forEach(statItem => {
            if (statItem.classList.contains('highlighed')) {
                statItem.classList.remove('highlighed');
            }
        });
        
        document.getElementById(country).classList.add('highlighed');
    
        table.getData(allDataFull, country, '1');
       // table.changeCheckBox(allDataFull, e);
        // dom.checkBox.checked = true;
        console.log(allData);
        console.log(allDataFull);
        const element = allData.find(item => item.Country === country);
        
        const countryInfo = allDataFull.resultCountries.find(item => item.alpha2Code === element.CountryCode);
        map.fly(countryInfo.latlng, 7);
        dom.checkBox.checked = true;
        
    }

}

const list = new List();

export default list
export {allData, currentChoosingStatistic}
