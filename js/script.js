//creation of 9 boxes
for (let i = 0; i < 9; i++) {
    let boxes = document.createElement("div");
    boxes.classList.add("b" + i);
    boxes.classList.add("box");
    boxes.setAttribute("name", "box" + i);
    document.body.appendChild(boxes);
}
//creation of 9 boxes

//declarations
const symbol = document.querySelectorAll(".symbol");
const chsSymbol = document.querySelector(".chsSymbol");
const box = document.querySelectorAll(".box");
const undo = document.querySelector("#undo");
let player = 1;
const history = [];
let tmpSymbol = '';
let selectedData = [];
let boxPos = [];
let count = 0;
let history2 = [];
let temp = [];
let winnerBoxColor = '';
let winName = '';
//declarations

//select symbol
symbol.forEach((e) => {
    e.addEventListener("click", () => {
        selectedData.length = 0; // emptying the array
        selectedData.push({
            'symbol': e.innerHTML
        }); // ToDo: add selectedData
        selectedData.push({
            'player': 'Player ' + player + ' turn'
        });
        chsSymbol.innerHTML = selectedData[1]['player']; // player 1 or 2 turns
        tmpSymbol = selectedData[0]['symbol'];
    });
});
//select symbol

//click event on boxes or divs
box.forEach((e) => {
    e.addEventListener("click", () => {
        if (selectedData.length > 0) {
            if (history.length < 1) { // if history is empty then first addition is document
                pushingDetails(clckdBoxClass = e.getAttribute("class"), clckdBoxNo = e); // passing clicked box reference
            } else if (duplicacy(e.getAttribute("class"))) { // called duplicacy checking function
                pushingDetails(clckdBoxClass = e.getAttribute("class"), clckdBoxNo = e); // passing clicked box reference
            }
        } else {
            alert("First choose symbol");
        }
    });
});
//click event on boxex or divs

//inserting values in history array
function pushingDetails(klass, boxNo) {
    if (boxNo.getAttribute("data-disabled") !== 'true') { // prevent duplicate entry
        history.push({
            'className': klass,
            'symbol': tmpSymbol, // lastVal === history[history.length-1]
        });

        boxNo.innerHTML = history[history.length - 1]['symbol'];

        tmpSymbol = tmpSymbol === "X" ? "O" : "X"; // change box symbol from o to x and vice versa on box click
        chsSymbol.innerHTML = chsSymbol.innerHTML === 'Player 1 turn' ? 'Player 2 turn' : 'Player 1 turn';
    }
    if (history.length > 4) {
        checkToWin(); // here I can use promises concept to display the result
    }
}
//inserting values in history array

//duplicacy in history checking
function duplicacy(clsName) {
    let exist = true;
    history.forEach((e) => {
        if (e.className === clsName) {
            exist = false;
        }
    });
    return exist;
}
//duplicacy in history checking

//undo functionality
undo.addEventListener("click", () => {
    if (history.length > 0) {
        chsSymbol.innerHTML = chsSymbol.innerHTML === 'Player 1 turn' ? 'Player 2 turn' : 'Player 1 turn';
        let elem = history[history.length - 1]['className'];
        tmpSymbol = history[history.length - 1]['symbol'];
        elem = elem.split(' ')[0].split('')[1];
        box[elem].innerHTML = ""; // it will empty the last box innerHTML to ""
        box[elem].setAttribute('data-disabled', 'false');
        // box[elem].style.backgroundColor = "white";
        history.pop(); // it will delete the last details in history array
        // if (box[elem].style.backgroundColor == 'green') {
        //     box[elem].style.backgroundColor == 'white';
        // }
    }

    box.forEach((e) => {
        e.style.backgroundColor = 'white';
        if (e.innerHTML === '') {
            e.setAttribute('data-disabled', 'false');
        }
    })
});
//undo functionality

//check whether player wins

function checkToWin() {
    if (box[0].innerHTML === box[1].innerHTML && box[0].innerHTML === box[2].innerHTML && box[0].innerHTML.length != 0) {
        wins(0, 1, 2);
    } else if (box[3].innerHTML === box[4].innerHTML && box[3].innerHTML === box[5].innerHTML && box[3].innerHTML.length != 0) {
        wins(3, 4, 5);
    } else if (box[6].innerHTML === box[7].innerHTML && box[6].innerHTML === box[8].innerHTML && box[6].innerHTML.length != 0) {
        wins(6, 7, 8);
    } else if (box[0].innerHTML === box[3].innerHTML && box[0].innerHTML === box[6].innerHTML && box[0].innerHTML.length != 0) {
        wins(0, 3, 6);
    } else if (box[1].innerHTML === box[4].innerHTML && box[1].innerHTML === box[7].innerHTML && box[1].innerHTML.length != 0) {
        wins(1, 4, 7);
    } else if (box[2].innerHTML === box[5].innerHTML && box[2].innerHTML === box[8].innerHTML && box[2].innerHTML.length != 0) {
        wins(2, 5, 8);
    } else if (box[0].innerHTML === box[4].innerHTML && box[0].innerHTML === box[8].innerHTML && box[0].innerHTML.length != 0) {
        wins(0, 4, 8);
    } else if (box[2].innerHTML === box[4].innerHTML && box[2].innerHTML === box[6].innerHTML && box[2].innerHTML.length != 0) {
        wins(2, 4, 6);
    }
}


function wins(b1, b2, b3) {
    box[b1].style.backgroundColor = "green";
    box[b2].style.backgroundColor = "green";
    box[b3].style.backgroundColor = "green";
    winnerBoxColor[0] = b1;
    winnerBoxColor[1] = b2;
    winnerBoxColor[2] = b3;
    box.forEach(function (e) {
        e.setAttribute("data-disabled", "true");
    });
    if(chsSymbol.innerHTML === "Player 1 turn") {
        chsSymbol.innerHTML = "Player 2 wins";
    } else {
        chsSymbol.innerHTML = "Player 1 wins";
    }
}

document.getElementById('clear').addEventListener("click", () => {
    window.location.href = window.location;
});