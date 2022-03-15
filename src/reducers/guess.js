let initialState = {
    guess: [],
};

const guess = (state = initialState, action) => {

    switch (action.type) {
        case "CHANGE_GUESS":
            return { 
                ...state,
                guess: action.payload,
            };
        default:
            return state; 
    }
};

export default guess;