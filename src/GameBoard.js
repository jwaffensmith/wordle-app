import ActiveRow  from "./rows/ActiveRow";
import InactiveRow from "./rows/InactiveRow";
import CompletedRows from "./rows/CompletedRows";

const GameBoard = ( { word, wordsGuessed, rowIndex, guess, gameStatus, showAlert } ) => {
    
    return (
        <div className="mx-1 flex justify-center">
            <div className="
            flex 
            justify-items-center 
            bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 
            mb-5 
            rounded-lg 
            drop-shadow-2xl
           ">
                <div className="
                grid grid-cols-5 
                justify-items-center 

                gap-x-4
                gap-y-2.5
                mx-9
                my-5

                md:gap-x-5
                md:gap-y-3
                md:mx-10
                md:my-5
                ">
                <CompletedRows wordsGuessed={wordsGuessed} guess={guess} word={word} rowIndex={rowIndex}/>

                { rowIndex <= 5 && gameStatus !== "You won!" ?
                    (<ActiveRow guess={guess} showAlert={showAlert}/>) : (<></>)
                }

                { gameStatus !== "You won!" ?
                (Array.from({length: 5 - wordsGuessed.length}).map((_, index) => {
                    return <InactiveRow key={index} />
                })) : 
                ((Array.from({length: 6 - wordsGuessed.length}).map((_, index) => {
                    return <InactiveRow key={index} />
                })))
                }
                </div> 
            </div>
        </div>
    )
};

export default GameBoard;