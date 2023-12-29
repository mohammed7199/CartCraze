const productsInitialState = {
    isLoading: false,
    data: [],
    errors: {}
}

const productsReducer = (state = productsInitialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS': {
            return { ...state, isLoading: false, data: [...action.payload], errors: {} };
        }
        case 'SET_SINGLE_PRODUCT':
            return {
                ...state,
                product: action.payload,
            };
        case 'ADD_PRODUCT': {
            return { ...state, isLoading: false, data: [...state.data, { ...action.payload }], errors: {} };
        }
        case 'SET_FILTERED_PRODUCTS':
            return {
                ...state,
                filteredProducts: action.payload,
            }
        case 'UPDATE_PRODUCT': {
            const result = state.data.map((product) => (product._id === action.payload._id ? { ...product, ...action.payload } : { ...product }));
            return { ...state, isLoading: false, data: [...result], errors: {} };
        }
        case 'REMOVE_PRODUCT_REQUEST': {
            return { ...state, isLoading: true, errors: {} };
        }
        case 'REMOVE_PRODUCT_SUCCESS': {
            const result = state.data.filter((product) => product._id !== action.payload);
            return { ...state, isLoading: false, data: [...result], errors: {} };
        }
        case 'REMOVE_PRODUCT_FAILURE': {
            return { ...state, isLoading: false, errors: action.payload };
        }
        case 'HANDLE_ERROR': {
            return { ...state, error: action.payload };
        }
        case 'SET_ERRORS':
            return {
                ...state,
                formErrors: action.payload,
            };
        default: {
            return state;
        }
    }
}

export default productsReducer;