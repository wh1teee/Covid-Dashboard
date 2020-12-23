import Data from "./Data";
import inputListen, {blockOrUnblockButtons} from "./search";
// eslint-disable-next-line import/no-cycle
import sortingData, {sortByCasesListen, sortByNamesListen} from "./sort";
import {showKeyboardListen} from "./keys";

// eslint-disable-next-line import/no-mutable-exports
let currentChoosingStatistic = 'TotalConfirmed'; // default case
// eslint-disable-next-line import/no-mutable-exports
let allData;

const listOfStatistics = `
<div class="title">
<div class="header__table">
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
    <button class="keyboard__show"></button>
</div>
    <div class="sort__block">
    <button class="cases__sort">cases</button>
    <button class="name__sort">name</button>
    </div>
    </div>
    <div class="statistic"></div>
</div>
`
Data.getAPIData().then(data => {
    allData = data.Countries;
    document.querySelector('.table').insertAdjacentHTML('beforeEnd', listOfStatistics) // render landing drop-down-list
    // eslint-disable-next-line no-use-before-define
    renderTable('TotalConfirmed')
    // eslint-disable-next-line no-use-before-define
    select(); // start drop-down list logic for click
    sortByCasesListen()
    sortByNamesListen()
    inputListen()
    showKeyboardListen()
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
    const input = document.querySelector('.input');

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
    }

    function selectChoose() {
        const text = this.innerText;
        // eslint-disable-next-line no-shadow
        const select = this.closest('.select');
        const currentText = select.querySelector('.select__current');
        currentText.innerText = text;
        select.classList.remove('is-active');

        input.value = '' // refresh search area if choose another statistic
        blockOrUnblockButtons(0) // refresh search area if choose another statistic
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
    // eslint-disable-next-line no-use-before-define
    listenFullScreenBtn()
};

function listenFullScreenBtn() {
    const table = document.querySelector('.table')
    document.querySelector('.full__screen__btn').onclick = () => {
        table.classList.toggle('full__screen')
    }
}

export {allData, currentChoosingStatistic}
