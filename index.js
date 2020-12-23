import './src/css/style.css';
import './src/css/table.css';

// import L from 'leaflet';
import Data from './src/js/Data';

import createDOM from './src/js/DOM';
import map from './src/js/Map';
import General from './src/js/General';
import list from './src/js/List';
import table from './src/js/Table';
import chart from './src/js/Chart';
import CloseButton from './src/js/CloseButton';


createDOM();

Data.getData();

Data.getData().then(result => {
    console.log(result);
    map.createMap(51.505, -0.09, 2);
    map.getData(result, '1');
  //  map.showGeoJSON();

    CloseButton.createCloseButton('1', document.getElementById('map3'));
 
    table.getData(result, 'World', '1');
    General.createGeneral(result);

    list.createList(result);

    chart.createChart();

    document.getElementById('control__panel').addEventListener('click', (event) => map.changeMap(result, event.target.getAttribute('id')));
    document.getElementById('close__button1').addEventListener('click', (event) => map.resizeMap(result, event));

    document.getElementById('table__controlpanel').addEventListener('click', (event) => table.changeTable(result, event));

    document.getElementById('checkbox').addEventListener('change', (event) => table.changeCheckBox(result, event.target.value));
    document.getElementById('clear').addEventListener('click', (event) => table.clearCountryName(result, event));    

    document.querySelector('.select__body').addEventListener('click', (event) => list.selectParam(event));
  //  document.querySelector('.statistic').addEventListener('click', (event) => list.selectCountry(event));
})









/*

list.getData(1);

table.getData('World', '1');


map.createMap(51.505, -0.09, 2);
map.getData(1);


document.getElementById('control__panel').addEventListener('click', (event) => map.changeMap(event));


document.getElementById('table__controlpanel').addEventListener('click', (event) => table.changeTable(event));

document.getElementById('checkbox').addEventListener('change', (event) => table.changeCheckBox(event.target.value));
document.getElementById('clear').addEventListener('click', (event) => table.clearCountryName(event));    

*/



