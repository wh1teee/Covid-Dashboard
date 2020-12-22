import Data from "./Data";
import inputListen from "./search";
import sortingData, {sortByCasesListen, sortByNamesListen} from "./sort";


let currentChoosingStatistic = 'TotalConfirmed'; // default case
let allData;

const listOfStatistics = `
<div class="title">
    <div class="select">
        <div class="select__header">
           <span class="select__current">TotalConfirmed</span>
            <div class="select__icon">&times;</div>
        </div>

        <div class="select__body">
            <div class="select__item">TotalConfirmed</div>
            <div class="select__item">TotalDeaths</div>
            <div class="select__item">TotalRecovered</div>
            <div class="select__item">NewConfirmed</div>
            <div class="select__item">NewDeaths</div>
            <div class="select__item">NewRecovered</div>
        </div>
    </div>
    <div class="input__block">
    <input class="input" type="text" >
</div>
    <div class="cases__sort">cases</div>
    <div class="name__sort">name</div>
    <div class="statistic"></div>
</div>
`

Data.getAPIData().then(data => {
    allData = data.Countries;
    document.querySelector('.table').insertAdjacentHTML('beforeEnd', listOfStatistics) // render landing drop-down-list
    renderTable('TotalConfirmed')
    select(); // start drop-down list logic for click
    sortByCasesListen()
    sortByNamesListen()
    inputListen()
})

export function renderTable(chooseSelector = 'TotalConfirmed') {
    document.querySelector('.statistic').innerHTML = ''
    if (chooseSelector === 'TotalConfirmed') {
        allData.forEach((item) => {
            document.querySelector('.statistic').insertAdjacentHTML('beforeEnd', `
        <div class="stat__item"><span class="cases">${item.TotalConfirmed}</span>  
        <span class="name">${item.Country}</span>
        <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
        </div>`)
        })
    }

    if (chooseSelector === 'TotalRecovered') {
        allData.forEach((item) => {
            document.querySelector('.statistic').insertAdjacentHTML('beforeEnd', `
        <div class="stat__item"><span class="cases">${item.TotalRecovered}</span>  
        <span class="name">${item.Country}</span>
        <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
        </div>`)
        })
    }

    if (chooseSelector === 'TotalDeaths') {
        allData.forEach((item) => {
            document.querySelector('.statistic').insertAdjacentHTML('beforeEnd', `
        <div class="stat__item"><span class="cases">${item.TotalDeaths}</span>  
        <span class="name">${item.Country}</span>
        <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
        </div>`)
        })
    }

    if (chooseSelector === 'NewRecovered') {
        allData.forEach((item) => {
            document.querySelector('.statistic').insertAdjacentHTML('beforeEnd', `
        <div class="stat__item"><span class="cases">${item.NewRecovered}</span>  
        <span class="name">${item.Country}</span>
        <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
        </div>`)
        })
    }

    if (chooseSelector === 'NewDeaths') {
        allData.forEach((item) => {
            document.querySelector('.statistic').insertAdjacentHTML('beforeEnd', `
        <div class="stat__item"><span class="cases">${item.NewDeaths}</span>  
        <span class="name">${item.Country}</span>
        <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
        </div>`)
        })
    }

    if (chooseSelector === 'NewConfirmed') {
        allData.forEach((item) => {
            document.querySelector('.statistic').insertAdjacentHTML('beforeEnd', `
        <div class="stat__item"><span class="cases">${item.NewConfirmed}</span>  
        <span class="name">${item.Country}</span>
        <span><img src="https://www.countryflags.io/${item.CountryCode}/shiny/16.png"></span>
        </div>`)
        })
    }
}

const select = function () { // logic for drop-down list
    const selectHeader = document.querySelectorAll('.select__header');
    const selectItem = document.querySelectorAll('.select__item');

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
    }

    function selectChoose() {
        const text = this.innerText;
        const select = this.closest('.select');
        const currentText = select.querySelector('.select__current');
        currentText.innerText = text;
        select.classList.remove('is-active');

        currentChoosingStatistic = text
        sortingData(text) // sorting by selected parameter in drop-down list
        renderTable(text) // render sorted country statistic array
    }

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

};

export {allData, currentChoosingStatistic}
