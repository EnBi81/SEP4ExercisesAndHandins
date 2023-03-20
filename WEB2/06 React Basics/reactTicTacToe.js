function hexToRgb(hex){
    if(hex[0] === '#')
        hex = hex.substring(1);

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
}

function range(from, to, step = 1){
    let arr = [];
    for (let i = from; i <= to; i += step) {
        arr.push(i);
    }

    return arr;
}

const player1 = new Player(1, 'Player1', '#ff0000');
const player2 = new Player(2, 'Player2', '#ff00ff');

let game = new TicTacToeGame(player1, player2);

let confettiHelper = new ConfettiHelper();
confettiHelper.init(document.getElementById('confetti-canvas'));

let canvasItems = {
    canvasX: createXCanvas(player2.getColor()),
    canvasO: createOCanvas(player1.getColor()),
    canvasXurl: null,
    canvasOurl: null,
};

let getRightCursor = () => {
    if(game.isGameClosed()){
        return 'no-drop';
    }

    let cursorBlobUrl = game.getNextPlayerNumber() === player1.getPlayerNumber() ?
        canvasItems.canvasOurl : canvasItems.canvasXurl;

    if(cursorBlobUrl == null)
        return 'pointer';

    return `url('${cursorBlobUrl}'), auto`;
}

let setCursor = cursor => {
    console.log('cursor: ' + cursor)
    document.body.style.setProperty('--display-hover-cursor', cursor);
}

(async function createCanvasUrls(){
    canvasItems.canvasXurl = await getCanvasUrl(canvasItems.canvasX)
    canvasItems.canvasOurl = await getCanvasUrl(canvasItems.canvasO)
    setCursor(getRightCursor())
})()



const GameContext = React.createContext();
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<TicTacToe game={game} player1={player1} player2={player2} canvasItems={canvasItems} confettiHelper={confettiHelper} />)


function TicTacToe({game, player1, player2, confettiHelper, canvasItems}) {
    let [updateCounts, setState] = React.useState({ bgCount: 0, confettiCount: 0, gameCount: 0 })

    let context = {
        player1,
        player2,
        game,
        confettiHelper,

        isPlayer1: game.getNextPlayerNumber() === player1.getPlayerNumber(),
        updateBg: () => setState({
            ...updateCounts,
            bgCount: updateCounts.bgCount + 1
        }),
        updateGameboard: () => setState({
            ...updateCounts,
            gameCount: updateCounts.gameCount + 1
        }),
        makeConfettiRain: () => {
            if(game.isGameClosed())
                confettiHelper.makeItRain();
        },
    };


    game.onPlayerMoved = playerNum => {
        if(game.isGameClosed())
            return;

        context.isPlayer1 = playerNum === player1.getPlayerNumber();
        context.updateBg();

        setCursor(getRightCursor());
    }

    game.onPlayerWin = playerNum => {
        context.isPlayer1 = playerNum === player1.getPlayerNumber();
        if(context.isPlayer1)
            player1.increaseOverallPoints(1);
        else player2.increaseOverallPoints(1);
        context.updateBg();
        context.updateGameboard();

        if(context.isPlayer1)
            confettiHelper.canvasToRainProducer = () => canvasItems.canvasO;
        else
            confettiHelper.canvasToRainProducer = () => canvasItems.canvasX;
        context.makeConfettiRain();

        setCursor(getRightCursor());
    }
    game.onReset = () => {
        context.updateBg();
        context.updateBg();

        setCursor(getRightCursor());
    }

    player1.onColorChange = async color => {
        document.body.style.setProperty('--player1Color', hexToRgb(color));
        context.updateBg();
        context.updateGameboard();

        canvasItems.canvasO = createOCanvas(color);
        canvasItems.canvasOurl = await getCanvasUrl(canvasItems.canvasO);
        setCursor(getRightCursor());
    }
    player1.onNameChanged = () => context.updateGameboard();
    player2.onNameChanged = () => context.updateGameboard();

    player2.onColorChange = async color => {
        document.body.style.setProperty('--player2Color', hexToRgb(color));
        context.updateBg();
        context.updateGameboard();

        canvasItems.canvasX = createXCanvas(color);
        canvasItems.canvasXurl = await getCanvasUrl(canvasItems.canvasX);
        setCursor(getRightCursor());
    }


    return (
        <GameContext.Provider value={context}>
            <Sides updateCount={updateCounts.bgCount}></Sides>
            <Main updateCount={updateCounts.gameCount}></Main>
        </GameContext.Provider>
    )
}

// ---------------------------------------------------------------------
//                              Background sides
// ---------------------------------------------------------------------

function Sides({updateCount}){
    const {game, player1} = React.useContext(GameContext);

    let playerNumber = game.isGameClosed() ? game.getWonPlayerNum() : game.getNextPlayerNumber();
    const isPlayer1 = playerNumber === player1.getPlayerNumber();

    return (
        <div className="sides" data-update={updateCount}>
            <BackgroundSide classList={"side-left player1" + (isPlayer1 ? ' active' : '')}></BackgroundSide>
            <BackgroundSide classList={"side-right player2" + (!isPlayer1 ? ' active' : '')}></BackgroundSide>
        </div>
    )
}

function BackgroundSide({ classList }){
    return (
        <div className={classList}>
            <div className="game-item"></div>
        </div>
    )
}


// ---------------------------------------------------------------------
//                              Main
// ---------------------------------------------------------------------

function Main({updateCount}){
    const value = React.useContext(GameContext);

    let mainOnClick = (evt) => {
        if(value.game.isGameClosed())
            if(evt.target.classList.contains('main'))
                value.makeConfettiRain();
    }

    return (
        <div className="main" data-update={updateCount} onClick={evt => mainOnClick(evt)}>
            <PlayerDataWrapper onRightSide={true} onTop={true} isPlayer1={false}></PlayerDataWrapper>
            <GameBoard></GameBoard>
            <PlayerDataWrapper onRightSide={false} onTop={false} isPlayer1={true}></PlayerDataWrapper>
        </div>
    )
}

// ---------------------------------------------------------------------
//                              Player data
// ---------------------------------------------------------------------

function PlayerDataWrapper({ onRightSide, onTop, isPlayer1 }){
    const value = React.useContext(GameContext);

    let playerObj = isPlayer1 ? value.player1 : value.player2;
    let playerScore = playerObj.getOverallPoints();

    let mainContent;

    if(onTop){
        mainContent = (
            <>
                <PlayerDataInput player={isPlayer1 ? value.player1 : value.player2} isColorFirst={!isPlayer1}></PlayerDataInput>
                <ScoreCounter scoreToShow={playerScore} onRightSide={onRightSide} isPlayer1={isPlayer1}></ScoreCounter>
            </>
        )
    }
    else{
        mainContent = (
            <>
                <ScoreCounter scoreToShow={playerScore} onRightSide={onRightSide} isPlayer1={isPlayer1}></ScoreCounter>
                <PlayerDataInput player={isPlayer1 ? value.player1 : value.player2} isColorFirst={!isPlayer1}></PlayerDataInput>
            </>
        )
    }

    return (
        <div className={"player-data-wrapper flex-" + (onRightSide ? 'right' : 'left')}>
            <div className={'player-data-box player-box-' + (onTop ? 'top' : 'bottom')}>
                {mainContent}
            </div>
        </div>
    )
}

function ScoreCounter({scoreToShow, onRightSide, isPlayer1}){
    return (
        <div className={"player-score flex-" + (onRightSide ? 'right' : 'left') + " player" + (isPlayer1 ? '1' : '2')}>
            <div className="score-display" title={"Score: " + scoreToShow}>
                {range(1, scoreToShow).map(num => <div key={num} className="game-item score-game-item"></div>)}
            </div>
        </div>
    )
}

function PlayerDataInput({ player, isColorFirst }){

    let setPlayerColor = ev => {
        player.setColor(ev.target.value);
    }

    let setPlayerName = ev => {
        player.setName(ev.target.value);
    }

    if(isColorFirst){
        return (
            <div className="name-input">
                <ColorInput playerColor={player.getColor()} playerSetColor={setPlayerColor}></ColorInput>
                <NameInput playerName={player.getName()} playerSetName={setPlayerName}></NameInput>
            </div>
        )
    }

    return (
        <div className="name-input">
            <NameInput playerName={player.getName()} playerSetName={setPlayerName}></NameInput>
            <ColorInput playerColor={player.getColor()} playerSetColor={setPlayerColor}></ColorInput>
        </div>
    )
}

function ColorInput({playerColor, playerSetColor}){
    return <input type="color" value={playerColor} onInput={playerSetColor}/>
}

function NameInput({playerName, playerSetName}){
    let [playerNameState, setState] = React.useState(playerName);

    function changePlayerName(evt){
        let newName = evt.target.value;
        setState(newName);
        playerSetName(evt);
    }

    return <input tabIndex="1" type="text" value={playerNameState} onChange={evt => changePlayerName(evt)}/>
}


// ---------------------------------------------------------------------
//                              Game board
// ---------------------------------------------------------------------

function GameBoard(){
    return (
        <div className="game">
            <div className="grid-container">
                {range(0, 8).map(num => <GameCell key={num} cellNumber={num}></GameCell>)}
            </div>
            <div className="game-bottom">
                <ResetGameButton></ResetGameButton>
                <StatusMessage></StatusMessage>
            </div>
        </div>
    )
}

function ResetGameButton(){
    const {game} = React.useContext(GameContext);

    return (
        <div className="reset-button">
            <button onClick={() => game.reset()}>Reset</button>
        </div>
    )
}

function StatusMessage(){
    const {game} = React.useContext(GameContext);

    return (
        <div className="status-message">
            {game.getStatusMessage()}
        </div
    >)
}

function GameCell({cellNumber}){
    let [state, setState] = React.useState({shouldShake: false, update: 0})
    let {shouldShake, update} = state;

    const value = React.useContext(GameContext);

    let game = value.game;
    let shake = shouldShake ? ' shake' : '';
    if(shouldShake)
        setTimeout(() => setState({...state, shouldShake: false}), 200);

    let playerClass = !game.isCellEmpty(cellNumber) ? (
        game.isPlayer1OnCell(cellNumber) ? ' player1' : ' player2'
        ) : '';

    let winnerCellClass = game.isGameClosed() && game.isWinnerCellIndex(cellNumber) ? ' winner-animation' : '';

    let onCellPress = () => {
        if(game.isGameClosed())
            return;

        if(game.isCellEmpty(cellNumber)){
            game.setCell(cellNumber);
            setState({...state, update: update + 1});
        }
        else{
            setState({...state, shouldShake: true});
        }
    }

    let onCellEnter = e => {
        if(e.key === 'Enter')
            onCellPress()
    }


    return (
        <div tabIndex="4" className={"grid-cell" + playerClass + winnerCellClass} onKeyPress={onCellEnter} onClick={onCellPress}>
            <div className={"game-item " + shake}></div>
        </div>
    )
}