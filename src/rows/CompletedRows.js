import SubmittedRow from "./SubmittedRow";

const SubmittedAttempts = ( { wordsGuessed, word, rowIndex } ) => {

    return (
        <>
            {wordsGuessed.map((guess, index) => (
             <SubmittedRow guess={guess} word={word} key={index} rowIndex={rowIndex} />
            ))}
        </>
    )
};

export default SubmittedAttempts;