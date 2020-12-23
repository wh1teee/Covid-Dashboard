
export default function generateLayout() {

document.body.innerHTML = `
<header>
    <img src='/src/images/favicon1.ico' alt="favicon">
    <h1>COVID-19 Dashboard</h1>
 </header>
 
<main class="main">
        <section id='aside-left'>
          <div id='window0'></div>
          <div id='list2' class="table">
          <button class="full__screen__btn"></button>
         </div>
        </section>
        
        <section id="map"></section>
        
        <section id='aside-right'>
          <div id='table1'>
            <div id='table__panel'></div>
            <div id='table__controlpanel'></div>
            <input type='checkbox' id='checkbox'>Show country info</input>
            <button id='clear' title='Clear country name'>Clear</button>
            <div id='table__input'></div>
          </div>
          
          <div id='chart4'></div>
        </section>
</main>

<footer></footer>`
}

