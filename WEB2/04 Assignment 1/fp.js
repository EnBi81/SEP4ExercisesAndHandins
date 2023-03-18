/*

 Note for this part:
 I started out this assignment with the object-oriented programming, and I wrote a lot of comments there, so
 you might want to start at that part. This code is a rework of the oop code in a functional programming style,
 where the objects are used only for storing data, and there are functions which are working with these objects.

 I also wanted to create a lot of pure functions, especially in the part, unfortunately I had to implement events
 as well, so now most of the functions are not pure, but they are very close to it.

 This tic tac toe was a fun project. I have more ideas to put in the webpage, and although I won't do it, I'll list
 them here:
  - in the console the same game field should be drawn and displayed after every player movement (as the console would be a
    separate screen)
  - the game field should be drawn in a canvas after each step, and should be assigned to the icon of the webpage
    and to the cursor
  - the game should keep track of the currently selected square, should display it differently (in the drawn canvas,
    in the console, and in the normal game field as well), and the user could move the selection by the arrows
    on the keyboard

  If the above would be implemented, it would be the ultimate tic tac toe game, centralized and synchronized model,
  and the user could view the game progress in the actual html document, in the console, on the cursor and in the
  icon of the website.

  Maybe it will happen in a future web course if I will encounter any.

  Summarizing the above, start at the object-oriented part of the assignment, because the function part doesn't have a
   lot of comments, and it might be hard to understand.
 */




/*
-----------------------------------------------------------
                    Util functions
-----------------------------------------------------------
 */

function range(from, to, step = 1){
    let arr = [];
    for (let i = from; i <= to; i += step) {
        arr.push(i);
    }

    return arr;
}

function callEventListeners(listeners){
   let [, ...listenerArguments] = arguments;
   listeners.forEach(l => l(...listenerArguments));
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function hexToRgb(hex){
    if(hex[0] === '#')
        hex = hex.substring(1);

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
}
/*
-----------------------------------------------------------
                    Player functions
-----------------------------------------------------------
 */

let playerEvents = {
   onColorChange: [], // (player) => {}
   onOverallScoreIncreased: [], // (player, increasedBy) => {}
   onNameChanged: [], // (player) => {}
};


function createPlayer(playerNum, playerName, playerColor){
    return {
        playerNumber: playerNum,
        playerName,
        playerColor,
        overallPoints: 0,
    }
}

function changePlayerName(player, newName){
    let newPlayer = {
        ...player,
        playerName: newName,
    };

    callEventListeners(playerEvents.onNameChanged, newPlayer);

    return newPlayer;
}

function increaseOverallPlayerPoints(player, increaseBy){
    let newPlayer = {
        ...player,
        overallPoints: player.overallPoints + increaseBy
    };

    callEventListeners(playerEvents.onOverallScoreIncreased, newPlayer, increaseBy);

    return newPlayer;
}

let colorChangeRateLimit = {
    colorEditedCount: 0,
    colorChangeTimeout: null,
    milliSecDelay: 50,
};

function setColor(playerPointer, newColor, enforceRateLimit = true){
    let player = playerPointer();
    let newPlayer = {
        ...player,
        playerColor: newColor,
    };

    if(!enforceRateLimit){
        callEventListeners(playerEvents.onColorChange, newPlayer);
        return newPlayer;
    }

    colorChangeRateLimit.colorEditedCount++;

    if(colorChangeRateLimit.colorChangeTimeout != null)
        return newPlayer;

    // self starting timer
    let rateLimitChecker = () => {
        if(colorChangeRateLimit.colorEditedCount > 0){
            colorChangeRateLimit.colorEditedCount = 0;
            callEventListeners(playerEvents.onColorChange, playerPointer())
            colorChangeRateLimit.colorChangeTimeout = setTimeout(() => rateLimitChecker(), colorChangeRateLimit.milliSecDelay);
        }
        else colorChangeRateLimit.colorChangeTimeout = null;
    }

    colorChangeRateLimit.colorChangeTimeout = setTimeout(() => rateLimitChecker(), colorChangeRateLimit.milliSecDelay);

    return newPlayer;
}

let playerPool = {
    player1: createPlayer(1, 'Player1', '#ff0000'),
    player2: createPlayer(2, 'Player2', '#ff00ff'),
}

function getPlayerByNumber(num){
    if(num === 1)
        return playerPool.player1;
    if(num === 2)
        return  playerPool.player2;
    return null;
}

/*
-----------------------------------------------------------
                    Game functions
-----------------------------------------------------------
 */

let gameEventListeners = {
    onPlayerWin: [], // (game, playerWon) => {}
    onNoMovement: [], // (game) => {}
    onReset: [], // (game) => {}
    onPlayerMoved: [], // (game, playerMoved) => {}
}


function chooseRandomValueFromArray(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPlayerNumber(playerPool){
    let playerNumbers = Object.values(playerPool).map(p => p.playerNumber);
    return chooseRandomValueFromArray(playerNumbers);
}

function createTicTacToeGame(player1Num, player2Num, startingPlayer){
    return resetGame({
        player1Num,
        player2Num,
    }, startingPlayer);
}

function resetGame(game, startingPlayerNumber){
    let newGame = {
        ...game,
        table: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ],
        isGameClosed: false,
        winnerPlayerNumber: null,
        nextPlayerNumber: startingPlayerNumber,
        winnerIndexes: null,
    };

    callEventListeners(gameEventListeners.onReset, newGame);

    return newGame;
}

function getGameStatusMessage(game, isEasterEggMessage = Math.random() < 0.01){
    if(game.isGameClosed){
        if(game.winnerPlayerNumber == null)
            return 'No next movement, please reset the table!';

        let winnerName = getPlayerByNumber(game.winnerPlayerNumber).playerName;
        if(isEasterEggMessage)
            return `Winner winner chicken dinner ${winnerName}`;
        return `Player ${winnerName} won!`;
    }

    let nextPlayerName = getPlayerByNumber(game.nextPlayerNumber).playerName;
    return `${nextPlayerName} has the next move.`;
}

function isCellEmpty(game, tableIndex){
    return game.table[tableIndex] == null;
}

function playerMovement(game, tableIndex){
    if(game.isGameClosed)
        return game;

    if(!isCellEmpty(game, tableIndex))
        return game;

    let gameCopy = { ...game, table: [...game.table] };
    let nextPlayerNum = game.nextPlayerNumber
    gameCopy.table[tableIndex] = nextPlayerNum;

    gameCopy.nextPlayerNumber = game.player1Num === nextPlayerNum ?
        game.player2Num : game.player1Num;

    callEventListeners(gameEventListeners.onPlayerMoved, gameCopy, getPlayerByNumber(nextPlayerNum));

    let winner = checkIfGameWon(gameCopy);
    if(winner != null)
    {
        gameCopy.isGameClosed = true;
        gameCopy.winnerPlayerNumber = winner.winnerNum;
        gameCopy.winnerIndexes = winner.winnerIndexes;

        callEventListeners(gameEventListeners.onPlayerWin, gameCopy, getPlayerByNumber(winner.winnerNum))

        return gameCopy;
    }

    if(!gameCopy.table.includes(null)){
        gameCopy.isGameClosed = true;

        callEventListeners(gameEventListeners.onNoMovement, gameCopy);
    }

    return gameCopy;
}

function checkIfGameWon(game){
    let checkWinnerHelper = (indexes) => {
        let firstNum = game.table[indexes[0]];
        if(firstNum == null)
            return null;

        let winner = indexes.reduce((winnerNum, index) => {
            let value = game.table[index];
            if(winnerNum !== value)
                return null;
            return winnerNum;
        }, firstNum);

        if(winner == null)
            return null;

        return { winnerNum: firstNum, winnerIndexes: indexes };
    }

    let winnerIndexTrios = [
        [0, 1, 2], // first row
        [3, 4, 5], // second row
        [6, 7, 8], // third row

        [0, 3, 6], // first column
        [1, 4, 7], // second column
        [2, 5, 8], // third column

        [0, 4, 8], // first diagonal
        [2, 4, 6], // second diagonal
    ];

    return winnerIndexTrios.reduce((winnerObj, winnerIndexTrio) => {
        if (winnerObj != null)
            return winnerObj;

        let potentialWinner = checkWinnerHelper(winnerIndexTrio);
        if (potentialWinner != null)
            winnerObj = potentialWinner;

        return winnerObj;
    }, null);
}

let game = createTicTacToeGame(
    playerPool.player1.playerNumber,
    playerPool.player2.playerNumber,
    getRandomPlayerNumber(playerPool));




/*
-----------------------------------------------------------
                    Confetti functions
-----------------------------------------------------------
 */

let confettiOptions = {
    // kind of constants
    confettiCount: 200,
    gravity: 1,
    terminalVelocity: 5,
    drag: 0.075,

    // variables
    confetti: [],
    canvas: null,
    ctx: null,
    cx: null,
    cy: null,

    canvasToRainProducer: null,
};

function setupConfetti(canvas){
    confettiOptions.canvas = canvas;
    confettiOptions.ctx = canvas.getContext("2d");

    window.addEventListener('resize', () => resizeCanvas());
    resizeCanvas();
    renderConfetti();
}

function resizeCanvas(){
    confettiOptions.canvas.width = window.innerWidth;
    confettiOptions.canvas.height = window.innerHeight;
    confettiOptions.cx = confettiOptions.ctx.canvas.width / 2;
    confettiOptions.cy = confettiOptions.ctx.canvas.height / 2;
}

function makeConfettiRain(){
    range(0, confettiOptions.confettiCount - 1).forEach(() => {
        let size = randomRange(40, 60);
        confettiOptions.confetti.push({
            dimensions: {
                x: size,
                y: size,
            },

            position: {
                x: randomRange(0, confettiOptions.canvas.width),
                y: confettiOptions.canvas.height - 1
            },

            rotation: randomRange(0, 2 * Math.PI),
            scale: {
                x: 1,
                y: 1
            },

            velocity: {
                x: randomRange(-25, 25),
                y: randomRange(0, -50)
            },
            sinOrCos: true,
        });
    })
}


function renderConfetti(){
    let ctx = confettiOptions.ctx;
    let canvas = confettiOptions.canvas;
    let confettiCollection = confettiOptions.confetti;

    let drag = confettiOptions.drag;
    let gravity = confettiOptions.gravity;
    let terminalVelocity = confettiOptions.terminalVelocity;
    let confetti = confettiOptions.confetti;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiCollection.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        // Move canvas to position and rotate
        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);

        // Apply forces to velocity
        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

        // Set position
        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;

        // change the spin direction
        confetto.sinOrCos = !confetto.sinOrCos;

        // Delete confetti when out of frame
        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

        // Loop confetto x position
        if (confetto.position.x > canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvas.width;


        // Spin confetto by scaling y and x
        if(confetto.sinOrCos)
            confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        else
            confetto.scale.x = Math.sin(confetto.position.x * 0.1);

        // Draw confetti
        ctx.drawImage(confettiOptions.canvasToRainProducer(), -width / 2, -height / 2, width, height);


        // Reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    });


    // Fire off another round of confetti
    //if (confetti.length <= 10) initConfetti();

    window.requestAnimationFrame(() => renderConfetti());
}



/*
-----------------------------------------------------------
                    Debug Temp listeners
-----------------------------------------------------------
 */

playerEvents.onOverallScoreIncreased.push((player, increasedBy) => {
    console.log(player.playerName + ' score increased by ' + increasedBy);
});
playerEvents.onNameChanged.push((player) => {
    console.log('Player number ' + player.playerNumber + ' changed name to ' + player.playerName);
});
playerEvents.onColorChange.push((player) => {
    console.log('Player number ' + player.playerNumber + ' changed color to ' + player.playerColor);
});

gameEventListeners.onReset.push(() => {
    console.log('Game has been reset');
});
gameEventListeners.onNoMovement.push(() => {
    console.log('No next movement');
});
gameEventListeners.onPlayerWin.push((game, playerWon) => {
    console.log('Game has been won by ' + playerWon.playerName);
});
gameEventListeners.onPlayerMoved.push((game, playerMoved) => {
    console.log('Player ' + playerMoved.playerName + ' moved a step');
})


/*
-----------------------------------------------------------
                    GUI Objects
-----------------------------------------------------------
 */
const nameInputP1 = document.getElementById('name-input-player1');
const nameInputP2 = document.getElementById('name-input-player2');
const colorPickerP1 = document.getElementById('color-picker-player1');
const colorPickerP2 = document.getElementById('color-picker-player2');

const sideBgLeft = document.querySelector('.side-left');
const sideBgRight = document.querySelector('.side-right');

const scoreCounterP1 = document.getElementById('score-counter-player1');
const scoreCounterP2 = document.getElementById('score-counter-player2');

const resetButton = document.querySelector('.reset-button button');
const statusMessageBox = document.querySelector('.status-message');

const confettiClickMainWindow = document.querySelector('.main');

const tableCells = [
    document.getElementById('cell-1'),
    document.getElementById('cell-2'),
    document.getElementById('cell-3'),
    document.getElementById('cell-4'),
    document.getElementById('cell-5'),
    document.getElementById('cell-6'),
    document.getElementById('cell-7'),
    document.getElementById('cell-8'),
    document.getElementById('cell-9')
];

let confettiCanvas = document.getElementById('confetti-canvas');

let resetButtonFontSize = 16;

let canvasCollection = {
    canvasX: null,
    blobXUrl: null,
    canvasO: null,
    blobOUrl: null,
}


/*
-----------------------------------------------------------
                    Actual listeners
-----------------------------------------------------------
 */
function isPlayer1(playerNum){
    return playerNum === playerPool.player1.playerNumber;
}

// Name listeners
playerEvents.onNameChanged.push((player) => {
    if(isPlayer1(player.playerNumber)){
        nameInputP1.value = player.playerName;
        playerPool.player1 = player;
    }
    else{
        nameInputP2.value = player.playerName;
        playerPool.player2 = player;
    }

    statusMessageBox.textContent = getGameStatusMessage(game);
});
playerPool.player1 = changePlayerName(playerPool.player1, 'Player1');
playerPool.player2 = changePlayerName(playerPool.player2, 'Player2');
nameInputP1.oninput = ev => changePlayerName(playerPool.player1, ev.target.value);
nameInputP2.oninput = ev => changePlayerName(playerPool.player2, ev.target.value);

// color listeners
playerEvents.onColorChange.push(async (player) => {
    if(isPlayer1(player.playerNumber)){
        document.body.style.setProperty('--player1Color', hexToRgb(player.playerColor));
        colorPickerP1.value = player.playerColor;
        await createAndAssignCanvasOFull();
        setRightCursor(game); // refreshes the cursor with the latest blob url.
    }
    else{
        document.body.style.setProperty('--player2Color', hexToRgb(player.playerColor));
        colorPickerP2.value = player.playerColor;
        await createAndAssignCanvasXFull();
        setRightCursor(game);
    }
})
playerPool.player1 = setColor(() => playerPool.player1, '#ff0000', false);
playerPool.player2 = setColor(() => playerPool.player2, '#ff00ff', false);
colorPickerP1.oninput = ev => playerPool.player1 = setColor(() => playerPool.player1, ev.target.value);
colorPickerP2.oninput = ev => playerPool.player2 = setColor(() => playerPool.player2, ev.target.value);

// score counter
scoreCounterP1.innerHTML = '';
scoreCounterP2.innerHTML = '';
playerEvents.onOverallScoreIncreased.push((player, increasedBy) => {
    let scoreCounter = isPlayer1(player.playerNumber) ? scoreCounterP1 : scoreCounterP2;

    range(1, increasedBy).forEach(() => {
        let div = document.createElement('div');
        div.classList.add('game-item');
        div.classList.add('score-game-item');
        scoreCounter.appendChild(div);
    })

    scoreCounter.title = 'Score: ' + scoreCounter.childNodes.length;
})


// reset button
resetButton.onclick = () => game = resetGame(game, getRandomPlayerNumber(playerPool));
gameEventListeners.onReset.push((game) => {
    tableCells.forEach(tableCell => tableCell.className = 'grid-cell');
    statusMessageBox.textContent = getGameStatusMessage(game);
    setResetButtonFontSize(resetButtonFontSize = 16);

    //game.onPlayerMoved();
    setActiveSide(game.nextPlayerNumber);
    setRightCursor(game);

    // this is so that we disable the confetti raining when we restart the game
    confettiClickMainWindow.onclick = () => {};
});

// player movement
gameEventListeners.onPlayerMoved.push((game) => {
    statusMessageBox.textContent = getGameStatusMessage(game);
    setActiveSide(game.nextPlayerNumber);
    setRightCursor(game);
});

// on no more movement
gameEventListeners.onNoMovement.push((game) => {
    statusMessageBox.textContent = getGameStatusMessage(game);
    setActiveSide(undefined);
})

// on win
gameEventListeners.onPlayerWin.push((game, playerWon) => {
    statusMessageBox.textContent = getGameStatusMessage(game);
    setActiveSide(playerWon.playerNumber);


    // add winner animation to the winner row/column/diagonal line
    game.winnerIndexes.forEach(i => {
        tableCells[i].classList.add('winner-animation');
    })

    setCursor('no-drop');

    // increase the score of the player
    if(isPlayer1(playerWon.playerNumber)){
        playerPool.player1 = increaseOverallPlayerPoints(playerPool.player1, 1);
        confettiOptions.canvasToRainProducer = () => canvasCollection.canvasO;
    }
    else{
        playerPool.player2 = increaseOverallPlayerPoints(playerPool.player2, 1);
        confettiOptions.canvasToRainProducer = () => canvasCollection.canvasX;
    }

    makeConfettiRain();

    confettiClickMainWindow.onclick = e => {
        if(e.target === confettiClickMainWindow)
            makeConfettiRain();
    }
})


// player movement listener
tableCells.forEach(tableCell => {
    tableCell.onclick = ev => {
        if(game.isGameClosed){
            statusMessageBox.textContent = 'The game is already over. Press the reset to start a new one!';
            setResetButtonFontSize(++resetButtonFontSize);
            return;
        }

        let cell = ev.target;
        if(ev.target.classList.contains('game-item'))
            cell = ev.target.parentNode;

        let cellIndex = parseInt(cell.getAttribute('data-cell-id'));
        if(isCellEmpty(game, cellIndex)){
            let nextPlayer = game.nextPlayerNumber;
            // update model
            game = playerMovement(game, cellIndex);

            // update view
            // this one will add the circle or the X in the table
            if(isPlayer1(nextPlayer))
                cell.classList.add('player1');
            else
                cell.classList.add('player2');

            // remove the latest tag from all the previous cells
            tableCells.forEach(tc => tc.classList.remove('latest'))

            // add the new latest tag
            cell.classList.add('latest');
        }
        else{
            let gameItem = cell.childNodes[0];
            gameItem.classList.add('shake');
            setTimeout(() => gameItem.classList.remove('shake'), 200);
        }
    }

    tableCell.onkeydown = ev => {
        if(ev.key === 'Enter')
            tableCell.onclick({ target: ev.target })
    }
})

setActiveSide(game.nextPlayerNumber);
setRightCursor(game);
setupConfetti(confettiCanvas);
/*
-----------------------------------------------------------
                    Other functions
-----------------------------------------------------------
 */

function setActiveSide(playerNum){
    if(isPlayer1(playerNum)){
        sideBgLeft.classList.add('active');
        sideBgRight.classList.remove('active');
    }
    else if(playerNum != null){
        sideBgRight.classList.add('active');
        sideBgLeft.classList.remove('active');
    }
    else{
        sideBgLeft.classList.remove('active');
        sideBgRight.classList.remove('active');
    }
}

function setResetButtonFontSize(num){
    resetButton.parentNode.style.fontSize = num + "px";
}

function setRightCursor(game){
    if(game.nextPlayerNumber === playerPool.player1.playerNumber && canvasCollection.blobOUrl != null)
        setCursor(`url('${canvasCollection.blobOUrl}') 25 25`, true);
    else if(canvasCollection.blobXUrl != null)
        setCursor(`url('${canvasCollection.blobXUrl}') 25 25`, true);
}

function setCursor(cursor, isAuto = false){
    let cssText = isAuto ? cursor + ', auto' : cursor;
    document.body.style.setProperty('--display-hover-cursor', cssText);
}

async function createAndAssignCanvasXFull(){
    let canvasInfo = await createCanvasFull(() => createCanvasX(50, playerPool.player2.playerColor));
    canvasCollection.canvasX = canvasInfo.canvas;
    canvasCollection.blobXUrl = canvasInfo.blobUrl;
}

async function createAndAssignCanvasOFull(){
    let canvasInfo = await createCanvasFull(() => createCanvasO(50, playerPool.player1.playerColor));
    canvasCollection.canvasO = canvasInfo.canvas;
    canvasCollection.blobOUrl = canvasInfo.blobUrl;
}

async function createCanvasFull(createCanvasMethod){
    let canvas = createCanvasMethod();
    let blobUrl = await getCanvasUrl(canvas);

    return { canvas, blobUrl };
}

function createCanvasX(size, color){
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const cornerRadius = size / 9;


    ctx.beginPath();
    // set the color
    ctx.fillStyle = color;
    ctx.stroke = color;

    ctx.translate(size / 2, -size / 5);
    ctx.rotate((45 * Math.PI) / 180);

    ctx.roundRect(size / 2 - cornerRadius / 2, 0, cornerRadius, size, cornerRadius);
    ctx.fill();
    ctx.roundRect(0, size / 2 - cornerRadius / 2, size, cornerRadius, cornerRadius);
    ctx.fill();

    ctx.closePath();

    return canvas;
}

function createCanvasO(size, color){
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = size / Math.PI;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'transparent';
    context.fill();
    context.lineWidth = size / 10;
    context.strokeStyle = color;
    context.stroke();
    context.closePath();

    return canvas;
}

async function getCanvasUrl(canvas){
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    return URL.createObjectURL(blob);
}