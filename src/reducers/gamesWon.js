let initialState = {
    gamesWon: 0,
};

const gamesWon = (state = initialState, action) => {

    switch (action.type) {
        case "CHANGE_GAMES_WON":
            return { 
                ...state,
                gamesWon: action.payload,
            };
        default:
            return state; 
    }
};

export default gamesWon;