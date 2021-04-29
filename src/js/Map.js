import L from 'leaflet';
import DOMLinks from './DOMLinks';
import table from './Table';
import * as geoData from './geoJSON2.json';

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
  'Total recovered cases per 100 thou'];

const [tcc, tcc100, tdcc, tdcc100, td, td100, tdd, tdd100, tr, tr100, tdr, tdr100] = variables;

class Map {

  createMap (x, y, zoom) {
    const dom = DOMLinks.getHTMLElements();

    const mapDiv = document.createElement('div');
    mapDiv.setAttribute('id', 'map');
    dom.map3Block.append(mapDiv);

    this.map = L.map('map', { worldCopyJump: true }).setView([x, y], zoom);

    const layer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 19,
    });

    layer.addTo(this.map);

    this.map.whenReady(() => {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
    });
  }

  showGeoJSON (result, mode) {

    const myStyle = {
      color: '#D5D1D1',
      weight: 0.05,
      opacity: 0.05,
    };

    const geojsonLayer = new L.GeoJSON(geoData, {
      style: myStyle,
      onEachFeature: function (f, l) {
        let text = '';
        let variableToShow = null;
        const countryInfoCovid = result.resultCOVID.Countries.find(item => item.CountryCode === f.properties.iso_a2);
        const countryInfoCountries = result.resultCountries.find(item => item.alpha2Code === f.properties.iso_a2);

        if (countryInfoCovid && f.properties.iso_a2 === countryInfoCovid.CountryCode) {

          switch (mode) {
            case '1':
              text = tcc;
              variableToShow = countryInfoCovid.TotalConfirmed;
              break;
            case '2':
              text = tcc100;
              variableToShow = Math.ceil(countryInfoCovid.TotalConfirmed * 100000 / countryInfoCountries.population);

              break;
            case '3':
              text = tdcc;
              variableToShow = countryInfoCovid.NewConfirmed;

              break;
            case '4':
              text = tdcc100;
              variableToShow = Math.ceil(countryInfoCovid.NewConfirmed * 100000 / countryInfoCountries.population);

              break;
            case '5':
              text = td;
              variableToShow = Math.ceil(countryInfoCovid.TotalDeaths);
              break;
            case '6':
              text = td100;
              variableToShow = Math.ceil(countryInfoCovid.TotalDeaths * 100000 / countryInfoCountries.population);

              break;
            case '7':
              text = tdd;
              variableToShow = Math.ceil(countryInfoCovid.NewDeaths);

              break;
            case '8':
              text = tdd100;
              variableToShow = Math.ceil(countryInfoCovid.NewDeaths * 100000 / countryInfoCountries.population);

              break;
            case '9':
              text = tr;
              variableToShow = Math.ceil(countryInfoCovid.TotalRecovered);

              break;
            case '10':
              text = tr100;
              variableToShow = Math.ceil(countryInfoCovid.TotalRecovered * 100000 / countryInfoCountries.population);

              break;
            case '11':
              text = tdr;
              variableToShow = Math.ceil(countryInfoCovid.NewRecovered);

              break;
            case '12':
              text = tdr100;
              variableToShow = Math.floor(countryInfoCovid.NewRecovered * 100000 / countryInfoCountries.population);

              break;
            default:
              text = tcc;
              variableToShow = countryInfoCovid.TotalConfirmed;
              break;
          }
          l.bindTooltip(`${f.properties.admin}<br> ${text}: ${variableToShow}`, { sticky: true, direction: 'auto' });

        }
      },
    });

    this.map.addLayer(geojsonLayer);
  }

  getData (result, mode) {
    const dom = DOMLinks.getHTMLElements();

    this.group = new L.LayerGroup().addTo(this.map);

    result.resultCOVID.Countries.forEach(element => {
      const country = result.resultCountries.find(item => item.alpha2Code === element.CountryCode);

      if (element.CountryCode === country.alpha2Code) {
        const circleCenter = country.latlng;

        let text = '';
        let variableToShow = null;
        let circleRadius = 0;
        let circleOptions = {};

        switch (mode) {

          case '1':
            text = tcc;
            variableToShow = element.TotalConfirmed;
            circleRadius = variableToShow / 10;
            circleOptions = {
              color: '#0E53A7',
              fill: 'true',
              fillColor: '#0E53A7',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '2':
            text = tcc100;
            variableToShow = Math.ceil(element.TotalConfirmed * 100000 / country.population);
            circleRadius = variableToShow * 30;
            circleOptions = {
              color: '#0E53A7',
              fill: 'true',
              fillColor: '#0E53A7',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '3':
            text = tdcc;
            variableToShow = element.NewConfirmed;
            circleRadius = variableToShow * 10;
            circleOptions = {
              color: '#0E53A7',
              fill: 'true',
              fillColor: '#0E53A7',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '4':
            text = tdcc100;
            variableToShow = Math.ceil(element.NewConfirmed * 100000 / country.population);
            circleRadius = variableToShow * 2000;
            circleOptions = {
              color: '#0E53A7',
              fill: 'true',
              fillColor: '#0E53A7',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '5':
            text = td;
            variableToShow = Math.ceil(element.TotalDeaths);
            circleRadius = variableToShow * 5;
            circleOptions = {
              color: '#FF5C00',
              fill: 'true',
              fillColor: '#FF5C00',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '6':
            text = td100;
            variableToShow = Math.ceil(element.TotalDeaths * 100000 / country.population);
            circleRadius = variableToShow * 2500;
            circleOptions = {
              color: '#FF5C00',
              fill: 'true',
              fillColor: '#FF5C00',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '7':
            text = tdd;
            variableToShow = Math.ceil(element.NewDeaths);
            circleRadius = variableToShow * 500;
            circleOptions = {
              color: '#FF5C00',
              fill: 'true',
              fillColor: '#FF5C00',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '8':
            text = tdd100;
            variableToShow = Math.ceil(element.NewDeaths * 100000 / country.population);
            circleRadius = variableToShow * 200000;
            circleOptions = {
              color: '#FF5C00',
              fill: 'true',
              fillColor: '#FF5C00',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '9':
            text = tr;
            variableToShow = Math.ceil(element.TotalRecovered);
            circleRadius = variableToShow / 5;
            circleOptions = {
              color: '#48DD00',
              fill: 'true',
              fillColor: '#48DD00',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '10':
            text = tr100;
            variableToShow = Math.ceil(element.TotalRecovered * 100000 / country.population);
            circleRadius = variableToShow * 100;
            circleOptions = {
              color: '#48DD00',
              fill: 'true',
              fillColor: '#48DD00',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '11':
            text = tdr;
            variableToShow = Math.ceil(element.NewRecovered);
            circleRadius = variableToShow * 20;
            circleOptions = {
              color: '#48DD00',
              fill: 'true',
              fillColor: '#48DD00',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          case '12':
            text = tdr100;
            variableToShow = Math.floor(element.NewRecovered * 100000 / country.population);
            circleRadius = variableToShow * 2000;
            circleOptions = {
              color: '#48DD00',
              fill: 'true',
              fillColor: '#48DD00',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
          default:
            //     console.log('it is default');
            text = tcc;
            variableToShow = element.TotalConfirmed;
            circleRadius = variableToShow / 10;
            circleOptions = {
              color: '#0E53A7',
              fill: 'true',
              fillColor: '#0E53A7',
              fillOpacity: 0.5,
              country: element.Country,
            };
            break;
        }
        const circle = L.circle(circleCenter, circleRadius, circleOptions);
        circle.bindPopup(`${element.Country}<br> ${text}: ${variableToShow}`);
        this.group.addLayer(circle);

        circle.on('click', function (e) {
          console.log('event');
          console.log(e.target);
          console.log(e.target.options.country);
          table.changeTableViaInput(result, e.target.options.country);
          dom.checkBox.checked = true;
        });
      }
    });

    this.map.addLayer(this.group);

    if (!dom.infoLegend)
      this.createLegend(this.map);
    if (!dom.mapControlPanel)
      this.createControlPanel();
  }

  createLegend (map) {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

      let div = L.DomUtil.create('div', 'info legend'),
        grades = ['Confirmed cases', 'Deaths', 'Recovered cases'],
        labels = ['src/images/ballBlue.png', 'src/images/ballRed.png', 'src/images/ballGreen.png'];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          (' <img src=' + labels[i] + ' height=\'20\' width=\'20\'>') + grades[i] + '<br>';
      }

      return div;
    };

    legend.addTo(map);
  }

  createControlPanel () {
    const dom = DOMLinks.getHTMLElements();

    const controlDiv = document.createElement('div');
    controlDiv.setAttribute('id', 'control__panel');
    controlDiv.innerHTML = `<button id='1'>${tcc}</button>
                                <button id='2'>${tcc100}</button>
                                <button id='3'>${tdcc}</button>
                                <button id='4'>${tdcc100}</button>
                                <button id='5'>${td}</button>
                                <button id='6'>${td100}</button>
                                <button id='7'>${tdd}</button>
                                <button id='8'>${tdd100}</button>
                                <button id='9'>${tr}</button>
                                <button id='10'>${tr100}</button>
                                <button id='11'>${tdr}</button>
                                <button id='12'>${tdr100}</button>`;
    dom.map3Block.append(controlDiv);
  }

  changeMap (result, e) { // mode
    this.map.removeLayer(this.group);
    this.getData(result, e);
  }

  resizeMap (result, event) {
    const dom = DOMLinks.getHTMLElements();
    dom.map3.classList.add('wide');
    dom.map.classList.add('wide');
    dom.asideLeft.classList.add('hide');
    dom.asideRight.classList.add('hide');
    this.map.invalidateSize(true);
  }

  fly (latlng, zoom) {
    this.map.flyTo(latlng, zoom);
  }
}

const map = new Map();

export default map;
