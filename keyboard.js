export default Keyboard = {
    nipper : "",

    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    alphabet: {
        
        russian_letters: [
            "`", "1", "2", "3","4","5","6","7","8","9","0","-","=","backspace",
            "tab", "й", "ц", "у","к","е","н","г","ш","щ","з","х","ъ","|","del",
            "caps", "ф", "ы", "в","а","п","р","о","л","д","ж","э","enter",
            "shift","я", "ч", "с","м","и","т","ь","б","ю","/","↑","shift",
            "ctrl", "win", "alt", "_","alt","←","↓","→","ctrl"
        ],
        english_letters: [
            "`", "1", "2", "3","4","5","6","7","8","9","0","-","=","backspace",
            "tab", "q", "w", "e","r","t","y","u","i","o","p","[","]","|","del",
            "caps", "a", "s", "d","f","g","h","j","k","l",";","'","enter",
            "shift","z", "x", "c","v","b","n","m",",",".","/","↑","shift",
            "ctrl", "win", "alt", "_","alt","←","↓","→","ctrl"
        ],
        eng: true,
    },


    eventHandlers: {
        oninput: null,
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        let body = document.querySelector('.body');
        body.innerHTML = `<h1 class="title">My Virtual Keyboard</h1>`;
        let wrapper = `<div class="wrapper">
            <textarea class="screen use-keyboard-input" autofocus></textarea>
            <div class = "description">
            <p>Keyboard for <b>Windows</b> operating system</p>
            <p>Switch language on click: <b>left ctrl</b></p>
            </div>
            </div>`;

        body.innerHTML += wrapper;
        
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },
 
    _createKeys() {
        const textarea = document.querySelector('.use-keyboard-input');

        const fragment = document.createDocumentFragment();
        const keys_push  = [
            "Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace",
            "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete",
            "caps", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter",
            "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight",
            "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"
        ];

        let i = 0;
        Keyboard.alphabet.english_letters.forEach(key => {
        const keyElement = document.createElement("button");
        const insertLineBreak = ["backspace", "del", "enter", "shiftR"].indexOf(key) !== -1;

        // Add attributes/classes
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key", `${key}`, `${keys_push[i]}`);

            switch (key) {
                case "backspace":
                    keyElement.classList.add("bcsp", "color", "specFont");
                    keyElement.innerHTML = "backspace";

                    keyElement.addEventListener("click", () => {
                        document.querySelector('.use-keyboard-input').focus();

                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                 case "del":
                    keyElement.classList.add("tab_del", "color", "specFont");
                    keyElement.innerHTML = "del";

                    keyElement.addEventListener("click", () => {

                        this.properties.value = this.properties.value.substring(1, this.properties.value.length);
                        this._triggerEvent("oninput");
                        textarea.focus();

                    });
    
                    break;

                case "tab":
                    keyElement.classList.add( "tab_del","color",  "specFont");
                    keyElement.innerHTML = "tab";
        
                    keyElement.addEventListener("click", () => {
                        textarea.focus();

                        this.properties.value += "   ";
                        this._triggerEvent("oninput");
                    });
        
                    break;

                case "caps":
                    keyElement.classList.add("caps", "caps_enter", "keyboard__key--activatable", "color",  "specFont");
                    keyElement.innerHTML = "caps";

                    keyElement.addEventListener("click", () => {
                        textarea.focus();

                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("caps_enter", "color", "specFont");
                    keyElement.innerHTML = "enter";

                    keyElement.addEventListener("click", () => {
                        textarea.focus();

                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "shift":
                    keyElement.classList.add("shift", "color", "specFont");
                    keyElement.innerHTML = "shift";

                    keyElement.addEventListener("click", () => {
                        textarea.focus();                     
                       
                        this._triggerEvent("oninput");
                    });
    
                    break;
 
                   

                case "_":
                    keyElement.classList.add("space");
                    keyElement.innerHTML = "_";

                    keyElement.addEventListener("click", () => {
                        textarea.focus();
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "alt":
                    keyElement.classList.add("color","specFont");
                    keyElement.innerHTML = "alt";
    
                    keyElement.addEventListener("click", () => {
                        textarea.focus();
                        this.properties.value += "";
                        this._triggerEvent("oninput");
                    });
    
                    break;

                 case "win":
                    keyElement.classList.add("color", "specFont");
                    keyElement.innerHTML = "win";
                    
                    keyElement.addEventListener("click", () => {
                        textarea.focus();
                        this.properties.value += "";
                        this._triggerEvent("oninput");
                    });
        
                    break;

                case "↑":
                    keyElement.classList.add("keyboard__key", "color");
                    keyElement.innerHTML = "↑";

                    keyElement.addEventListener("click", () => {      
                        textarea.focus();
                       this.properties.value += "↑";
                       this._triggerEvent("oninput");
                    });
                        
                    break;

                case "←":
                    keyElement.classList.add("keyboard__key", "color");
                    keyElement.innerHTML = "←";
    
                    keyElement.addEventListener("click", () => {
                        textarea.focus();
                        this.properties.value += "←";
                        this._triggerEvent("oninput");
                    });
                            
        
                     break;

                case "↓":
                    keyElement.classList.add("keyboard__key", "color");
                    keyElement.innerHTML = "↓";
        
                    keyElement.addEventListener("click", () => {
                        textarea.focus();
                        this.properties.value += "↓";
                        this._triggerEvent("oninput");
                    });
                                
                    break;

                case "→":
                    keyElement.classList.add("keyboard__key", "color");
                    keyElement.innerHTML = "→";
            
                    keyElement.addEventListener("click", () => {
                        textarea.focus();
                        this.properties.value += "→";
                        this._triggerEvent("oninput");
                    });
                                    
                    break;

                case "ctrl":
                    keyElement.classList.add("ctrl","color", "specFont");
                    keyElement.innerHTML = "ctrl";
                    
                    keyElement.addEventListener("click", () => {
                        textarea.focus();

                        for (let j = 0; j < Keyboard.alphabet.english_letters.length; j++) {
                            if (Keyboard.alphabet.eng) {
                                document.querySelectorAll('.keyboard__key').forEach(key => {
                                    key.innerHTML = Keyboard.alphabet.russian_letters[j];
                                        j++; });
                                    Keyboard.alphabet.eng = false;

                                    
                            }else{
                               document.querySelectorAll('.keyboard__key').forEach(key => {
                                    key.innerHTML = Keyboard.alphabet.english_letters[j];
                                        j++;
                                });
                                Keyboard.alphabet.eng = true;

                            }

                        }
                        
                        this._triggerEvent("oninput");
                    });
                    
                    break;
                    
  
                default:
                    keyElement.classList.add("default");
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        if (key >= 0 && key <= 9 || key === '`' || key === '=' || key === '-' || key === '[' || key === ']' || key === '|' || key === ';' || key === "'" || key === "," || key === "." || key === "/") {
                            textarea.value += key;
                            this.properties.value = textarea.value;
                            textarea.focus();

                        }else
                        textarea.value += this.properties.capsLock ? document.querySelector(`.${key}`).innerHTML.toUpperCase() : document.querySelector(`.${key}`).innerHTML.toLowerCase()
                        this.properties.value = textarea.value
                        this._triggerEvent("oninput");
                        textarea.focus();

                    });
                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
            i++;
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock && key.textContent !== 'tab' && key.textContent !== 'shift' && key.textContent !== 'del' && key.textContent !== 'backspace' && key.textContent !== 'caps' && key.textContent !== '_' && key.textContent !== 'enter' && key.textContent !== 'alt' && key.textContent !== 'ctrl' && key.textContent !== 'win' ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
       
    },
    
};