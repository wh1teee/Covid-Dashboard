// import Countries from './Countries';

// let obj = [];
let countriesData = {};

class Data {


    static getCountriesData() {
        fetch('https://restcountries.eu/rest/v2/all')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            countriesData = data;

            this.getAPIData();
        });
    }

   static getAPIData() {
     //   const datas = await fetch('https://api.covid19api.com/summary');
        fetch('https://api.covid19api.com/summary')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
          //  console.log(data);
            console.log(data.Countries);
            this.obj = data.Countries;
          
            this.obj.map(element => {
              const el = element;
              const [latitude, longitude]  = this.findCountry(element.CountryCode);
              el.Latitude = latitude;
              el.Longitude = longitude;
              console.log(element.Country, el.Latitude, el.Longitude);
            });
            console.log(this.obj);
            return this.obj;
        });
    }
 

    static findCountry(countryCode) {
        let ifFind = false;
        let latlng = [];
        for (let i = 0; i < countriesData.length; i += 1) {
            const array = countriesData[i];
            if (countryCode === countriesData[i].alpha2Code){
                latlng = array.latlng;
                ifFind = true;
                break;
            }
            if (ifFind) break;
        }     
        return latlng;   
    }

    
}

export default Data;