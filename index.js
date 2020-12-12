import './src/css/style.css';
import Data from './src/js/Data';
import Header from './src/js/Header';
import Map from './src/js/Map';
import Table from './src/js/Table';
import Chart from './src/js/Chart';

const map = new Map(51.505, -0.09, 2);
map.createMap();

Data.getAPIData();

/*
import cors from 'cors';

const server = express();
server.use(cors());
*/
/*
fetch('https://api.covid19api.com/summary')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
*/
  /*
  const { data = [] } = response;
const hasData = Array.isArray(data) && data.length > 0;

// if ( !hasData ) return;

const geoJson = {
  type: 'FeatureCollection',
  features: data.map((country = {}) => {
    const { countryInfo = {} } = country;
    const { lat, long: lng } = countryInfo;
    return {
      type: 'Feature',
      properties: {
       ...country,
      },
      geometry: {
        type: 'Point',
        coordinates: [ lng, lat ]
      }
    }
  })
}
*/
