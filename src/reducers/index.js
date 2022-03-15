import { combineReducers } from "redux";
import guess from "./guess"
import gamesPlayed from "./gamesPlayed"
import gamesWon from "./gamesWon"

export default combineReducers({
    // guess: guess,
    guess,
    gamesPlayed,
    gamesWon
});