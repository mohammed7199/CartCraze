import supplierLoginRegister from "../reducers/supplierLoginReducer";

const initialState={
    supplierLogin : false,
    data: {}
}

describe('Supplier reducer test', () => {
    it('Initial State', () => {
        expect(supplierLoginRegister(undefined, {})).toEqual(initialState)
    })

    it('Supplier Logged In', () => {
        const action = {type: "SUPPLIER_LOGIN"}
        expect(supplierLoginRegister(undefined, action)).toEqual({
            ...initialState,
            supplierLogin: true
        })
    })
})