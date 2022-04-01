import SubmittedRow from "./SubmittedRow";

const CompletedRows = ( { guessedWords, word, rowIndex } ) => {

    return (
        <>
            {guessedWords.map((guess, index) => (
             <SubmittedRow guess={guess} word={word} key={index} />
            ))}
        </>
    )
};

export default CompletedRows;