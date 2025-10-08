let squareList = document.querySelectorAll('.square')
let btnClear = document.querySelector(`#btnClear`)
let boardNode = document.querySelector(`#board`)
let playerBlueCount = document.querySelector(`#playerBlue`)
let playerRedCount = document.querySelector(`#playerRed`)

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
    }

    checkWin()
}

//Reset the game
const handleClearBoard = () => {
    squareList.forEach((square) => {
        square.innerHTML = "",
        square.classList.remove('blue'),
        square.classList.remove('red')
    })
    
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]

    boardNode.classList.remove('disabled')
    btnClear.classList.remove('animation-pulse')
}

//Check if player win
const checkWin = () => {
    //horizontal
    if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][2] !== "" ||
        board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][2] !== "" ||
        board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][2] !== ""
    ) {
        console.log('win')
        boardNode.classList.add('disabled')
        btnClear.classList.add('animation-pulse')
        setCount()
    }
}

//Set wins count
const setCount = () => {
    if (currentPlayer) {
        playerBlueCount.textContent = Number(playerBlueCount.innerHTML) + 1
        
    } else if (!currentPlayer) {
        playerRedCount.textContent = Number(playerRedCount.innerHTML) + 1
    }
}

btnClear.addEventListener('click', handleClearBoard)

squareList.forEach((square) => {
    square.addEventListener('click', (e) => handleMakeMove(e.target))
})

