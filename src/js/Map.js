import L from 'leaflet';
// import regeneratorRuntime from "regenerator-runtime";
import Data from './Data';
// import dataz from './DataFunction';


class Map{

    constructor(x, y, zoom, worldCopyJump){
        this.x = x;
        this.y = y;
        this.zoom = zoom;
        this.worldCopyJump = worldCopyJump;
    }

    createMap() {
        const mapDiv = document.createElement('div');
        mapDiv.setAttribute('id','map');        
        document.querySelector('body').append(mapDiv);

        const map = new L.Map('map', {
             center: [this.x, this.y], 
             zoom: this.zoom, 
             worldCopyJump: this.worldCopyJump
            }
        );
        
        // Creating a Layer object
        const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

        // Adding layer to the map
        map.addLayer(layer);


        async function getData(){
            let infoCOVID = await fetch('https://api.covid19api.com/summary');
            let infoCountries = await fetch('https://restcountries.eu/rest/v2/all');
            let resultCOVID = await infoCOVID.json();
            let resultCountries = await infoCountries.json();
            return { resultCOVID, resultCountries };
        }
        
        
        getData().then(result => {
            console.log(result);
            result.resultCOVID.Countries.forEach(element => {
                console.log('1');
                const country = result.resultCountries.find(item => item.alpha2Code === element.CountryCode);
                console.log(country);
          
                if (element.CountryCode === country.alpha2Code ) {
                    console.log(element.Country, element.CountryCode, country.latlng);
                    const circleCenter = country.latlng;
                    console.log(circleCenter);
                    const circleOptions = {
                        color: 'red',
                        fill: 'true',
                        fillColor: 'red',
                        fillOpacity: 0.5
                    };
                    const circleRadius = element.TotalConfirmed / 10;
                    console.log(element.TotalConfirmed);
                    console.log(circleRadius);
        
                    const circle = L.circle(circleCenter, circleRadius, circleOptions);
                    circle.bindPopup(`${element.Country}<br> TotalConfirmed: ${element.TotalConfirmed}`);
                    circle.addTo(map);
                    console.log('circle');
                }
            });
        })

        this.createLegend(map);
  
    }

    createLegend(map) {
       // const map = document.getElementById('map');
        const legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {
        
            let div = L.DomUtil.create('div', 'info legend'),
                grades = ['Total confirmed cases', '2'],
                labels = ["src/images/ballRed.png","src/images/ballRed.png"];
        
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    grades[i] + (" <img src="+ labels[i] +" height='20' width='20'>") +'<br>';
            }
        
            return div;
        };
        
        legend.addTo(map);

    }


}

export default Map;