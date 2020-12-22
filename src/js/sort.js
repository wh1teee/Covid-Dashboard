import {allData, currentChoosingStatistic, renderTable} from "./Table";

let casesDecrease = true;
let namesDecrease = true;

function sortByTotalConfirmed(a, b) {
    return b.TotalConfirmed - a.TotalConfirmed
}

function sortByTotalRecovered(a, b) {
    return b.TotalRecovered - a.TotalRecovered
}

function sortByTotalDeaths(a, b) {
    return b.TotalDeaths - a.TotalDeaths
}

function sortByNewRecovered(a, b) {
    return b.NewRecovered - a.NewRecovered
}

function sortByNewDeaths(a, b) {
    return b.NewDeaths - a.NewDeaths
}

function sortByNewConfirmed(a, b) {
    return b.NewConfirmed - a.NewConfirmed
}

export default function sortingData(chooseSelector) {
    if (chooseSelector === 'TotalConfirmed') allData.sort(sortByTotalConfirmed)
    if (chooseSelector === 'TotalRecovered') allData.sort(sortByTotalRecovered)
    if (chooseSelector === 'TotalDeaths') allData.sort(sortByTotalDeaths)
    if (chooseSelector === 'NewRecovered') allData.sort(sortByNewRecovered)
    if (chooseSelector === 'NewDeaths') allData.sort(sortByNewDeaths)
    if (chooseSelector === 'NewConfirmed') allData.sort(sortByNewConfirmed)
}

function sortByCases() {
    if(casesDecrease){
        allData.sort((a, b) => a[currentChoosingStatistic] - b[currentChoosingStatistic])
        casesDecrease = false
    } else {
        allData.sort((a, b) => b[currentChoosingStatistic] - a[currentChoosingStatistic])
        casesDecrease = true
    }
}

export function sortByCasesListen() {
    document.querySelector('.cases__sort').addEventListener('click', () => {
        sortByCases()
        renderTable(currentChoosingStatistic)
    })
}

function sortByNames() {
    if(namesDecrease){
        allData.sort((a, b) => {
            if (a.Country > b.Country) return 1
            if (a.Country < b.Country) return -1
        })
        namesDecrease = false
    } else {
        allData.sort((a, b) => {
            if (a.Country > b.Country) return -1
            if (a.Country < b.Country) return 1
        })
        namesDecrease = true
    }
}

export function sortByNamesListen() {
    document.querySelector('.name__sort').addEventListener('click', () => {
        sortByNames()
        renderTable(currentChoosingStatistic)
    })
}
