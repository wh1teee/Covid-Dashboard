class DOMLinks {

  static getHTMLElements () {
    return {
      container: document.getElementById('container'),
      main: document.querySelector('main'),
      header: document.querySelector('header'),
      footer: document.querySelector('footer'),
      asideLeft: document.getElementById('aside-left'),
      asideRight: document.getElementById('aside-right'),
      map3: document.getElementById('map3'),
      map3Block: document.getElementById('map3__block'),
      map: document.getElementById('map'),
      controls: document.getElementById('controls'),
      mapControlPanel: document.getElementById('control__panel'),
      infoLegend: document.querySelector('.info.legend'),
      general: document.getElementById('general0'),
      globalCases: document.getElementById('global__cases'),
      lastUpdate: document.getElementById('last__update'),
      list: document.getElementById('list2'),
      table: document.getElementById('table1'),
      tablePanel: document.getElementById('table__panel'),
      tableControlPanel: document.getElementById('table__controlpanel'),
      tableInput: document.getElementById('table__input'),
      input: document.querySelector('input'),
      checkBox: document.getElementById('checkbox'),
      clear: document.getElementById('clear'),
      dataList: document.getElementById('countries'),
      closeButton1: document.getElementById('close__button-1'),
      statistic: document.querySelector('.statistic'),
      chart: document.getElementById('chart4'),
    };
  }
}

export default DOMLinks;
