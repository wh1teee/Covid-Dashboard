class Data {


    static async getData(){
        const infoCOVID = await fetch('https://api.covid19api.com/summary');
        const infoCountries = await fetch('https://restcountries.eu/rest/v2/all');
        const resultCOVID = await infoCOVID.json();
        const resultCountries = await infoCountries.json();
        return { resultCOVID, resultCountries };
    }
    
}

export default Data;