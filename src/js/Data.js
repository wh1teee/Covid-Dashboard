// import { Class } from "leaflet";

class Data {

    static getAPIData() {

        fetch('https://api.covid19api.com/summary')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });

    }

    


}

export default Data;