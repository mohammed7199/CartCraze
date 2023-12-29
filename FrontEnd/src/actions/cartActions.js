import axios from "axios"

export const startGetCart = (userId) => {
    return (dispatch) => {
        axios.get(`/api/cart/${userId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(setCart(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const setCart = (cartItems) => {
    return {
        type: 'SET_CART',
        payload: cartItems
    }
}

export const startAddToCart = (cartBody, productId) => {
    return (dispatch) => {
        axios.post(`/api/cart`, cartBody, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(addCart(result))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const addCart = (cartItem) => {
    return {
        type: "ADD_CART",
        payload: cartItem
    }
}

export const startDeleteCart = (userId, productId) => {
    return async (dispatch) => {
        try {
            const { data: updatedCart } = await axios.delete(`/api/cart/${userId}/${productId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(removeCart(updatedCart));
        } catch (error) {
            console.error(error);
        }
    }
}

export const startDeleteAllProductsFromCart = (userId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/cart/${userId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(clearCart());
        } catch (error) {
            console.error(error);
        }
    }
}

export const removeCart = (cart) => {
    return {
        type: "REMOVE_CART"
    }
}

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}