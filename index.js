
    import Keyboard from './keyboard.js';
    
       
    document.addEventListener('keydown', (e) => {
        if (e.code === "ControlLeft") {
            Keyboard.nipper = "ctrl";
            let j = 0;
            if (Keyboard.alphabet.eng) {
                document.querySelectorAll('.keyboard__key').forEach(key => {
                    key.innerHTML = Keyboard.alphabet.russian_letters[j];
                    j++;
                });
                Keyboard.alphabet.eng = false;
            } else {
                document.querySelectorAll('.keyboard__key').forEach(key => {
                    key.innerHTML = Keyboard.alphabet.english_letters[j];
                    j++;
                });
                Keyboard.alphabet.eng = true;
                }
        }else if(e.code === "CapsLock"){
            Keyboard.nipper = "caps";
                if (Keyboard.properties.capsLock) {
                    document.querySelector('.caps').classList.remove("keyboard__key--active");
    
                    document.querySelectorAll('.keyboard__key').forEach(key => {
                        key.innerHTML = key.innerHTML.toLowerCase();
                    });
                    Keyboard.properties.capsLock = false;
                }else {
                        document.querySelector('.caps').classList.add("keyboard__key--active");
        
                        document.querySelectorAll('.keyboard__key').forEach(key => {
                            if (key.innerHTML !== 'backspace' && key.innerHTML !== 'caps' && key.innerHTML !== 'space' && key.innerHTML !== 'enter' && key.innerHTML !== 'alt' && key.innerHTML !== 'ctrl' && key.innerHTML !== 'win' && key.innerHTML !== 'shift' && key.innerHTML !== 'tab' && key.innerHTML !== 'del') {
                                key.innerHTML = key.innerHTML.toUpperCase();
                            }
                        });
                        Keyboard.properties.capsLock = true;
                    }
        } else {
                Keyboard.nipper = e.code;
                
            }
            document.querySelector(`.${Keyboard.nipper}`).classList.add('keyboard__key--dark');
            
        }
            
        );
    
    
    document.addEventListener('keyup', (e) => {
    document.querySelectorAll('.keyboard__key').forEach(key => {
        key.classList.remove('keyboard__key--dark')
    
        });            
        console.log(Keyboard.nipper);
    
    });
    



    window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
    });
