import { useState, useEffect } from 'react';

const SubmittedRow = ( { guess, word } ) => {

    const [ currentEvaluation, setCurrentEvaluation ] = useState([]);

    useEffect(() => {
        checkGuesses();
	}, []);

    function checkGuesses() {
        let checkLetter = []
        for (let i=0; i<guess.length; i++) {
            if (guess[i] === word[i]) {
                checkLetter.push("correct")
            } else if (guess[i] !== word[i] && word.includes(guess[i])) {
                checkLetter.push("present")
            } else if (!word.includes(guess[i])) {
                checkLetter.push("absent")
            }
        } return (
                setCurrentEvaluation(checkLetter)
        )

    };

    return (
        <>
        {currentEvaluation.map((evaluation, index) => (
            <div className={`rounded-sm p-3 md:p-6 drop-shadow-xl border-solid border-2 animate-fade-in-down outline-slate-200 outline ${evaluation === "present" ? "bg-yellow-400 border-yellow-300" : ''} ${evaluation === "absent" ? "bg-gray-500 border-gray-400 " : ''} ${evaluation === "correct" ? "bg-green-600 border-green-400" : ''}`} data-state={evaluation} key={index}>{guess[index]}</div> 
        ))}
    </>
    )
};

export default SubmittedRow;
