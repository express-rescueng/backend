const initialState = {
    loading: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_LOADING':
            return { ...state, loading: !state.loading };
        default:
            return state;
    }
};

export default rootReducer;