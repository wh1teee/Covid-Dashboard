class Data {

  static async getData () {
    const allDataForChart = await fetch(
      'https://disease.sh/v3/covid-19/historical/all?lastdays=100000',
    );
    const allDataForChartCountries = await fetch(
      'https://disease.sh/v3/covid-19/historical?lastdays=100000',
    );
    const infoCOVID = await fetch('https://api.covid19api.com/summary');
    const infoCountries = await fetch('https://restcountries.eu/rest/v2/all');
    const resultCOVID = await infoCOVID.json();
    const resultCountries = await infoCountries.json();
    const allDataForChartJSON = await allDataForChart.json();
    const allDataForChartCountriesJSON = await allDataForChartCountries.json();

    return {
      resultCOVID,
      resultCountries,
      allDataForChart: allDataForChartJSON,
      allDataForChartCountries: allDataForChartCountriesJSON,
    };
  }
}

export default Data;
