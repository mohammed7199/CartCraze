import axios from "axios"
import swal from 'sweetalert'

export const getProductById = (productId) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const product = response.data;
        dispatch(setProduct(product));
        return product;
      } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
      }
    };
  };

// The action to set the product in the Redux store
export const setProduct = (product) => {
    return {
        type: 'SET_SINGLE_PRODUCT',
        payload: product,
    };
};


export const startGetProducts = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        axios.get('/api/products', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            const result = response.data;
            dispatch(setProducts(result));
        })
        .catch((error) => {
            console.log(error);
        });
    }
}


export const setProducts = (products) => {
    return {
        type: 'SET_PRODUCTS',
        payload: products
    }
}

export const startCreateProduct = (productData, suppId, redirect) => {
    return (dispatch) => {
        axios.post(`/api/products`, productData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "multipart/form-data",
            }
        })
        .then((response) => {
            const result = response.data;
            dispatch(addProduct(result));
            swal('Success', 'Product added successfully', 'success');
            redirect();
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.errors) {
                const formErrors = {};
                error.response.data.errors.forEach((err) => {
                    formErrors[err.path] = err.msg;
                });
                dispatch(setErrors(formErrors));
                swal('Error', 'Failed to add product', 'error');
            } else {
                dispatch(handleError(error));
                swal('Error', 'Failed to add product', 'error');
            }
        });
    };
};

// New action to set errors
export const setErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        payload: errors,
    };
};


export const addProduct = (product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: product
    }
}

export const handleError = (error) => {
    return {
        type: 'HANDLE_ERROR',
        payload: error,
    };
};

export const startEditProduct = (editedData, productId, closeModal) => {
    return (dispatch) => {
        axios.put(`/api/products/${productId}`, editedData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            const result = response.data;
            closeModal();
            dispatch(updateProduct(result));
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.errors) {
                const formErrors = {};
                error.response.data.errors.forEach((err) => {
                    formErrors[err.path] = err.msg;
                });
                dispatch(setErrors(formErrors));
            } else {
                dispatch(handleError(error));
            }
        });
    };
};

export const updateProduct = (result) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: result
    }
}

export const startDeleteProduct = (productId) => {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_PRODUCT_REQUEST' });

        axios.delete(`/api/products/${productId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const result = response.data;
                dispatch({ type: 'REMOVE_PRODUCT_SUCCESS', payload: result.productId });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: 'REMOVE_PRODUCT_FAILURE', payload: error });
            });
    }
};

export const removeProduct = (productId) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: productId
    }
}