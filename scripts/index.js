let squareList = document.querySelectorAll('.square')
let btnReset = document.querySelector(`#btnReset`)

let currentPlayer = true;
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
]

//Switch players
const switchPlayers = () => {
    currentPlayer = !currentPlayer
}

//Make move
const handleMakeMove = (e) => {
    const rowBoard = e.id[0]
    const colBoard = e.id[1]

    if (board[rowBoard][colBoard] === "") {
        if (currentPlayer) {
            board[rowBoard][colBoard] = 'x'
            e.classList += ' red'
            e.innerHTML = 'X'
            
        } else {
            board[rowBoard][colBoard] = 'o'
            e.classList += ' blue'
            e.innerHTML = 'O'
        }

        switchPlayers();

        console.log(board, rowBoard, colBoard)
    }
    
}

squareList.forEach((square) => {
    square.addEventListener('click', (e) => handleMakeMove(e.target))
})

