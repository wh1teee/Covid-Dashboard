import map from './Map';

export default function listenFullScreenButtons () {
  const fullScreenButtons = document.querySelectorAll('.full__screen__btn');

  fullScreenButtons.forEach(button => button.onclick = (event) => {
    changeConditionFullScreenBtn(event.target);
    event.target.offsetParent.parentElement.classList.toggle('full__screen');

    if (event.target.offsetParent.parentElement.id === 'map3') {
      document.getElementById('map').classList.toggle('wide');
      map.map.invalidateSize(true);
    }
  });
}

function changeConditionFullScreenBtn (fullScreenBtn) {
  if (fullScreenBtn.innerHTML === `fullscreen`) {
    fullScreenBtn.innerHTML = `fullscreen_exit`;
  } else {
    fullScreenBtn.innerHTML = `fullscreen`;
  }
}
