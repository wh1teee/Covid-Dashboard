// import DOMLinks from './DOMLinks';

class CloseButton {

    static createCloseButton(id, place) {
       // const dom = DOMLinks.getHTMLElements(); 
        
        const button = document.createElement('button');
        button.classList.add('close__button');
        button.setAttribute('id', `close__button${id}`);
        button.innerHTML = '↗';
        place.append(button);
    
    }    
}

export default CloseButton;