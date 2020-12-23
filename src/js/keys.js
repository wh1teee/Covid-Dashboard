import search from "./search";

const keys = [
    {
        small: '`',
        shift: '~',
        code: 'Backquote',
    },
    {
        small: '1',
        shift: '!',
        code: 'Digit1',
    },
    {
        small: '2',
        shift: '@',
        code: 'Digit2',
    },
    {
        small: '3',
        shift: '#',
        code: 'Digit3',
    },
    {
        small: '4',
        shift: '$',
        code: 'Digit4',
    },
    {
        small: '5',
        shift: '%',
        code: 'Digit5',
    },
    {
        small: '6',
        shift: '^',
        code: 'Digit6',
    },
    {
        small: '7',
        shift: '&',
        code: 'Digit7',
    },
    {
        small: '8',
        shift: '*',
        code: 'Digit8',
    },
    {
        small: '9',
        shift: '(',
        code: 'Digit9',
    },
    {
        small: '0',
        shift: ')',
        code: 'Digit0',
    },
    {
        small: '-',
        shift: '_',
        code: 'Minus',
    },
    {
        small: '=',
        shift: '+',
        code: 'Equal',
    },
    {
        small: 'Backspace',
        shift: null,
        code: 'Backspace',
    },
    // {
    //     small: 'Delete',
    //     shift: null,
    //     code: 'Delete',
    // },
    {
        small: 'Tab',
        shift: null,
        code: 'Tab',
    },
    {
        small: 'q',
        shift: 'Q',
        code: 'KeyQ',
    },
    {
        small: 'w',
        shift: 'W',
        code: 'KeyW',
    },
    {
        small: 'e',
        shift: 'E',
        code: 'KeyE',
    },
    {
        small: 'r',
        shift: 'R',
        code: 'KeyR',
    },
    {
        small: 't',
        shift: 'T',
        code: 'KeyT',
    },
    {
        small: 'y',
        shift: 'Y',
        code: 'KeyY',
    },
    {
        small: 'u',
        shift: 'U',
        code: 'KeyU',
    },
    {
        small: 'i',
        shift: 'I',
        code: 'KeyI',
    },
    {
        small: 'o',
        shift: 'O',
        code: 'KeyO',
    },
    {
        small: 'p',
        shift: 'P',
        code: 'KeyP',
    },
    {
        small: '[',
        shift: '{',
        code: 'BracketLeft',
    },
    {
        small: ']',
        shift: '}',
        code: 'BracketRight',
    },
    {
        small: 'Enter',
        shift: null,
        code: 'Enter',
    },
    {
        small: 'CapsLock',
        shift: null,
        code: 'CapsLock',
    },
    {
        small: 'a',
        shift: 'A',
        code: 'KeyA',
    },
    {
        small: 's',
        shift: 'S',
        code: 'KeyS',
    },
    {
        small: 'd',
        shift: 'D',
        code: 'KeyD',
    },
    {
        small: 'f',
        shift: 'F',
        code: 'KeyF',
    },
    {
        small: 'g',
        shift: 'G',
        code: 'KeyG',
    },
    {
        small: 'h',
        shift: 'H',
        code: 'KeyH',
    },
    {
        small: 'j',
        shift: 'J',
        code: 'KeyJ',
    },
    {
        small: 'k',
        shift: 'K',
        code: 'KeyK',
    },
    {
        small: 'l',
        shift: 'L',
        code: 'KeyL',
    },
    {
        small: ';',
        shift: ':',
        code: 'Semicolon',
    },
    {
        small: "'",
        shift: '"',
        code: 'Quote',
    },
    {
        small: '\\',
        shift: '|',
        code: 'Backslash',
    },
    {
        small: 'Shift',
        shift: null,
        code: 'ShiftLeft',
    },
    // {
    //     small: '<',
    //     shift: '>',
    //     code: 'IntlBackslash',
    // },
    {
        small: 'z',
        shift: 'Z',
        code: 'KeyZ',
    },
    {
        small: 'x',
        shift: 'X',
        code: 'KeyX',
    },
    {
        small: 'c',
        shift: 'C',
        code: 'KeyC',
    },
    {
        small: 'v',
        shift: 'V',
        code: 'KeyV',
    },
    {
        small: 'b',
        shift: 'B',
        code: 'KeyB',
    },
    {
        small: 'n',
        shift: 'N',
        code: 'KeyN',
    },
    {
        small: 'm',
        shift: 'M',
        code: 'KeyM',
    },
    {
        small: ',',
        shift: '<',
        code: 'Comma',
    },
    {
        small: '.',
        shift: '>',
        code: 'Period',
    },
    {
        small: '/',
        shift: '?',
        code: 'Slash',
    },
    {
        small: 'Shift',
        shift: null,
        code: 'ShiftRight',
    },
    {
        small: 'Ctrl',
        shift: null,
        code: 'ControlLeft',
    },
    {
        small: 'Alt',
        shift: null,
        code: 'AltLeft',
    },
    {
        small: 'Space',
        shift: null,
        code: 'Space',
    },
    {
        small: 'Alt',
        shift: null,
        code: 'AltRight',
    },
    {
        small: 'Ctrl',
        shift: null,
        code: 'ControlRight',
    },
    // {
    //     small: '&larr;',
    //     shift: null,
    //     code: 'ArrowLeft',
    // },
    // {
    //     small: '&uarr;',
    //     shift: null,
    //     code: 'ArrowUp',
    // },
    // {
    //     small: '&darr;',
    //     shift: null,
    //     code: 'ArrowDown',
    // },
    // {
    //     small: '&rarr;',
    //     shift: null,
    //     code: 'ArrowRight',
    // },
    {
        small: 'Listen',
        shift: null,
        code: 'Listen',
    },
    {
        small: 'Hide',
        shift: null,
        code: 'Hide',
    },
    {
        small: 'Sound',
        shift: null,
        code: 'Sound',
    },
];

let isCaps = false;

function listenKeyboard() {

    document.body.onkeydown = (e) => {
        const input = document.querySelector('.input');
        let cursorPos = input.selectionStart;
        const left = input.value.slice(0, cursorPos);
        const right = input.value.slice(cursorPos);
        input.focus()
        if (e.key === 'Alt' || e.key === 'Backspace' || e.key === 'Tab' || e.key === 'CapsLock' || e.key === 'Control' || e.key === 'Enter' || e.key === 'Space') {
            e.preventDefault()
            if (e.key === 'Backspace') {
                input.value = `${left.slice(0, -1)}${right}`;
                cursorPos -= 1;
            }
            if (e.key === 'Tab') {
                input.value = `${left}\t${right}`;
                cursorPos -= 1;
            }
            if (e.key === 'Space') {
                input.value = `${left} ${right}`;
                cursorPos += 1;
            }
            if (e.key === 'Enter') {
                input.value = `${left}\n${right}`;
                cursorPos += 1;
            }

        } else {
            input.value += e.key;
            e.preventDefault();

            const val = input.value.trim();
            const elasticItems = document.querySelectorAll('.stat__item');

            if (val !== '') {
                elasticItems.forEach(item => {
                    if (item.innerText.toLowerCase().search(val) === -1) {
                        item.classList.add('hide');
                    } else {
                        item.classList.remove('hide');
                    }
                })
            } else {
                elasticItems.forEach(item => item.classList.remove('hide'));
            }
        }

    }
    document.querySelector('.keyboard').onclick = (e) => {
        const input = document.querySelector('.input');
        let cursorPos = input.selectionStart;
        const left = input.value.slice(0, cursorPos);
        const right = input.value.slice(cursorPos);
        input.focus()
        if (e.target.className === 'key') {
            if (e.key === 'Alt' || e.key === 'Backspace' || e.key === 'Tab' || e.key === 'CapsLock' || e.key === 'Control' || e.key === 'Enter' || e.key === 'Space') {
                e.preventDefault()
                if (e.key === 'Backspace') {
                    input.value = `${left.slice(0, -1)}${right}`;
                    cursorPos -= 1;
                }
                if (e.key === 'Tab') {
                    input.value = `${left}\t${right}`;
                    cursorPos -= 1;
                }
                if (e.key === 'Space') {
                    input.value = `${left} ${right}`;
                    cursorPos += 1;
                }
                if (e.key === 'Enter') {
                    input.value = `${left}\n${right}`;
                    cursorPos += 1;
                }

            } else {
                const elasticItems = document.querySelectorAll('.stat__item');
                input.value += e.target.innerText;

                if (input.value !== '') {
                    elasticItems.forEach(item => {
                        if (item.innerText.toLowerCase().search(input.value.toLowerCase()) === -1) {
                            item.classList.add('hide');
                        } else {
                            item.classList.remove('hide');
                        }
                    })
                } else {
                    elasticItems.forEach(item => item.classList.remove('hide'));
                }
            }
        }
    }

    const caps = document.querySelector('.caps')
    caps.onclick = () => {
        caps.classList.toggle('active');
        const allKeys = document.querySelectorAll('.key');
        allKeys.forEach(item => {
            if (!caps.classList.value.includes('active') && !item.classList.value.match(/alt|backspace|tab|caps|enter|fn|win|space/)) {
                item.innerText = item.innerHTML.toUpperCase();
            } else if (!item.classList.value.match(/alt|backspace|tab|caps|enter|fn|win|space|ctrl|shift/)) {
                item.innerText = item.innerHTML.toLowerCase();
            }

        })
    }
}

document.body.insertAdjacentHTML('beforebegin', '<div class="keyboard"></div>')
export default function renderKeboard(size) {
    const keyboard = document.querySelector('.keyboard');
    keyboard.innerHTML = '';

    keys.forEach(key => {

        if (!key.small.match(/Shift|Alt|Backspace|Tab|Caps|Enter|Fn|Ctrl|Space|Listen|Hide|Sound/)) {
            keyboard.insertAdjacentHTML('beforeend', `
        <div class="key">${key[size]}</div>`)
        } else {
            keyboard.insertAdjacentHTML('beforeend', `
        <div class="key ${key.code}">${key.small}</div>`)
        }

    })
    listenCaps();
    keyboardListen();
}

function listenCaps() {

    document.querySelector('.CapsLock').onclick = () => {
        keysToCaps();
        isCaps = true;
    }
}

function keysToCaps() {
    if (document.querySelector('.CapsLock').classList.value.includes('active')) {
        renderKeboard('small');
        document.querySelector('.CapsLock').classList.remove('active');
        isCaps = false;
    } else {
        renderKeboard('shift');
        document.querySelector('.CapsLock').classList.add('active');
        isCaps = true;
    }
}

function keyboardListen() {

    document.body.onkeydown = (e) => {
        const input = document.querySelector('.input');
        e.preventDefault();
        const isFnKey = e.code.match(/Shift|Alt|Backspace|Tab|Caps|Enter|Fn|Control|Listen|Hide|Sound|Meta/);
        const allKeysDom = document.querySelectorAll('.key');
        if (!isFnKey) {

            input.focus()
            if (isCaps) {

                keys.forEach(key => {

                    if (key.small === e.key.toLowerCase()) {
                        input.value += key.shift;
                        find(e);
                    }
                    if (key.small === e.code) { // for space key
                        input.value += ' ';
                        find(e);
                    }
                })
            } else {
                keys.forEach(key => {
                    if (key.small === e.key.toLowerCase()) {
                        input.value += key.small;
                        find(e);
                    }
                    if (key.small === e.code) { // for space key
                        input.value += ' ';
                        find(e);
                    }
                })
            }

        }

        if (e.code === 'Tab') {
            input.value += `\t`;
            find(e);
        }

        if (e.code === 'CapsLock' || e.key === 'Shift') {
            keysToCaps();
            isCaps = true;
            e.preventDefault();
        }

        if (e.code === 'Backspace') {
            const temp = input.value.length === 1 ? '' : input.value.slice(0, -1);
            input.value = temp;
            find(e);
        }

        allKeysDom.forEach(keyDOM => {
            if (keyDOM.innerHTML.toLowerCase() === e.key.toLowerCase() ||(keyDOM.innerHTML === 'Ctrl' && e.key === 'Control')) {
                if (!keyDOM.classList.value.includes('active')) {
                   keyDOM.classList.toggle('active');
                }
            }
            if(keyDOM.innerHTML.toLowerCase() === e.code.toLowerCase() ) { // for space
                keyDOM.classList.toggle('active');
            }
        })
    }

    document.body.onkeyup = (e) => {
        const allKeysDom = document.querySelectorAll('.key');

        if (e.key === 'Shift') {
            keysToCaps();
            isCaps = false;
        }

        allKeysDom.forEach(keyDOM => {
            if (keyDOM.innerHTML.toLowerCase() === e.key.toLowerCase() && e.key !== 'CapsLock' || (keyDOM.innerHTML === 'Ctrl' && e.key === 'Control')) {
                keyDOM.classList.toggle('active');
            }
            if(keyDOM.innerHTML.toLowerCase() === e.code.toLowerCase()) { // for space
                keyDOM.classList.toggle('active');
            }
        })

    }

    document.querySelector('.keyboard').onclick = (e) => {

        const input = document.querySelector('.input');
        input.focus();
        if (!e.target.innerText.match(/Shift|Alt|Backspace|Tab|Caps|Enter|Fn|Control|Listen|Hide|Sound|Meta/)) {
            if (e.target.innerText === 'Space') {
                input.value += ' ';
                find(e);
            } else {
                input.value += e.target.innerText;
                find(e);
            }
        }

        if (e.target.innerText === 'Tab') {
            input.value += '\t';
            find(e);
        }
        if (e.target.innerText === 'Backspace') {
            const temp = input.value.length === 1 ? '' : input.value.slice(0, -1)
            input.value = temp;
            find(e);
        }
    }
}

function find(e) {
    const elasticItems = document.querySelectorAll('.stat__item');
    const input = document.querySelector('.input');

    search.blockOrUnblockButtons(input.value.length);

    if (input.value !== '') {
        elasticItems.forEach(item => {
            if (item.innerText.toLowerCase().search(input.value.toLowerCase()) === -1) {
                item.classList.add('hide');
            } else {
                item.classList.remove('hide');
            }
        })
    } else {
        elasticItems.forEach(item => item.classList.remove('hide'));
    }
}

export function showKeyboardListen() {
    const showKeyboardButton = document.querySelector('.keyboard__show');
    const keyboard = document.querySelector('.keyboard');

    showKeyboardButton.onclick = () => {
        keyboard.classList.toggle('show');
    }
}