import './src/css/style.css';
import L from 'leaflet';
// import Data from './src/js/Data';


import Map from './src/js/Map';
import Table from './src/js/Table';
import Chart from './src/js/Chart';

const map = new Map(51.505, -0.09, 2, true);
map.createMap();




// console.log(obj);
/*
getData().then(result => {
    console.log(result);
    return result;
    }
)
*/


// Data.getCountriesData();
// Data.getAPIData();

//Data2.getData();
//Data2.getInfoData();

/*

async function getData(){
    let stat = await fetch('https://api.covid19api.com/summary');
    let stat2 = await fetch('https://restcountries.eu/rest/v2/all');
    let com = await stat.json();
    let com2 = await stat2.json();
    return { com, com2 };
}


getData().then(result => {
    console.log(result);
    result.com.Countries.forEach(element => {
        console.log('1');
        const country = result.com2.find(item => item.alpha2Code === element.CountryCode);
        console.log(country);
     //   console.log(element.name, element.alpha2Code, element.latlng);
     //   console.log(result.com.Countries.find(item => item.CountryCode === element.alpha2Code));
        if (element.CountryCode === country.alpha2Code ) {
            console.log(element.Country, element.CountryCode, country.latlng);
            const circleCenter = country.latlng;
            console.log(circleCenter);
            const circleOptions = {
                color: 'red',
                fill: 'true',
                fillColor: '#f03',
                fillOpacity: 0.5
            };
            const circleRadius = element.TotalConfirmed;
            console.log(element.TotalConfirmed);
            console.log(circleRadius);

            const circle = L.circle(circleCenter, circleRadius, circleOptions);
            circle.bindPopup(`${element.Country}\n${element.TotalConfined}`);
            circle.addTo(map);
            console.log('circle');
        }
    });
})
    

*/
/*
import cors from 'cors';

const server = express();
server.use(cors());
*/



