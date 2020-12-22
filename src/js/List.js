import DOMLinks from './DOMLinks';
import Map from './Map';

class List {

    createList() {
        const dom = DOMLinks.getHTMLElements();

        const inner = this.getData(1);
        console.log(inner);
        dom.window.innerHTML = `${inner}`;

    }

    getData(mode) {  
        const dom = DOMLinks.getHTMLElements(); 

        async function getData(mode){
            let infoCOVID = await fetch('https://api.covid19api.com/summary');
            let infoCountries = await fetch('https://restcountries.eu/rest/v2/all');
            let resultCOVID = await infoCOVID.json();
            let resultCountries = await infoCountries.json();
            return { resultCOVID, resultCountries };
        }

        getData(mode).then(result => {
            const dom = DOMLinks.getHTMLElements(); 

            console.log(result);
            const tcc = result.resultCOVID.Global.TotalConfirmed;
           // console.log(tcc);
           

            dom.window.innerHTML = `<p>Global cases</p>${tcc}`;

        });
  
        
    }    

}

const list = new List();

export default list;
