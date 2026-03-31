localStorage.clear();
const page = document.body.getAttribute('data-page');
var game_over = false
var current_user = null;
if (page === 'game') {
    var streak = localStorage.getItem('streak');
    if (streak === null) {
        document.getElementById('streak').textContent = 0;
    } else {
        document.getElementById('streak').textContent = streak;
    }
    var attempt =1
    var list = allwords;

    list = list.split('\n');
    list.forEach((word, index) => {
        list[index] = word.trim();
    });


    var list2 = newwords;
    list2 = list2.split('\n');
    list2.forEach((word, index) => {
        list2[index] = word.trim();
    });

    const correct = list[Math.floor(Math.random() * list.length)];

    console.log(correct)

    document.querySelectorAll('.replay')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit2')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit3')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit4')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit5')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit6')[0].style.visibility = "hidden"

    var boxes = document.querySelectorAll('.try1');
        boxes.forEach((box, index) => {
                box.disabled = false;
                box.addEventListener('input', (e) => {
                    if (box.value.length === 1 && index < boxes.length - 1) {
                        boxes[index + 1].focus(); 
                    }
                });

            
                box.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && box.value.length === 0 && index > 0) {
                        boxes[index - 1].focus(); 
                        prevBox.setSelectionRange(prevBox.value.length, prevBox.value.length);
                    }
                });
            });

        



    
    
        ['try1', 'try2', 'try3', 'try4', 'try5', 'try6'].forEach(formID => {
            const formElement = document.getElementById(formID);
            formElement.addEventListener('submit', (e) => {
                if (!game_over){
                    e.preventDefault();
                    var guess = '';
                    boxes.forEach(box => {
                        guess += box.value.toLowerCase();
                    });
                    if (!list2.includes(guess)){ 
                        alert("Invalid word. Please try again.");
                        boxes.forEach(box => {
                            box.value = '';
                        });
                        boxes[0].focus();

                        return;
                    }
                    check(guess);
                    console.log(guess, attempt);
                    
                    if (attempt<6){
                        
                        attempt++;
                        boxes.forEach((box, index) => {
                            box.disabled =true;
                        });

                        if (attempt == 2){
                            boxes = document.querySelectorAll('.try2');
                            document.querySelectorAll('.submit2')[0].style.visibility = "visible"
                            document.querySelectorAll('.submit1')[0].style.visibility = "hidden"
                        }
                        else if (attempt == 3){
                            boxes = document.querySelectorAll('.try3');
                            document.querySelectorAll('.submit2')[0].style.visibility = "hidden"
                            document.querySelectorAll('.submit3')[0].style.visibility = "visible"
                        }
                        else if (attempt == 4){
                            boxes = document.querySelectorAll('.try4');
                            document.querySelectorAll('.submit3')[0].style.visibility = "hidden"
                            document.querySelectorAll('.submit4')[0].style.visibility = "visible"

                        }
                        else if (attempt == 5) {
                            boxes = document.querySelectorAll('.try5');
                            document.querySelectorAll('.submit4')[0].style.visibility = "hidden"
                            document.querySelectorAll('.submit5')[0].style.visibility = "visible"
                        }
                        else if (attempt == 6) {
                            boxes = document.querySelectorAll('.try6');
                            document.querySelectorAll('.submit5')[0].style.visibility = "hidden"
                            document.querySelectorAll('.submit6')[0].style.visibility = "visible"
                        }

                        boxes.forEach((box, index) => {
                            box.disabled = false;
                            boxes[0].focus();
                            box.addEventListener('input', (e) => {
                                if (box.value.length === 1 && index < boxes.length - 1) {
                                    boxes[index + 1].focus(); 
                                }
                            });

                        
                            box.addEventListener('keydown', (e) => {
                                if (e.key === 'Backspace' && box.value.length === 0 && index > 0) {
                                    boxes[index - 1].focus(); 
                                    prevBox.setSelectionRange(prevBox.value.length, prevBox.value.length);
                            }
                        });
                    });
                }}
            });
        });
    


    function check(guess){
        console.log(guess);
        var greens =[]
        var result = [];
        for (let i = 0; i < 5; i++){
            console.log("guess[i]:", guess[i], "correct[i]:", correct[i]);
            if (guess[i] == correct[i]){
                result.push('green');
                greens.push(guess[i]);
            }
        
            else if ((!correct.includes(guess[i])) || (count(guess[i], guess) > count(guess[i], correct) )){
                result.push('red');
            }
            else {
                result.push('yellow');
            }
        }
        console.log(result);
        for (let j = 0; j < 5; j++){
            if (result[j] == 'green'){
                boxes[j].style.backgroundColor = '#67BF5A';
            }
            else if (result[j] == 'yellow'){
                boxes[j].style.backgroundColor = '#F2C12E';
            }
            else {
                boxes[j].style.backgroundColor = '#D97762';
            }
        }
        if (guess == correct){
            alert("you won in " + attempt + " attempts!");
            winfunc()
            



        }
        else if (attempt == 6){
            alert("you ran out of attempts! The correct word was: " + correct);
            lossfunc()
        }   
    }

    function count(letter, word){
        return word.split(letter).length - 1;
    }

    const replay = document.getElementById('replay');
    replay.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'game.html';
    });
}
else if (page == 'home') {
    const login = document.getElementById('loginform');
    login.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const storedUserRaw = localStorage.getItem(username);
        const storedUser = JSON.parse(storedUserRaw);

        if (storedUser) {
            if (storedUser.password === password) {
                alert('login successful')
                window.location.href = 'game.html';
                localStorage.setItem(username, JSON.stringify({password: storedUser.password, streak: storedUser.streak, logged_in: 1}));
                localStorage.setItem('current_user', username);
            } else {
                alert('incorrect password. try again');
            }
        } else {
            const newuser = {
                password: password,
                streak: 0,
                logged_in:1       
            };
            localStorage.setItem(username, JSON.stringify(newuser));
            localStorage.setItem('current_user', username);
            alert("new account created");
            window.location.href = 'game.html';
        }
    });
}

function winfunc(){
    `const storedUserRaw = localStorage.getItem('current_user');
    const storedUser = JSON.parse(storedUserRaw);
    current_user= storedUser.key
    var streak = storedUser.streak;
    if (streak == null) {
        localStorage.setItem(current_user, JSON.stringify({password: storedUser.password, streak: 1, logged_in: 1}));
    } else {
        localStorage.setItem(current_user, JSON.stringify({password: storedUser.password, streak: parseInt(streak) + 1, logged_in: 1}));
    }`
    game_over = true;
    attempt=7;
    boxes.forEach((box) => {
        box.disabled = true;
        });
    document.querySelectorAll('.replay')[0].style.visibility = "visible"
    document.querySelectorAll('.submit1')[0].style.visibility = "hidden" 
    document.querySelectorAll('.submit2')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit3')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit4')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit5')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit6')[0].style.visibility = "hidden"}

function lossfunc(){
    `const storedUserRaw = localStorage.getItem('current_user');
    const storedUser = JSON.parse(storedUserRaw);
    current_user= storedUser.key
    localStorage.setItem(current_user, JSON.stringify({password: storedUser.password, streak: 0, logged_in: 1}));
    game_over = true;
    attempt=7;`
    boxes.forEach((box, index) => {
        box.disabled = true;
        });
    document.querySelectorAll('.replay')[0].style.visibility = "visible"
    document.querySelectorAll('.submit1')[0].style.visibility = "hidden" 
    document.querySelectorAll('.submit2')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit3')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit4')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit5')[0].style.visibility = "hidden"
    document.querySelectorAll('.submit6')[0].style.visibility = "hidden"}

