const userIntialState={
    isLogin:false,
    data:{} 
}

const userReducer=( state=userIntialState,action)=>{
    switch(action.type){
        case "USER_LOGGEDIN" : {
            return { ...state, isLogin : !state.isLogin }
        }
        case "USERLOGIN" : {
            return {...state, data : {...action.payload}}
        }
        case 'USER_EDITED_ACCOUNT' : {
            return { ...state, data : { ...state.data, ...action.payload } }
        }
        case 'SET_LOGOUT_TIMER': {
            return { ...state, logoutTimer: action.payload };
          }
          case 'LOGOUT_USER': {
            return { ...state, isLogin: false, data: {}, logoutTimer: null };
          }
        default: {
            return state 
        }
    }
} 

export default userReducer