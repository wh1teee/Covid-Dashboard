import L, { control } from 'leaflet';
// import regeneratorRuntime from "regenerator-runtime";
import Data from './Data';
import DOMLinks from './DOMLinks';
import table from './Table';
import CloseButton from './CloseButton';
// import * as geoData from './geoJSON.json';
import * as geoData from './geoJSON2.json';
// import geoJSON from '../geoJSON.js'
// import dataz from './DataFunction';


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
                    'Total recovered cases per 100 thou' ];
                                       
const [tcc, tcc100, tdcc, tdcc100, td, td100, tdd, tdd100, tr, tr100,  tdr, tdr100] = variables;                   
const dom = DOMLinks.getHTMLElements();

class Map{
    
    createMap(x, y, zoom) {
        const dom = DOMLinks.getHTMLElements();

        const mapDiv = document.createElement('div');
        mapDiv.setAttribute('id','map');        
        dom.map3.append(mapDiv);

        this.map = L.map('map', {worldCopyJump: true}).setView([x, y], zoom);

        const myFilter = [
            'grayscale:100%',
            'invert:100%',
        ];
        
        const layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
     //   const layer = L.tileLayer.colorFilter('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       //     attribution: '', 
      //      filter: myFilter});
       
        layer.addTo(this.map);

      
      //  console.log(geoData);


        const myStyle = { 
            color: "#D5D1D1",
            weight: 0.1,
            opacity: 1,
        };

        const geojsonLayer = new L.GeoJSON(geoData, {
            style: myStyle,
            onEachFeature: function (f, l) {
            //  l.bindPopup(`${f.properties.admin}`);
              l.bindTooltip(`${f.properties.admin}`, {sticky: true, direction: 'auto'});
            }
        });
       
        this.map.addLayer(geojsonLayer);


      //  this.showGeoJSON();

        this.map.whenReady(() => {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 0);
        });
  
    }

 /*   showGeoJSON() {

        const myStyle = { 
            color: "#D5D1D1",
            weight: 0.1,
            opacity: 1,
        };


        this.geojsonLayer = new L.GeoJSON(geoData, {
            style: myStyle,
            onEachFeature: function (f, l) {
            //   l.bindPopup(`${f.properties.admin}`); // `${element.Country}<br> ${text}: ${variableToShow}`
               l.bindTooltip(`${f.properties.admin}`, {sticky: true, direction: 'auto'});
            }
        });
        this.map.addLayer(this.geojsonLayer);
    }

    */
    getData(result, mode) {
        const dom = DOMLinks.getHTMLElements(); 
        
        this.group = new L.LayerGroup().addTo(this.map);

        result.resultCOVID.Countries.forEach(element => {
            const country = result.resultCountries.find(item => item.alpha2Code === element.CountryCode);
         //   console.log(country);
                

            if (element.CountryCode === country.alpha2Code ) {
                 //   console.log(element.Country, element.CountryCode, country.latlng);

                  //  console.log(circleCenter);
                    
                    const circleCenter = country.latlng;

                    let text = '';
                    let variableToShow = null;
              
                    let circleRadius = 0;                   
                    let circleOptions = {};
                    
                  //  console.log(mode);

                switch(mode) {
                        
                        case '1':
                            text = tcc;
                            variableToShow = element.TotalConfirmed;
                            circleRadius = variableToShow / 10;
                            circleOptions = {color: '#0E53A7', fill: 'true', fillColor: '#0E53A7', fillOpacity: 0.5, country: element.Country};
                            break;
                        case '2':
                            text = tcc100;
                            variableToShow = Math.ceil(element.TotalConfirmed * 100000 / country.population);
                            circleRadius = variableToShow * 30;
                            circleOptions = {color: '#0E53A7', fill: 'true', fillColor: '#0E53A7', fillOpacity: 0.5, country: element.Country};
                            break;
                        case '3':
                            text = tdcc;
                            variableToShow = element.NewConfirmed;
                            circleRadius = variableToShow * 10;
                            circleOptions = {color: '#0E53A7', fill: 'true', fillColor: '#0E53A7', fillOpacity: 0.5, country: element.Country};
                            break;
                        case '4':
                            text = tdcc100;
                            variableToShow = Math.ceil(element.NewConfirmed * 100000 / country.population);
                            circleRadius = variableToShow * 2000;
                            circleOptions = {color: '#0E53A7', fill: 'true', fillColor: '#0E53A7', fillOpacity: 0.5, country: element.Country};
                            break;
                        case '5':
                            text = td;
                            variableToShow = Math.ceil(element.TotalDeaths);
                            circleRadius = variableToShow * 5;
                            circleOptions = {color: '#FF5C00', fill: 'true', fillColor: '#FF5C00', fillOpacity: 0.5, country: element.Country};
                            break;
                        case '6':
                            text = td100;
                            variableToShow = Math.ceil(element.TotalDeaths * 100000 / country.population);
                            circleRadius = variableToShow * 2500;
                            circleOptions = {color: '#FF5C00', fill: 'true', fillColor: '#FF5C00', fillOpacity: 0.5, country: element.Country};
                            break; 
                        case '7':
                            text = tdd;
                            variableToShow = Math.ceil(element.NewDeaths);
                            circleRadius = variableToShow * 500;
                            circleOptions = {color: '#FF5C00', fill: 'true', fillColor: '#FF5C00', fillOpacity: 0.5, country: element.Country};
                            break; 
                        case '8':
                            text = tdd100;
                            variableToShow = Math.ceil(element.NewDeaths * 100000 / country.population);
                            circleRadius = variableToShow * 200000;
                            circleOptions = {color: '#FF5C00', fill: 'true', fillColor: '#FF5C00', fillOpacity: 0.5, country: element.Country};
                            break;  
                        case '9':
                            text = tr;
                            variableToShow = Math.ceil(element.TotalRecovered);
                            circleRadius = variableToShow / 5;
                            circleOptions = {color: '#48DD00', fill: 'true', fillColor: '#48DD00', fillOpacity: 0.5, country: element.Country};
                            break; 
                        case '10':
                            text = tr100;
                            variableToShow = Math.ceil(element.TotalRecovered * 100000 / country.population);
                            circleRadius = variableToShow * 100;
                            circleOptions = {color: '#48DD00', fill: 'true', fillColor: '#48DD00', fillOpacity: 0.5, country: element.Country};
                            break;  
                        case '11':
                            text = tdr;
                            variableToShow = Math.ceil(element.NewRecovered);
                            circleRadius = variableToShow * 20;
                            circleOptions = {color: '#48DD00', fill: 'true', fillColor: '#48DD00', fillOpacity: 0.5, country: element.Country};
                            break;  
                        case '12':
                            text = tdr100;
                            variableToShow = Math.floor(element.NewRecovered * 100000 / country.population);
                            circleRadius = variableToShow * 2000;
                            circleOptions = {color: '#48DD00', fill: 'true', fillColor: '#48DD00', fillOpacity: 0.5, country: element.Country};
                            break;                                                       
                        default: 
                       //     console.log('it is default');
                            text = tcc;
                            variableToShow = element.TotalConfirmed;
                            circleRadius = variableToShow / 10;
                            circleOptions = {color: '#0E53A7', fill: 'true', fillColor: '#0E53A7', fillOpacity: 0.5, country: element.Country};
                            break;
                };
              
        
                    const circle = L.circle(circleCenter, circleRadius, circleOptions);
                    circle.bindPopup(`${element.Country}<br> ${text}: ${variableToShow}`);
                   
                    // circle.addTo(map);
                    this.group.addLayer(circle);
                 //   console.log('circle');
            
                circle.on('click', function(e){
                        console.log('event');
                        console.log(e.target);
                        console.log(e.target.options.country);
                    //   this.geojsonLayer.closeTooltip();
                        table.changeTableViaInput(result, e.target.options.country);
                        dom.checkBox.checked = true;
                });
 


            } // закрывается if
        });

        

        this.map.addLayer(this.group);
     
        if (! dom.infoLegend)
        this.createLegend(this.map);
        if (! dom.mapControlPanel)
        this.createControlPanel();
       
        
    }

    createLegend(map) {
       // const map = document.getElementById('map');
        const legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {
        
            let div = L.DomUtil.create('div', 'info legend'),
                grades = ['Confirmed cases', 'Deaths', 'Recovered cases'],
                labels = ['src/images/ballBlue.png','src/images/ballRed.png','src/images/ballGreen.png'];
        
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    (" <img src="+ labels[i] +" height='20' width='20'>") + grades[i] + '<br>';
            }
        
            return div;
        };
        
        legend.addTo(map);

    }

    createControlPanel(){
        const dom = DOMLinks.getHTMLElements(); 

        const controlDiv = document.createElement('div');
        controlDiv.setAttribute('id','control__panel');    
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
        dom.map3.append(controlDiv); 
    }

    changeMap(result, e){ // mode
      //  console.log(e);
      //  console.log(e.target.innerHTML); 
        this.map.removeLayer(this.group);
     //   console.log(e.target.getAttribute('id'));
        this.getData(result, e);
      //  this.changeToolTip(e.target.getAttribute('id'));
    }
/*
    changeToolTip(){
        this.map.removeLayer(this.geojsonLayer);
        console.log(text, variableToShow);
        this.showGeoJSON();

    }
*/

    resizeMap(result, event) {
        const dom = DOMLinks.getHTMLElements(); 
       // this.map.classList.add('wide');
       dom.map3.classList.add('wide');
       dom.map.classList.add('wide');
       dom.asideLeft.classList.add('hide');
       dom.asideRight.classList.add('hide');
    /*   L.map.resize() {
            let oldSize = this.getSize();
            let newSize = new L.Point(this._container.clientWidth, this._container.clientHeight);

            if (!newSize.equals(oldSize)) {
                this.fire('resize', newSize);
                L.Map.prototype._onResize.call(this);
            }
       };
*/
    }

    fly(latlng, zoom){
      this.map.flyTo(latlng, zoom);
    }

}

const map = new Map();

export default map;