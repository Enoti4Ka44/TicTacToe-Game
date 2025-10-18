let squareList = document.querySelectorAll('.square')
let boardNode = document.querySelector(`#board`)
let playerBlueCount = document.querySelector(`#playerBlue`)
let playerRedCount = document.querySelector(`#playerRed`)
let currentPlayerNode = document.querySelector(`#player`)
let winner = document.querySelector(`#player-winner`)
let modalOverlay = document.querySelector(`.overlay`)
let subtitleNode = document.querySelector(`.subtitle`)

let btnClear = document.querySelector(`#btnClear`)
let btnNewGame = document.querySelector(`#btnNewGame`)
let btnCloseModal = document.querySelector(`#close-btn`)

let currentPlayer = true;
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
]

//Switch players
const checkPlayer = () => {
    return currentPlayer ? "red" : 'blue'
}

const switchPlayers = () => {
    let classes = currentPlayerNode.classList

    currentPlayer = !currentPlayer
    currentPlayerNode.innerHTML = checkPlayer()
    classes.replace(classes[0], checkPlayer())
    console.log(currentPlayerNode)
}

//Make move
const handleMakeMove = (e) => {
    const [row, col] = e.id

    if (board[row][col] === "") {
        if (currentPlayer) {
            board[row][col] = 'x'
            e.classList += ' red'
            e.innerHTML = 'X'
            
        } else {
            board[row][col] = 'o'
            e.classList += ' blue'
            e.innerHTML = 'O'
        }
        checkWin()
        switchPlayers();
    }

    
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
    modalOverlay.classList.add('display-none')
    winner.classList = ""
}

//Check if player win
const checkWin = () => {
        //horizontal
    if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][2] !== "" ||
        board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][2] !== "" ||
        board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][2] !== "" ||
        //vartical
        board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[1][0] !== "" ||
        board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[1][1] !== "" ||
        board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[1][2] !== "" ||
        //diagonal
        board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] !== "" ||
        board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] !== "" )
    {
        boardNode.classList.add('disabled')
        btnClear.classList.add('animation-pulse')


        winner.innerHTML = checkPlayer().toUpperCase()
        winner.classList.add(checkPlayer())
        setCount()
        setTimeout(handleModal, 400)

    }
}

//Open/Close modal
const handleModal = () => {
    modalOverlay.classList.toggle('active')
}

//Set wins count
const setCount = () => {
    if (currentPlayer) {
        playerBlueCount.textContent = Number(playerBlueCount.innerHTML) + 1
        
    } else if (!currentPlayer) {
        playerRedCount.textContent = Number(playerRedCount.innerHTML) + 1
    }
}

//Start a new game
const handleNewGame = () => {
        playerBlueCount.textContent = 0
        playerRedCount.textContent = 0

        handleClearBoard()
}

btnClear.addEventListener('click', handleClearBoard)
btnNewGame.addEventListener('click', handleNewGame)
btnCloseModal.addEventListener('click', handleModal)

squareList.forEach((square) => {
    square.addEventListener('click', (e) => handleMakeMove(e.target))
})

