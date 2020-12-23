import DOMLinks from './DOMLinks';

class General {

    static createGeneral(result) {
        const dom = DOMLinks.getHTMLElements(); 
        
        const tcc = result.resultCOVID.Global.TotalConfirmed;
        dom.general.innerHTML = `<p>Global cases</p>${tcc}`;
    }    
}

export default General;