export class TicTacToeGame{
    table;
    #isClosed;
    #getWinnerName;
    #winnerPlayerNum;
    #winnerIndexes;
    #latestInsertCellIndex;
    #isNoMovement;

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

        let playerName = this.player1.getPlayerNumber() !== this.previousPlayerStep ?
            this.player1.getName() :
            this.player2.getName();

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

    isNoMovement(){
        return this.#isNoMovement;
    }

    isCellEmpty(tableIndex){
        return this.table[tableIndex] == null;
    }

    isPlayer1OnCell(cellIndex){
        return this.table[cellIndex] === this.player1.getPlayerNumber()
    }

    isGameClosed(){
        return this.#isClosed;
    }

    isWinnerCellIndex(cellIndex){
        if(this.#winnerIndexes == null)
            return false;

        return this.#winnerIndexes.includes(cellIndex);
    }

    setCell(tableIndex){
        if(this.#isClosed)
            return;

        this.#latestInsertCellIndex = tableIndex;
        let playerNumber = this.getNextPlayerNumber();

        this.table[tableIndex] = playerNumber;
        this.previousPlayerStep = playerNumber;

        let onWinEvent = this.#actIfAnybodyWon();
        this.onPlayerMoved(playerNumber);
        onWinEvent();

        if(!this.table.includes(null) && this.#winnerIndexes == null){
            this.#isNoMovement = true;
            this.onNoMovement();
        }
    }

    getWonPlayerNum(){
        return this.#winnerPlayerNum;
    }

    getLatestInsertedCellIndex(){
        return this.#latestInsertCellIndex;
    }

    reset(){
        this.#getWinnerName = null;
        this.#winnerIndexes = null;
        this.#isNoMovement = false;
        this.#isClosed = false;
        this.#latestInsertCellIndex = null;
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
            return () => {};

        this.#getWinnerName = () => this.player1.getPlayerNumber() === winnerNum ?
            this.player1.getName() :
            this.player2.getName();
        this.#isClosed = true;
        this.#winnerPlayerNum = winnerNum;
        return () => this.onPlayerWin(winnerNum);
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
export class Player{
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

    getOverallPoints(){
        return this.overallPoints;
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
export class ConfettiHelper{
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

    constructor() {

    }

    init(canvas){
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



export async function getCanvasUrl(canvas){
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    return URL.createObjectURL(blob);
}

export function createXCanvas(color){
    return canvasX(50, color);
}
// same but with the circle
export function createOCanvas(color){
    return canvasO(50, color);
}

export function canvasX(size, color){
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
export function canvasO(size, color){
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