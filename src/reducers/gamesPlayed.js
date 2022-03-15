let initialState = {
    gamesPlayed: 0,
};

const gamesPlayed = (state = initialState, action) => {

    switch (action.type) {
        case "CHANGE_GAMES_PLAYED":
            return { 
                ...state,
                gamesPlayed: action.payload,
            };
        default:
            return state; 
    }
};

export default gamesPlayed;