/**
 * This class represents a single tic-tac-toe game. It is more like a model class, it holds data
 * of the game, but it doesn't have any gui item in it as a field or variable and such.
 * It has some event methods which can be overridden, like the onNoMovement, onPlayerMoved,
 * onReset, onPlayerWin. To represent the tic-tac-toe board, it has an array, in which it stores the
 * board data. there is a nice graph in the constructor, but let me explain. So we know that the cell
 * 0 is empty if it has a null value, otherwise a player already placed their X or O sign in.
 */
class TicTacToeGame{
    table;
    #isClosed;
    #getWinnerName;
    #winnerIndexes;

    player1;
    player2;

    previousPlayerStep;

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;

        this.reset();
        // 9 null represents an empty table
        /*
        Table indexing:
        ┌───┬───┬───┐
        │ 0 │ 1 │ 2 │
        ├───┼───┼───┤
        │ 3 │ 4 │ 5 │
        ├───┼───┼───┤
        │ 6 │ 7 │ 8 │
        └───┴───┴───┘
         */
    }

    getStatusMessage(){
        if(this.#isClosed){
            if(Math.random() < 0.01) // :D
                return `Winner winner chicken dinner ${this.#getWinnerName()}!`;
            return `Player ${this.#getWinnerName()} won!`;
        }

        if(!this.table.includes(null))
            return 'No next movement, please reset the table!';

        let playerName = player1.getPlayerNumber() !== this.previousPlayerStep ?
            player1.getName() :
            player2.getName();

        return `${playerName} has the next move.`
    }

    getNextPlayerNumber(){
        if(this.previousPlayerStep === this.player1.getPlayerNumber())
            return this.player2.getPlayerNumber();
        return this.player1.getPlayerNumber();
    }

    getWinnerIndexes(){
        return this.#winnerIndexes;
    }

    onPlayerWin(playerNum){
        // this method will be overridden or something
        console.log('Player ' + playerNum + ' won!')
    }

    onNoMovement(){

    }

    onReset(){

    }

    onPlayerMoved(playerNum){

    }

    isCellEmpty(tableIndex){
        return this.table[tableIndex] == null;
    }

    isGameClosed(){
        return this.#isClosed;
    }

    setCell(tableIndex){
        if(this.#isClosed)
            return;

        let playerNumber = this.getNextPlayerNumber();

        this.table[tableIndex] = playerNumber;
        this.previousPlayerStep = playerNumber;
        this.onPlayerMoved(playerNumber);
        this.#actIfAnybodyWon();

        if(!this.table.includes(null) && this.#winnerIndexes == null)
            this.onNoMovement();
    }

    reset(){
        this.#getWinnerName = null;
        this.#winnerIndexes = null;
        this.#isClosed = false;
        this.previousPlayerStep = Math.random() > 0.5 ?
            this.player1.getPlayerNumber() :
            this.player2.getPlayerNumber();

        this.table = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ];

        this.onReset();
    }

    /*
    This method (as the name implies) will only act when a player has won the game, else it's going to exit and leave
    everything as it found.
     */
    #actIfAnybodyWon(){
        let winnerNum = this.#getWinner();

        if(winnerNum == null)
            return;

        this.#getWinnerName = () => player1.getPlayerNumber() === winnerNum ?
            player1.getName() :
            player2.getName();
        this.#isClosed = true;
        this.onPlayerWin(winnerNum);
    }

    #getWinner(){
        let winnerNum;

        // checking the rows
        if((winnerNum = this.#checkWinnerHelperRows((row, col) => this.#calculateCellIndex(row, col))) != null)
            return winnerNum;
        // checking the columns
        if((winnerNum = this.#checkWinnerHelperRows((row, col) => this.#calculateCellIndex(col, row))) != null) // reuse the function to check columns
            return winnerNum;

        // checking diagonal 1
        if((winnerNum = this.#checkWinnerHelperDiagonal([0, 4, 8])) != null)
            return winnerNum;

        // checking diagonal 2
        if((winnerNum = this.#checkWinnerHelperDiagonal([2, 4, 6])) != null)
            return winnerNum;

        return null;
    }

    #calculateCellIndex(row, column){
        return (row - 1) * 3 + column - 1;
    }

    #checkWinnerHelperDiagonal(indexes){
        let firstNum = this.table[indexes[0]];
        if(firstNum == null)
            return null;

        for (const index of indexes) {
            let value = this.table[index];
            if(firstNum !== value)
                return null;
        }

        this.#winnerIndexes = indexes;
        return firstNum;
    }

    /*
    Initially I used this method to check if the player has occupied a full row,
    but then later I found out I can reuse this function to check the columns as well, so here we go!
     */
    #checkWinnerHelperRows(calculateIndexFunc){
        for (let i = 1; i <= 3; i++) {
            let playerNum = null;
            let indexes = [];
            for (let j = 1; j <= 3; j++) {
                let index = calculateIndexFunc(i, j);
                indexes.push(index);
                let posValue = this.table[index];

                if(posValue == null){
                    playerNum = null;
                    break;
                }

                if(playerNum == null){
                    playerNum = posValue;
                }
                else if(playerNum !== posValue){
                    playerNum = null;
                    break;
                }
            }

            if(playerNum != null){
                this.#winnerIndexes = indexes;
                return playerNum;
            }
        }

        return null;
    }
}

/**
 * Holds information of a player.
 */
class Player{
    number;
    name;
    overallPoints;
    color;

    #colorChangeTimeout;
    #colorEdited;

    constructor(playerNumber, playerName, color) {
        this.number = playerNumber;
        this.name = playerName;
        this.color = color;
        this.overallPoints = 0;
        this.#colorEdited = 0;
        this.#colorChangeTimeout = null;
    }

    getPlayerNumber(){
        return this.number;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
        this.onNameChanged(name);
    }

    getColor(){
        return this.color;
    }

    /**
     * This setColor method is a bit long, so here is a little explanation: This method also invokes the
     * event onColorChange. Because the setColor method gets invoked EVERY TIME THE COLOR INPUT CHANGES, so it
     * listens to the oninput instead of the onchange (oninput fires every time a user changes the color, while the
     * onchange only fires when the user changed the color AND exited the color picker). So this method
     * gets spammed really hard, but that wouldn't be the problem. So when the player hovers their cursor over a
     * game cell, a nice X or O sign is displayed. It is pretty cool, especially that it has the same color as the
     * player. But, there is a huge performance issue: that sign gets drawn in a canvas, which is then converted
     * into a blob, from which we get a temporary url. This is a resource eating process, especially if we spam this
     * 100 times/second. And while selecting the color with the mouse, the color picker was lagging instantly.
     *
     * And here comes our little solution handy, where we register the color, but we rate limit the event trigger.
     * When a new color is set, we increment the #colorEdited value by one, indicating we would like to call the
     * onColorChange event later. Then we check if there is an already running rate limiter. If there is, it's good,
     * because we indicated the event needs to be called by increasing the colorEdited value, so we can leave the
     * method. If there isn't a rate limiter, it means that it was long (milliSecDelay) time ago the user edited the
     * color, so we are setting up a new rate limiter, which after the delay, it checks if there was a new event
     * request (the colorEdited is >0), if yes, then set the colorEdited to 0, call the event, and set a new rate
     * limiter. If there wasn't any event request, then goodbye, see you next time.
     */
    setColor(color){
        this.color = color;

        /*this.onColorChange(this.color);*/
        // rate limit on color change to 100 ms
        this.#colorEdited++;

        if(this.#colorChangeTimeout != null)
            return;

        const milliSecDelay = 50;

        // self starting timer
        let rateLimitChecker = () => {
            if(this.#colorEdited > 0){
                this.#colorEdited = 0;
                this.onColorChange(this.color);
                this.#colorChangeTimeout = setTimeout(() => rateLimitChecker(), milliSecDelay);
            }
            else this.#colorChangeTimeout = null;
        }

        this.#colorChangeTimeout = setTimeout(() => rateLimitChecker(), milliSecDelay);
    }

    increaseOverallPoints(increaseBy = 1){
        this.overallPoints += increaseBy;
        this.onOverallScoreIncreased(increaseBy);
    }

    onColorChange(color){
        // can be implemented from the outside
    }

    onOverallScoreIncreased(increasedBy){

    }

    onNameChanged(name){

    }
}


/*
 This class is responsible for confetti
 */
class ConfettiHelper{
    // parameters
    confettiCount = 200;
    gravity = 1;
    terminalVelocity = 5;
    drag = 0.075;

    // variables
    confetti = [];
    canvas;
    ctx;
    cx;
    cy;

    canvasToRainProducer; // this should be method to get the right canvas

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
        this.render();
    }

    #randomRange = (min, max) => Math.random() * (max - min) + min;

    // this happens when the window gets resized
    resizeCanvas(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.cx = this.ctx.canvas.width / 2;
        this.cy = this.ctx.canvas.height / 2;
    }

    // This method shoots a pile of confetti into the air.
    // More technical part: this method generates the confetti instances
    makeItRain(){
        for (let i = 0; i < this.confettiCount; i++) {
            let size = this.#randomRange(40, 60)
            this.confetti.push({
                dimensions: {
                    x: size,
                    y: size,
                },

                position: {
                    x: this.#randomRange(0, this.canvas.width),
                    y: this.canvas.height - 1
                },

                rotation: this.#randomRange(0, 2 * Math.PI),
                scale: {
                    x: 1,
                    y: 1
                },

                velocity: {
                    x: this.#randomRange(-25, 25),
                    y: this.#randomRange(0, -50)
                },
                sinOrCos: true,
            });
        }
    }

    /**
     * This method does the heavy work, it renders all the confetti into the canvas.
     */
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.confetti.forEach((confetto, index) => {
            let width = confetto.dimensions.x * confetto.scale.x;
            let height = confetto.dimensions.y * confetto.scale.y;

            // Move canvas to position and rotate
            this.ctx.translate(confetto.position.x, confetto.position.y);
            this.ctx.rotate(confetto.rotation);

            // Apply forces to velocity
            confetto.velocity.x -= confetto.velocity.x * this.drag;
            confetto.velocity.y = Math.min(confetto.velocity.y + this.gravity, this.terminalVelocity);
            confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

            // Set position
            confetto.position.x += confetto.velocity.x;
            confetto.position.y += confetto.velocity.y;

            // change the spin direction
            confetto.sinOrCos = !confetto.sinOrCos;

            // Delete confetti when out of frame
            if (confetto.position.y >= this.canvas.height) this.confetti.splice(index, 1);

            // Loop confetto x position
            if (confetto.position.x > this.canvas.width) confetto.position.x = 0;
            if (confetto.position.x < 0) confetto.position.x = this.canvas.width;


            // Spin confetto by scaling y and x
            if(confetto.sinOrCos)
                confetto.scale.y = Math.cos(confetto.position.y * 0.1);
            else
                confetto.scale.x = Math.sin(confetto.position.x * 0.1);

            // Draw confetti
            this.ctx.drawImage(this.canvasToRainProducer(), -width / 2, -height / 2, width, height);


            // Reset transform matrix
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        });

        // Fire off another round of confetti
        //if (confetti.length <= 10) initConfetti();

        window.requestAnimationFrame(() => this.render());
    };
}

/*
    Until here the code is kinda okay, but from here it gets a bit wilder, so just make sure to be safe.
    I'm going to stay with you on this scary journey and provide a guide like tour in the jungle of JS.
 */

// So here we get the DOM elements we will need to modify later, nothing amazing
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

// Now we create the model objects
const player1 = new Player(1, 'Player1');
const player2 = new Player(2, 'Player2');

let game = new TicTacToeGame(player1, player2);

let confettiCanvas = document.getElementById('confetti-canvas');
let confettiHelper = new ConfettiHelper(confettiCanvas);

// this one is for a little Easter egg, it's very funny imo
let resetButtonFontSize = 16;

// these two are for the cursor blob url which I was talking about previously.
let canvasXObj;
let canvasOObj;
let blobXurl;
let blobOurl;


// Setting up listeners

// Now it's getting interesting, but not complicated. We add an event listener from the model to the view,
// then set the value in the model (so that the view gets updated), and an event listener from the view to
// the model. Easy
player1.onNameChanged = newName => {
    nameInputP1.value = newName;
    statusMessageBox.textContent = game.getStatusMessage();
}
player2.onNameChanged = newName => {
    nameInputP2.value = newName;
    statusMessageBox.textContent = game.getStatusMessage();
}
player1.setName('Player1');
player2.setName('Player2');
nameInputP1.oninput = ev => player1.setName(ev.target.value);
nameInputP2.oninput = ev => player2.setName(ev.target.value);

// This part uses the same concept as above, just that we use the colors in more places than the
// names, so we have more to do when the event happens
player1.onColorChange = async newColor => {
    document.body.style.setProperty('--player1Color', hexToRgb(newColor));
    colorPickerP1.value = newColor;
    await createOCanvas(); // creates a new canvas, makes it a blob and assigns it the blobOurl
    setRightCursor(); // refreshes the cursor with the latest blob url.
}
player2.onColorChange = async newColor => {
    document.body.style.setProperty('--player2Color', hexToRgb(newColor));
    colorPickerP2.value = newColor;
    await createXCanvas();
    setRightCursor();
}
player1.setColor('#ff0000');
player2.setColor('#ff00ff');
colorPickerP1.oninput = ev => player1.setColor(ev.target.value);
colorPickerP2.oninput = ev => player2.setColor(ev.target.value);

// When a player wins, they get a little X or O depending on what team they are,
// so they can keep track of how many wins they have.
scoreCounterP1.innerHTML = '';
scoreCounterP2.innerHTML = '';
player1.onOverallScoreIncreased = increasedBy => {
    for (let i = 0; i < increasedBy; i++) {
        let div = document.createElement('div');
        div.classList.add('game-item');
        div.classList.add('score-game-item');
        scoreCounterP1.appendChild(div);
    }

    scoreCounterP1.title = 'Score: ' + scoreCounterP1.childNodes.length;
}
player2.onOverallScoreIncreased = increasedBy => {
    for (let i = 0; i < increasedBy; i++) {
        let div = document.createElement('div');
        div.classList.add('game-item');
        div.classList.add('score-game-item');
        scoreCounterP2.appendChild(div);
    }

    scoreCounterP2.title = 'Score: ' + scoreCounterP2.childNodes.length;
}

// So here comes the scariest part, feel free to drink a coffee or something.
// first line is very straightforward
resetButton.onclick = () => game.reset();
// When the game gets reset, we would like to restore all the table cells into their original neutral state.
// After that, we refresh the status box, reset the Easter egg font size, changing back the cursor, and let's go
// to the next player movement.
game.onReset = () => {
    for (const tableCell of tableCells) {
        tableCell.className = 'grid-cell';
    }
    statusMessageBox.textContent = game.getStatusMessage();
    setResetButtonFontSize(resetButtonFontSize = 16);

    setCursor('pointer');
    game.onPlayerMoved();

    // this is so that we disable the confetti raining when we restart the game
    confettiClickMainWindow.onclick = () => {};
}
// this event is called at the beginning of the game, and then every time a player makes a move.
game.onPlayerMoved = () => {
    statusMessageBox.textContent = game.getStatusMessage();
    // when you see a variable or method which has the word 'side' in it,
    // it means the fancy background, which gets stronger when the player has to make the move.
    setActiveSide(game.getNextPlayerNumber());

    // we also want to set the right cursor, so that the current player doesn't get stuck with the other player's
    // cursor
    setRightCursor();
}
// we set this initially
setRightCursor();
// this happens when all the squares (or game items) gets filled, there are
// no remaining empty slot, but also nobody won.
game.onNoMovement = () => {
    setActiveSide(undefined);
}
// this event (as the name indicates) is called when a player wins
game.onPlayerWin = playerNum => {
    // get that fancy status message
    statusMessageBox.textContent = game.getStatusMessage();
    // also set the winner's side as active
    setActiveSide(playerNum);

    // increase the score of the player
    if(playerNum === player1.getPlayerNumber())
        player1.increaseOverallPoints();
    else
        player2.increaseOverallPoints();

    // add winner animation to the winner row/column/diagonal line
    for (const winnerIndex of game.getWinnerIndexes()) {
        tableCells[winnerIndex].classList.add('winner-animation');
    }

    // set the cursor to no drop. this cursor is set on the game items.
    setCursor('no-drop');

    confettiHelper.canvasToRainProducer = () =>
        player1.getPlayerNumber() === playerNum ? canvasOObj : canvasXObj;
    // let the confetti rain
    confettiHelper.makeItRain();

    // set the confetti on click event on the main panel
    confettiClickMainWindow.onclick = e => {
        // the if statement ensures that only the main panel click will make it rain,
        // and not the child elements
        if(e.target === confettiClickMainWindow)
            confettiHelper.makeItRain();
    }
}
//Ayyy this one is big, and it has some really important part, so let's go through it step by step
for (const tableCell of tableCells) {
    // we loop through all the 9 table cells, and we assign the onclick event, which is basically the
    // heart of the game
    tableCell.onclick = ev => {
        // if the game closed then don't do anything
        if(game.isGameClosed()){
            statusMessageBox.textContent = 'The game is already over. Press the reset to start a new one!';
            // this is the Easter egg. if the user is clicking on the table instead of the reset button
            // then the reset button will get bigger and Bigger and BIgger and BIGger and BIGGer and BIGGEr and BIGGER
            setResetButtonFontSize(++resetButtonFontSize);
            return;
        }

        let cell = ev.target;
        // check if the user clicked the parent or the child node
        if(ev.target.classList.contains('game-item'))
            cell = ev.target.parentNode;

        // here we store the number that which cell is the current cell accessing
        let cellIndex = parseInt(cell.getAttribute('data-cell-id'));
        // if the cell is empty, then we have stuff to do
        if(game.isCellEmpty(cellIndex)){
            let nextPlayer = game.getNextPlayerNumber();
            // update model
            game.setCell(cellIndex);

            // update view
            // this one will add the circle or the X in the table
            if(nextPlayer === player1.getPlayerNumber())
                cell.classList.add('player1');
            else
                cell.classList.add('player2');

            // remove the latest tag from all the previous cells
            for (const tableCell1 of tableCells) {
                if(tableCell1.classList.contains('latest'))
                    tableCell1.classList.remove('latest');
            }

            // add the new latest tag
            cell.classList.add('latest');

        }
        // if the cell is not empty, then gently shake the cell indicating it's already occupied
        else{
            let gameItem = cell.childNodes[0];
            gameItem.classList.add('shake');
            setTimeout(() => gameItem.classList.remove('shake'), 200);
        }
    }
    // just because we can, we can play the game with only keyboard, so the keyboard will
    // trigger the above onclick event
    tableCell.onkeydown = ev => {
        if(ev.key === 'Enter')
            // we only need the target, so it's okay to put only that field into the event object
            tableCell.onclick({ target: ev.target })
    }
}


// Nice! Good job! We went through the hard part, from this point, there are only small util functions.
// We are almost at the end

// initially set the active side to the player making the first step
setActiveSide(game.getNextPlayerNumber());
function setActiveSide(playerNum){
    if(playerNum === player1.getPlayerNumber()){
        sideBgLeft.classList.add('active');
        sideBgRight.classList.remove('active');
    }
    else if(playerNum === player2.getPlayerNumber()){
        sideBgRight.classList.add('active');
        sideBgLeft.classList.remove('active');
    }
    else{
        sideBgLeft.classList.remove('active');
        sideBgRight.classList.remove('active');
    }
}

// sets the cursor according to the next upcoming player
function setRightCursor(){
    if(game.getNextPlayerNumber() === player1.getPlayerNumber() && blobOurl !== undefined)
        setCursor(`url('${blobOurl}') 25 25`, true);
    else if(blobXurl !== undefined)
        setCursor(`url('${blobXurl}') 25 25`, true);
}

// easter egg :)))
function setResetButtonFontSize(num){
    resetButton.parentNode.style.fontSize = num + "px";
}

// descriptive enough
function setCursor(cursor, isAuto = false){
    let cssText = isAuto ? cursor + ', auto' : cursor;
    document.body.style.setProperty('--display-hover-cursor', cssText);
}

// oh yes, my favorite. It creates a canvas, converts it to blob url and assigns it to the X url variable
async function createXCanvas(){
    let canv = canvasX(50, player2.getColor());
    canvasXObj = canv;
    blobXurl = await getCanvasUrl(canv);
}
// same but with the circle
async function createOCanvas(){
    let canv = canvasO(50, player1.getColor());
    canvasOObj = canv;
    blobOurl = await getCanvasUrl(canv);
}

// Creates the canvas for the X. I was working very hard on this one, so I'm quite proud of this function, it was my
// first canvas drawing JS code, and I think it's pretty simple. But I had some great headaches making it, so just
// give it a kiss and let her enjoy the moment
function canvasX(size, color){
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

// On the other hand, this function is mostly copied from the internet, just changed the sizes and colors.
function canvasO(size, color){
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

// Cool function got from StackOverflow (at least the first line of it). Makes my life easier
async function getCanvasUrl(canvas){
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    return URL.createObjectURL(blob);
}

// This is to convert the hey value from the color picker to the css variable.
function hexToRgb(hex){
    if(hex[0] === '#')
        hex = hex.substring(1);

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
}



/*

If you got here, then take a rest. Good job on reviewing my code, and I hope the comments were descriptive,
and that I could explain how things are done in the website. It's 00:34 in the morning, which would not be
that late for me, but considering I have school today at 8:20, I'm going to go get some sleep.

Again, thank you for reading it till here, I really put a lot of effort into the code and into the documentation as well,
so thank you for appreciating it.

Greg

 */