const cartInitialState = {
    isLoading: false,
    data: [],
    errors: null
};

const cartReducer = (state = cartInitialState, action) => {
    switch (action.type) {
        case 'SET_CART': {
            return { ...state, isLoading: false, data: [...action.payload], errors: null };
        }
        case 'ADD_CART': {
            return { ...state, data: [...state.data, { ...action.payload }] };
        }
        case 'REMOVE_CART': {
            const updatedData = state.data.filter(item => item.productId !== action.payload.productId);
            return { ...state, data: updatedData, errors: null };
        }
        case 'CLEAR_CART':
            return {
                ...state,
                data: []
            };
        default: {
            return state;
        }
    }
};

export default cartReducer;