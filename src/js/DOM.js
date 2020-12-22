class DOM {
    
    createDOM() {
      //  const dom = DOM.getHTMLElements();

        const container = document.createElement('div');
        container.setAttribute('id','container');
        container.innerHTML = ` <header>
                                    <img src='/src/images/favicon1.ico'>
                                    <h1>COVID-19 Dashboard</h1>
                                </header>
                                <main>
                                  <section id='aside-left'>
                                      <div id='general0'></div>
                                      <div id='list2'></div>
                                  </section>
                                  <section id='map3'></section>
                                  <section id='aside-right'>
                                      <div id='table1'>
                                          <div id='table__panel'></div>
                                          <div id='table__controlpanel'></div>
                                          <input type='checkbox' id='checkbox'>Show country info</input>
                                          <button id='clear' title='Clear country name'>Clear</button>
                                          <div id='table__input'></div>
                                      </div>
                                      <div id='chart4'>
                                      </div>
                                  </section>
                                </main>
                                <footer></footer>`;
        document.body.append(container);
    }
}

const dom = new DOM();

export default dom;