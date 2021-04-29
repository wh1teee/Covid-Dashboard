import './src/css/style.css';
import './src/css/table.css';
import './src/css/keyboard.css';
import Data from './src/js/Data';

import createDOM from './src/js/DOM';
import map from './src/js/Map';
import General from './src/js/General';
import list from './src/js/List';
import table from './src/js/Table';
import chart from './src/js/Chart';
import renderKeboard from './src/js/keys';
import listenFullScreenButtons from './src/js/fullscreen';

createDOM();
Data.getData();
renderKeboard('small');

const main = document.querySelector('.main');
main.style.display = 'none';
main.insertAdjacentHTML('afterend', `
    <div class="loading">
        <img src="./src/images/spinner.svg" alt="loading...">
    </div>
`);

Data.getData().then(result => {
  map.createMap(51.505, -0.09, 2);
  map.getData(result, '1');
  map.showGeoJSON(result, '1');

  table.getData(result, 'World', '1');
  General.createGeneral(result);

  list.createList(result);

  chart.render();
  console.log(result);
  chart.createChart(
    Object.keys(result.allDataForChart.cases),
    Object.values(result.allDataForChart.cases),
    '#0E53A7',
  );

  console.log(result.allDataForChart);

  document.getElementById('control__panel').addEventListener('click', (event) => map.changeMap(result, event.target.getAttribute('id')));
  document.getElementById('control__panel').addEventListener('click', (event) => table.changeTable(result, event.target.getAttribute('id')));
  document.getElementById('control__panel').addEventListener('click', (event) => map.showGeoJSON(result, event.target.getAttribute('id')));

  document.getElementById('table__controlpanel').addEventListener('click', (event) => table.changeTable(result, event.target.getAttribute('id')));
  document.getElementById('table__controlpanel').addEventListener('click', (event) => map.changeMap(result, event.target.getAttribute('id')));

  document.getElementById('checkbox').addEventListener('change', (event) => table.changeCheckBox(result, event.target.value));
  document.getElementById('clear').addEventListener('click', (event) => table.clearCountryName(result, event));
  document.querySelector('.input').addEventListener('click', (event) => table.clearCountryName(result, event));

  document.querySelector('.select__body').addEventListener('click', (event) => list.selectParam(event));
  document.querySelector('.statistic').addEventListener('click', (event) => list.selectCountry(result, event));

  listenFullScreenButtons();
})
  .catch(e => {
    throw Error(e);
  })
  .finally(() => {
    const loadingDiv = document.querySelector('.loading');
    loadingDiv.remove();
    main.style.display = 'flex';
  });

