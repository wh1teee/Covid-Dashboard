let obj = [];
let countriesData = {};

function getCountriesData () {
  fetch('https://restcountries.eu/rest/v2/all')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      countriesData = data;
    });
}

function findCountry (countryCode) {
  let ifFind = false;
  let latlng = [];
  for (let i = 0; i < countriesData.length; i += 1) {
    const array = countriesData[i];
    if (countryCode === countriesData[i].alpha2Code) {
      latlng = array.latlng;
      ifFind = true;
      break;
    }
    if (ifFind) break;
  }
  return latlng;
}

function getAPIData () {
  fetch('https://api.covid19api.com/summary')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      obj = data.Countries;

      obj.map(element => {
        const el = element;
        const [latitude, longitude] = findCountry(element.CountryCode);
        el.Latitude = latitude;
        el.Longitude = longitude;
      });
      return obj;
    });
}

getCountriesData();
const dataz = getAPIData();

export default dataz;
