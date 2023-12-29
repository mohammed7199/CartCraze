import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'

export const startsupplierLogin = (formData, redirect) => {
    return (dispatch) => {
      axios.post('/api/auth/login', formData)
        .then((response) => {
          const result = response.data;
          const decodedToken = jwt_decode(result.token);
          localStorage.setItem('token', result.token);
          localStorage.setItem('role', result.role);
          localStorage.setItem('tokenExpiration', decodedToken.exp * 1000);
          dispatch(supplierLoginedIn());
          dispatch(startGetSupplierAccountDetails(result._id));
          Swal.fire({
            icon: 'success',
            title: 'Successfully Logged In',
            showConfirmButton: false,
            timer: 2000
          });
          redirect();
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
  }

export const supplierLoginedIn = () => {
    return {
        type: 'SUPPLIER_LOGIN'
    };
};

export const startGetSupplierAccountDetails = (id) => {
    return (dispatch) => {
        axios.get(`/api/admin/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const data = response.data;
                dispatch(supplierData(data));
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

export const supplierData = (data) => {
    return {
        type: 'SUPPLIER_DATA',
        payload: data
    };
};

let registrationCount = 0;

export const startSupplierRegister = (formData, redirect) => {
    return (dispatch) => {
        axios.post('/api/auth/register', formData)
            .then((response) => {
                registrationCount++;
                const accountType = registrationCount === 1 ? 'Admin' : 'User';

                Swal.fire({
                    icon: 'success',
                    title: `Your new ${accountType} Account has been Created`,
                    showConfirmButton: false,
                    timer: 2000
                });
                redirect();
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

export const startSupplierAccountEdit = (id, formData, handleClose) => {
    return (dispatch) => {
        axios.put(`/api/admin/${id}`, formData, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                dispatch(supplierEditedAccount(response.data))
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

export const supplierEditedAccount = (data) => {
    return {
        type : 'SUPPLIER_EDITED_ACCOUNT',
        payload : data
    }
}

export const stateAddAddress=(formData)=>{
    return (dispatch)=>{
        axios.post('/api/address/register',formData)
        .then((Response)=>{
            const data=Response.data 
            if(data.hasOwnProperty('errors'))
            {
                dispatch(setAddAddressError(data.message))
            }
            else{
                dispatch(setAddAddressError(''))
                dispatch(setAddAddress(data))
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
export const setAddAddress=(data)=>{
    return{
        type:'ADDADDRESS',
        payload:data
    }
}
export const setAddAddressError=(error)=>{
    return {
        type:"ADDRESSERROR",
        payload:error
    }
}
export const stateAllAddresses=()=>{
    return(dispatch)=>{
        axios.get('/api/address')
        .then((Response)=>{
            const data=Response.data
            dispatch(setAllAddresses(data))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}
export const setAllAddresses=(data)=>{
    return{
        type:'ALLADDRESSES',
        payload:data
    }
}
export const stateDeleteAddress=(id)=>{
    return (dispatch)=>{
        axios.delete(`/api/address/${id}`)
        .then((Response)=>{
            const data=Response.data 
            dispatch(setDeleteAddress(data))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}
const setDeleteAddress=(data)=>{
    return{
        type:'DELETEADDRESS',
        payload:data
    }
}

