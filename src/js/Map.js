import L from 'leaflet';

class Map{

    constructor(x, y, zoom){
        this.x = x;
        this.y = y;
        this.zoom = zoom;
    }

    createMap(){
        const mapDiv = document.createElement('div');
        mapDiv.setAttribute('id','map');        
        document.querySelector('body').append(mapDiv);

        // Creating a map object
        const map = new L.Map('map').setView ([this.x, this.y], this.zoom);

        // Creating a Layer object
        const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

        // Adding layer to the map
        map.addLayer(layer);
    }

}

export default Map;