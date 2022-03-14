import { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import getLocalStorageKey from "./helpers/getLocalStorageKey";
import Modal from "./modals/Modal";
import Alert from "./modals/Alert";
import words from "./words.json"
import useEventListener from "./hooks/useEventListener"

const GameContainer = ({ word }) => {
    
    // word guesses
    const [ guess, setGuess ] = useState([]);
    const [ guessedWords, setGuessedWords ] = useState([]);
    const [ rowIndex, setRowIndex ] = useState(0);

    // add classes to virtual keyboard buttons
    const [ presentLetters, setPresentLetters ] = useState(' ');
    const [ absentLetters, setAbsentLetters ] = useState(' ');
    const [ correctLetters, setCorrectLetters ] = useState(' ');

    // game stats
    const [ gameStatus, setGameStatus ] = useState("");
    const [ gamesWon, setGamesWon ] = useState(0)
    const [ gamesPlayed, setGamesPlayed ] = useState(0);
    const [ startGame, setStartGame ] = useState(0);
    const [ totalTime, setTotalTime ] = useState("");

    // end of game modal
    const [ showModal, setShowModal ] = useState(false);
    const handleModalClose = () => setShowModal(false);
    const modalOpen = () => setShowModal(true);

    // Error banner
    const [ alertMessage, setAlertMessage ] = useState("")
    const [ showAlert, setShowAlert ] = useState(false);
    const handleAlertClose = () => setShowAlert(false);
    const alertOpen = () => {
        setShowAlert(true);
        setTimeout(handleAlertClose, 2000);
    }

    useEffect(() => {
        const key = getLocalStorageKey("wordsGuessed");
        const guessWordList = JSON.parse(localStorage.getItem(key));
        if (guessWordList) {
            setGuessedWords(guessWordList)
        }
    }, []);

    useEffect(() => {
        const key = getLocalStorageKey("rowIndex");
        const row = JSON.parse(localStorage.getItem(key));
        if (row) {
            setRowIndex(row)
        }
    }, []);

    useEffect(() => {
        const key = getLocalStorageKey("gameStatus");
        const status = localStorage.getItem(key);
        if (status) {
            setGameStatus(status);
            if (status) {
                modalOpen();
            }
        }
    }, []);

    useEffect(() => {
        const key = getLocalStorageKey("wordsGuessed");
        const guessWordList = JSON.parse(localStorage.getItem(key));
        if (guessWordList) {
            setGuessedWords(guessWordList)
        }
    }, []);

    useEffect(() => {
        const key = getLocalStorageKey("wordsGuessed");
        const guessWordList = JSON.parse(localStorage.getItem(key));
        if (guessWordList) {
            setGuessedWords(guessWordList)
        }
    }, []);

    useEffect(() => {
        const correctLetterKey = getLocalStorageKey("correctLetters");
        const presentLetterKey = getLocalStorageKey("presentLetters");
        const absentLetterKey = getLocalStorageKey("absentLetters");
        const startGameKey = getLocalStorageKey("startGame");
        const totalTimeKey = getLocalStorageKey("totalTime");
        const correctLetterClass = localStorage.getItem(correctLetterKey);
        const presentLetterClass = localStorage.getItem(presentLetterKey);
        const absentLetterClass = localStorage.getItem(absentLetterKey);
        const startGameTimestamp = JSON.parse(localStorage.getItem(startGameKey));
        const totalTimeCalculation = JSON.parse(localStorage.getItem(totalTimeKey));

        if (correctLetterClass) {
            setCorrectLetters(correctLetterClass)
        } 
        if (presentLetterClass) {
            setPresentLetters(presentLetterClass)
        } 
        if (absentLetterClass) {
            setAbsentLetters(absentLetterClass)
        } if (startGameTimestamp) {
            setStartGame(startGameTimestamp)
        } if (totalTimeCalculation) {
            setTotalTime(totalTimeCalculation)
    }
    }, []);

    useEffect(() => {
        const totalGames = JSON.parse(localStorage.getItem("gamesPlayed"));
        const totalWon = JSON.parse(localStorage.getItem("gamesWon"));
        if (totalGames) {
            setGamesPlayed(totalGames)
        }
        if (totalWon) {
            setGamesWon(totalWon)
        }
    }, []);

    useEffect(() => {
        const rowKey = getLocalStorageKey("rowIndex");
        const wordGuessKey = getLocalStorageKey("wordsGuessed");
        const statusKey = getLocalStorageKey("gameStatus");
        const presentLetterKey = getLocalStorageKey("presentLetters");
        const correctLetterKey = getLocalStorageKey("correctLetters");
        const absentLetterKey = getLocalStorageKey("absentLetters");
        const startGameKey = getLocalStorageKey("startGame");
        const totalTimeKey = getLocalStorageKey("totalTime");
        localStorage.setItem(`${rowKey}`, JSON.stringify(rowIndex));
        localStorage.setItem(`${wordGuessKey}`, JSON.stringify(guessedWords));
        localStorage.setItem(`${statusKey}`, gameStatus);
        localStorage.setItem(`${presentLetterKey}`, presentLetters);
        localStorage.setItem(`${correctLetterKey}`, correctLetters);
        localStorage.setItem(`${absentLetterKey}`, absentLetters);
        localStorage.setItem(`${startGameKey}`, JSON.stringify(startGame));
        localStorage.setItem(`${totalTimeKey}`, JSON.stringify(totalTime));
	}, [rowIndex, guessedWords, gameStatus, presentLetters, correctLetters, absentLetters, startGame, totalTime]);


    useEffect(() => {
        localStorage.setItem("gamesPlayed", JSON.stringify(gamesPlayed));
        localStorage.setItem("gamesWon", JSON.stringify(gamesWon));
    }, [gamesPlayed, gamesWon]);


    function virtualKeyboardClasses() {
        let presentLetterArr = [];
        let correctLetterArr = [];
        let absentLetterArr = [];

        for (let i=0; i<guess.length; i++) {
            if (guess[i] === word[i]) {
                correctLetterArr.push(guess[i])
            } else if (guess[i] !== word[i] && word.includes(guess[i])) {
                presentLetterArr.push(guess[i])
            } else if (!word.includes(guess[i])) {
                absentLetterArr.push(guess[i])
                }
            }
    
            return (
                setCorrectLetters((prev) => prev + " " + correctLetterArr.join(' ')),
                setPresentLetters((prev) => prev + " " + presentLetterArr.join(' ')),
                setAbsentLetters((prev) => prev + " " + absentLetterArr.join(' '))
            )
    };

    function checkWordList() {
        const wordGuess = guess.join('');
        if (words.includes(wordGuess.toLowerCase())) {
            setGuessedWords((prev) => [...prev, guess.join('')]);
            setGuess([]);
            setRowIndex((index) => (index + 1));
            virtualKeyboardClasses();
            if (guess.join('') === word) {
                winGame();
                setAlertMessage("Splendid");
                alertOpen();
            } else if (guess.join('') !== word && rowIndex === 5) {
                loseGame();
                setAlertMessage(word);
                alertOpen();
            } 
        } else {
            setAlertMessage("Not in word list")
            alertOpen()
        }
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }

    function calculateTotalTime() {
        const endGameTimestamp = Date.now()
        console.log(endGameTimestamp);
        const total = endGameTimestamp - startGame
        let seconds = Math.floor(total / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;
        return setTotalTime(`${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`)
    }

    function winGame() {
        setGameStatus("You won!");
        setGamesPlayed((prev) => (prev + 1));
        setGamesWon((prev) => (prev + 1));
        setRowIndex((index) => (index + 1));
        calculateTotalTime();
        return modalOpen();
    };

    function loseGame() {
        setGameStatus("Bummer, try again tomorrow.");
        setGamesPlayed((prev) => (prev + 1))
        calculateTotalTime();
        return modalOpen();
    }

    useEventListener("keydown", ({key}) => { 
        key = key.toUpperCase(); 
        onKeyPress(key) 
    });

    const onKeyPress = button => {
        // check if button pressed is a letter
        const isLetter = /^[A-Z]$/.test(button);
        // assign backspace button 
        const isBackspace = button === '{backspace}' 
        // assign enter button 
        const isEnter = button === '{enter}'
        // assign var to complete guess of 5 letters
        const isGuessComplete = guess.length === 5;
        // assign var to game starting 
        const gameInProgress = guess.length === 0 && rowIndex === 0;

        // set timestamp on first keystroke
        if (isLetter && gameInProgress) {
            setGameStatus("IN_PROGRESS");
            const time = Date.now()
            setStartGame(time);
        }

        // delete input
        if (isBackspace) {
            setGuess((prev) => {
                const updatedGuess = [...prev];
                updatedGuess.pop();
                return updatedGuess
            });
        }
        
        // user cannot got to next row when guess is less than 5 letters
        if (isEnter && !isGuessComplete) {
            setAlertMessage("Not enough letters")
            alertOpen()
        // if less than 5 letters, continue to set state to guess
        } else if (isLetter && !isGuessComplete) {
            setGuess((prev) => [...prev, button]);

        // submit input when guess is 5 letters
        // check if word is in word list
        } else if (isGuessComplete && isEnter) {
            checkWordList();
        }
    }

    console.log(guess)

    return (
        <div>
            <main>
                <GameBoard 
                guess={guess}
                guessedWords={guessedWords}
                rowIndex={rowIndex}
                word={word}
                gameStatus={gameStatus}
                showAlert={showAlert}
                />
                <div className="mx-1 md:mx-48">
                    <Keyboard
                    useEventListener={useEventListener}
                    onKeyPress={onKeyPress}
                    physicalKeyboardHighlight={true}
                    physicalKeyboardHighlightPress={true}
                    theme={"hg-theme-default hg-layout-default myTheme"}
                    layout={{ 
                        'default': [ 
                        'Q W E R T Y U I O P', 
                        'A S D F G H J K L',
                        '{enter} Z X C V B N M {backspace}', 
                        ]
                    }}
                    buttonTheme= {[
                        {
                            class: "correct",
                            buttons: correctLetters
                        },
                        {
                            class: "present",
                            buttons: presentLetters
                        },
                        {
                            class: "absent",
                            buttons: absentLetters
                        },
                    ]}
                    />
                </div>
            </main>
            {showModal ? (
            <Modal>
                <div className="flex justify-center">
                    <div className="absolute inset-x-0 top-64 flex items-center justify-center">
                        <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
                            <div className="flex items-center justify-between">
                                <h5 className="px-3">Statistics</h5>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"  viewBox="0 0 24 24" stroke="currentColor" onClick={handleModalClose}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            { gameStatus === "IN_PROGRESS" ? (
                                <div className="mt-3 p-5 mx-3">
                                   <h4 className="mb-4 text-sm pt-3">Today's game is in progress.</h4>
                               </div>
                            ) : (
                                <div className="mt-3 p-5 mx-3">
                                    <p className="mb-4 text-lg pt-3">{gameStatus}</p>
                                    <p>{totalTime}</p>
                                    <p className="mb-4 text-sm">Time</p>
                                    <p>{gamesPlayed}</p>
                                    <p>{((gamesWon / gamesPlayed) * 100).toFixed(0)}</p>
                                    <p className="mb-4 text-sm">Win %</p>
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            </Modal>
        ) : null}
        { showAlert ? (
            <Alert>
                 <div className="container flex justify-center mx-auto">
                    <div className="absolute inset-x-0 top-24 flex items-center justify-center">
                        <div className="bg-zinc-800 text-white absolute
                        rounded-lg text-700 p-4 mt-20" role="alert">
                            <p className="font-bold">{alertMessage}</p>
                        </div>
                    </div>
                </div>
            </Alert>
        ) : null}
        </div>
    )
}

export default GameContainer; 