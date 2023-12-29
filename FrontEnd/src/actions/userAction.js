import axios from 'axios'
import Swal from 'sweetalert2'
import { startGetCart } from './cartActions'

let registrationCount = 0;

export const startRegisterUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('/api/auth/register', formData)
            .then((res) => {
                const result = res.data;
                if (result.hasOwnProperty('errors')) {
                    alert(result.message);
                } else {
                    registrationCount++;
                    const accountType = registrationCount === 1 ? 'Admin' : 'User';

                    Swal.fire({
                        icon: 'success',
                        title: `Your new ${accountType} Account has been Created`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    redirect();
                }
            })
            .catch((error) => {
                const errorMessage = error.response ? error.response.data.msg : 'An error occurred';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage
                });
            });
    };
};

export const startUserLogin = (loginData, redirect) => {
    return (dispatch) => {
        axios.post('/api/auth/login', loginData)
            .then((res) => {
                const result = res.data;
                if (result.hasOwnProperty('errors')) {
                    alert(result.errors);
                } else {
                    localStorage.setItem("token", result.token);
                    localStorage.setItem("role", result.role);
                    dispatch(userLoggedIn());
                    dispatch(startGetUserAccountDetails(result._id));
                    dispatch(startGetCart());
                    dispatch(setLogoutTimer());
                    Swal.fire({
                        icon: 'success',
                        title: 'SucessFully Logged In',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    redirect();
                }
            })
            .catch((error) => {
                const errorMessage = error.response ? error.response.data.msg : 'An error occurred';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage
                });
            });
    }
}

export const setLogoutTimer = () => {
    return (dispatch) => {
        const expirationTime = 600000; // 10 minutes
        const logoutTimer = setTimeout(() => {
            dispatch(logoutUser());
        }, expirationTime);

        // Save the timer ID and expiration time in localStorage
        localStorage.setItem('logoutTimer', logoutTimer);
        localStorage.setItem('logoutExpiration', Date.now() + expirationTime);

        dispatch({ type: 'SET_LOGOUT_TIMER', payload: logoutTimer });
    };
};


export const clearLogoutTimer = () => {
    return (dispatch) => {
        const logoutTimer = localStorage.getItem('logoutTimer');
        const expirationTime = localStorage.getItem('logoutExpiration');

        if (logoutTimer && expirationTime && Date.now() < expirationTime) {
            clearTimeout(logoutTimer);
        }

        // Remove the timer ID and expiration time from localStorage
        localStorage.removeItem('logoutTimer');
        localStorage.removeItem('logoutExpiration');
    };
};


export const logoutUser = () => {
    return (dispatch) => {
        dispatch(clearLogoutTimer());
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT_USER' });
    };
};


export const userLoggedIn = () => {
    return {
        type: 'USER_LOGGEDIN'
    }
}

export const startGetUserAccountDetails = (id) => {
    return (dispatch) => {
        axios.get(`/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                dispatch(userLoginInfo(response.data))
            })
            .catch((error) => {
                const errorMessage = error.response ? error.response.data.msg : 'An error occurred';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage
                });
            });
    }
}

export const userLoginInfo = (result) => {
    return {
        type: "USERLOGIN",
        payload: result
    }
}

export const startEditUserAccount = (id, formData, handleClose) => {
    return (dispatch) => {
        axios.put(`/api/users/${id}`, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                dispatch(userEditedAccount(response.data))
                handleClose()
            })
            .catch((error) => {
                const errorMessage = error.response ? error.response.data.msg : 'An error occurred';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage
                });
            });
    }
}

export const userEditedAccount = (data) => {
    return {
        type: 'USER_EDITED_ACCOUNT',
        payload: data
    }
}