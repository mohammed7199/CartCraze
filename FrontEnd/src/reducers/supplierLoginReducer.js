const initialState={
    supplierLogin : false,
    data: {}
}
const supplierLoginRegister=(state=initialState,action)=>{
    switch (action.type) {
        case 'SUPPLIER_LOGIN' : {
            return { ...state, supplierLogin : !state.supplierLogin }
        }
        case 'SUPPLIER_DATA' : {
            return {...state, data: {...action.payload}}
        }
        case 'SUPPLIER_EDITED_ACCOUNT' : {
            return { ...state, data : { ...state.data, ...action.payload } }
        }
        default:{
            return state
        }   
    }
}
export default supplierLoginRegister 