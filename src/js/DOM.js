export default function createDOM () {

  document.body.innerHTML = `
<div class="covid__page">
    <header>
        <img src='/src/images/favicon1.ico' alt="favicon">
        <h1>COVID-19 Dashboard</h1>
    </header>
 
    <main class="main">
        <section id='aside-left'>
            <div id='general0'>
                <div id='global__cases'></div>
                <div id='last__update'></div>
            </div>
            <div id='list2' class='table'>
                <span class="material-icons full__screen__btn">fullscreen</span>
            </div>
        </section>

        <section id='map3'>        
            <div id='map3__block'>
                <span class="material-icons full__screen__btn">fullscreen</span>
            </div>        
        </section>

        <section id='aside-right'>
            <div id='table1'>
                <div class="table1__block">
                    <span class="material-icons full__screen__btn">fullscreen</span>
                    <div id='table__panel'></div>
                    <div id='table__controlpanel'></div>
                    <label><input type='checkbox' id='checkbox'>Show country info</label>
                    <button id='clear' title='Clear country info'>Clear</button>
                </div>
            </div>
            <div id='chart4'>
                <div class="chart_div">
                    <span class="material-icons full__screen__btn">fullscreen</span>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <img class="rsschool__logo" src="src/images/rs_school_js.svg" alt="RSSchool logo">
        <a href="https://rs.school/js/">JavaScript</a>
        <span>2020</span>
        <div>
            <a class="gh gh__link" href="https://github.com/mariariazanova">Maria Riazanova</a>
            <a class="gh" href="https://github.com/wh1teee">Kanstantsin Piatrouski</a>
            <a class="gh" href="https://github.com/kohan123">Danila Kohan</a>
        </div>
    </footer>
</div>`;
}
