import userReducer from "../reducers/userReducer"

const userIntialState={
    isLogin:false,
    data:{} 
}

describe('User Reducer Test', () => {
    it('Return initial state', () => {
        expect(userReducer(undefined, {})).toEqual(userIntialState)
    })

    it('User login set to true', () => {
        const action = {type: 'USER_LOGGEDIN'}
        expect(userReducer(userIntialState, action)).toEqual({
            ...userIntialState,
            isLogin: true
        })
    })

    it('User Account Details', () => {
        const userIntialState = {
            isLogin: true,
            data: {}
        }

        const action = {
            type: "USERLOGIN",
            payload: {_id: 'usid01', name: "ram"}
        }

        expect(userReducer(userIntialState, action)).toEqual({
            isLogin: true,
            data: {...action.payload}
        })
    })

    it('User Edited Account Details', () => {
        const userIntialState = {
            isLogin: true,
            data: {_id: 'usid01', name: "ram murthy"}
        }

        const action = {
            type: "USER_EDITED_ACCOUNT", 
            payload: {_id: 'usid01', name: "ram murthy"}
        }

        expect(userReducer(userIntialState, action)).toEqual({
            isLogin: true,
            data: {...userIntialState.data, ...action.payload}
        })
    })
})
