import DOMLinks from './DOMLinks';

class General {

  static createGeneral (result) {
    const dom = DOMLinks.getHTMLElements();

    const tcc = result.resultCOVID.Global.TotalConfirmed;
    dom.globalCases.innerHTML = `<p>Global cases:</p>${tcc}`;

    const lastUpdate = result.resultCOVID.Date;
    dom.lastUpdate.innerHTML = `<p>Last update:</p>${new Date(lastUpdate).toLocaleString()}`;
  }
}

export default General;
