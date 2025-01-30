let title = document.querySelector('.title');
let turn = 'x';
let squares = [];
let X = 0;
let O = 0;
let gameOver = false;

function end(cell1, cell2, cell3) {
    document.getElementById("cell" + cell1).style.backgroundColor = "green";
    document.getElementById("cell" + cell2).style.backgroundColor = "green";
    document.getElementById("cell" + cell3).style.backgroundColor = "green";
    let winner = squares[cell1].innerHTML;
    title.innerHTML = `Player ${squares[cell1].innerHTML.toUpperCase()} Wins! 🎉`;
    gameOver = true; 
    if (winner == 'x') {
        X++;
    } else if (winner == 'o') {
        O++;
    }
    disableCells();
}

function updateScores() {
    document.getElementById("scoreX").innerText = `Player X Score: ${X}`;
    document.getElementById("scoreO").innerText = `Player O Score: ${O}`;
}

function winner() {
    for (let i = 1; i < 10; i++) {
        squares[i] = document.getElementById("cell" + i);
    }

    if (squares[1].innerHTML === squares[2].innerHTML && 
        squares[2].innerHTML === squares[3].innerHTML && 
        squares[1].innerHTML !== '') {
        end(1, 2, 3);
    } else if (squares[4].innerHTML === squares[5].innerHTML && 
               squares[5].innerHTML === squares[6].innerHTML && 
               squares[4].innerHTML !== '') {
        end(4, 5, 6);
    } else if (squares[7].innerHTML === squares[8].innerHTML && 
               squares[8].innerHTML === squares[9].innerHTML && 
               squares[7].innerHTML !== '') {
        end(7, 8, 9);
    } else if (squares[1].innerHTML === squares[4].innerHTML && 
               squares[4].innerHTML === squares[7].innerHTML && 
               squares[1].innerHTML !== '') {
        end(1, 4, 7);
    } else if (squares[2].innerHTML === squares[5].innerHTML && 
               squares[5].innerHTML === squares[8].innerHTML && 
               squares[2].innerHTML !== '') {
        end(2, 5, 8);
    } else if (squares[3].innerHTML === squares[6].innerHTML && 
               squares[6].innerHTML === squares[9].innerHTML && 
               squares[3].innerHTML !== '') {
        end(3, 6, 9);
    } else if (squares[1].innerHTML === squares[5].innerHTML && 
               squares[5].innerHTML === squares[9].innerHTML && 
               squares[1].innerHTML !== '') {
        end(1, 5, 9);
    } else if (squares[3].innerHTML === squares[5].innerHTML && 
               squares[5].innerHTML === squares[7].innerHTML && 
               squares[3].innerHTML !== '') {
        end(3, 5, 7);
    }

    let draw = true;
    for (let i = 1; i <= 9; i++) {
        if (squares[i].innerHTML === '') {
            draw = false;
            break;
        }
    }

    if (draw && !gameOver) {
        title.innerHTML = "It's a Draw! 🤝";
        gameOver = true;
        disableCells();
    }
}

function disableCells() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById("cell" + i).onclick = null;
    }
}

function AI_game() {
    title.innerHTML = 'Turn X';
    replay();
    for (let i = 1; i <= 9; i++) {
        let cell = document.getElementById("cell" + i);
        cell.onclick = function () { playerMove(this.id); };
    }
}

function playerMove(id) {
    if (gameOver) return; // Empêche le coup si le jeu est terminé
    let element = document.getElementById(id);
    if (turn === 'x' && element.innerHTML === '') {
        element.innerHTML = 'x';
        turn = 'o';
        title.innerHTML = 'Turn O';
        winner();
        updateScores();
        if (!gameOver) setTimeout(aiMove, 500);
    }
}

function aiMove() {
    if (gameOver) return; // Empêche le coup si le jeu est terminé
    let emptyCells = [];
    for (let i = 1; i <= 9; i++) {
        let cell = document.getElementById("cell" + i);
        if (cell.innerHTML === '') {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let aiChoice = emptyCells[randomIndex];
        document.getElementById("cell" + aiChoice).innerHTML = 'o';
        turn = 'x';
        title.innerHTML = 'Turn X';
        winner();
        updateScores();
    }
}

function game(id) {
    if (gameOver) return; // Empêche le coup si le jeu est terminé
    let element = document.getElementById(id);
    if (turn === 'x' && element.innerHTML === '') {
        element.innerHTML = 'x';
        turn = 'o';
        title.innerHTML = 'Turn O';
    } else if (turn === 'o' && element.innerHTML === '') {
        element.innerHTML = 'o';
        turn = 'x';
        title.innerHTML = 'Turn X';
    }
    winner();
    updateScores();
}

function replay() {
    for (let i = 1; i <= 9; i++) {
        let cell = document.getElementById("cell" + i);
        cell.innerHTML = ''; 
        cell.style.backgroundColor = "violet"; 
        cell.onclick = function () { game(this.id); }; 
    }
    title.innerHTML = 'Turn X';
    turn = 'x';
    gameOver = false; // Réinitialisation de l'état du jeu
}