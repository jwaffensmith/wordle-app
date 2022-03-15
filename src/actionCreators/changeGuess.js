export default function changeGuess(guess) {
    return { type: "CHANGE_GUESS", payload: guess };
}