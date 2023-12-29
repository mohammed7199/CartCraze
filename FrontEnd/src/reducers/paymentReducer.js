const initialState={
    address:[],
    addressError:''
}

const paymentReducer=(state=initialState,action)=>{
    switch (action.type) {
        case 'ADDRESSERROR':{
            return {...state,addressError:action.payload}
        }
        case 'ALLADDRESSES':{
            return {...state,address:action.payload}
        }
        case 'ADDADDRESS':{
            return {...state,address:[...state.address,action.payload]}
        }
        case 'DELETEADDRESS':{
            const deletedArray=state.address.filter(ele=>{
                return ele._id!==action.payload._id
            })
            return {...state,address:deletedArray}
        }
        default:{
            return state
        }
       
    }
}

export default paymentReducer