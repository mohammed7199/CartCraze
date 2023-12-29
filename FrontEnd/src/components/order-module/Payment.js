import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAddAddressError, stateAddAddress, stateAllAddresses, stateDeleteAddress } from "../../actions/actionGenerator";
import Heading from "../reusables/Heading";
import { setCart, startDeleteCart } from "../../actions/cartActions";
import swal from "sweetalert";
import { MdDelete } from "react-icons/md"

const Payment = (props) => {
    const dispatch = useDispatch()

    const cartData = useSelector((state) => {
        return state.cart.data
    })

    const [landmark, setLandMark] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')

    const [method, setMethod] = useState('')
    const [selectAddress, setSelectAddress] = useState('')
    const [addressToggle, setAddressToggle] = useState(false)
    const paymentMethods = ['debit card', 'credit card', 'paytm UPI', 'phonepay UPI']
    const [formErrors, setErrors] = useState({})
    const errors = {}
    const paymentAddress = useSelector((state) => {
        return state.paymentData.address
    })
    const addressError = useSelector((state) => {
        return state.paymentData.addressError
    })
    const handleChange = (e) => {
        const input = e.target.name
        const value = e.target.value
        if (input === 'method') {
            setMethod(value)
        }
        if (input === 'addresses') {
            setSelectAddress(value)
        }
        if (input === 'landmark') {
            setLandMark(value)
        }
        if (input === 'city') {
            setCity(value)
        }
        if (input === 'state') {
            setState(value)
        }
        if (input === 'pincode') {
            setPincode(value)
        }
    }

    useEffect(() => {
        if (addressError === '') {
            setAddressToggle(false)
        }
        else {
            setAddressToggle(true)
        }
    }, [addressError])

    useEffect(() => {
        dispatch(stateAllAddresses())
    }, [])

    const handleSave = (e) => {
        e.preventDefault()
        const formData = {
            landmark,
            city,
            state,
            pincode
        }
        dispatch(stateAddAddress(formData))
        setAddressToggle(false)
        setLandMark('')
        setCity('')
        setState('')
        setPincode('')
    }

    const runCallback = () => {
        if (method === '') {
            errors.method = 'please select the card'
        }
        if (selectAddress === '') {
            errors.selectAddress = 'please select the address'
        }
    }

    const handleOrder = () => {
        runCallback()
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
        }
        else {
            setErrors({})
            const data = {
                method,
                selectAddress

            }
            setSelectAddress('')
            setMethod('')
            setAddressToggle(false)
            dispatch(setAddAddressError(''))
            // alert('order placed successfully')
            swal({
                title: "Order Placed Successfully",
                icon: "success",
            });
            dispatch(setCart([]))
            for (const ele of cartData) {
                dispatch(startDeleteCart(ele._id))
            }
            props.history.push('/')
        }
    }

    return (
        <div className="container mt-5">
            <Heading
                className="mb-1"
                type="h3"
                title="Select Address"
            />
            {paymentAddress.length > 0 ? (
                <>
                    {formErrors.selectAddress && <p className="text-danger">{formErrors.selectAddress}</p>}
                    {
                        paymentAddress.map((address, i) => {
                            return (
                                <div key={i}>
                                    <div className="form-check">

                                    </div>
                                    <input className="form-check-input" type='radio' name='addresses' value={address._id} onChange={handleChange} checked={selectAddress == address._id} />
                                    <span className="mx-3">
                                        {`${address.landmark}-${address.city}-${address.state}-${address.pincode}`}
                                    </span>
                                    <span onClick={() => {
                                        dispatch(stateDeleteAddress(address._id))
                                    }}><MdDelete size="1.5rem" />
                                    </span >
                                </div>
                            )
                        })
                    }
                </>
            ) : (
                <p>No Address, Add your first Address</p>
            )}

            <button className="btn btn-outline-info mt-4" onClick={() => { setAddressToggle(true) }}>Add address</button>
            <div className="mt-2 mb-4">
                {addressError && <p style={{ color: 'red' }}>!{addressError}!</p>}
            </div>

            {addressToggle && (
                <form>
                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' name='landmark' placeholder="landmark" value={landmark} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' name='city' placeholder="city" value={city} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' name='state' placeholder="state" value={state} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' name='pincode' placeholder="pincode" value={pincode} onChange={handleChange} />
                        </div>
                    </div>

                    <button className="btn btn-success me-3" onClick={handleSave}>Save</button>
                    <button className="btn btn-secondary" onClick={(e) => {
                        e.preventDefault()
                        dispatch(setAddAddressError(''))
                        setAddressToggle(false)
                        setLandMark('')
                        setCity('')
                        setState('')
                        setPincode('')
                    }}>Cancel</button>

                </form>
            )}
            <hr />

            <h3>Select Payment Method</h3>
            {formErrors.method && <p className="text-danger">{formErrors.method}</p>}

            <div className='row mb-4'>
                <div className='col-md-4'>
                    <select className='form-select' name='method' value={method} onChange={handleChange}>
                        <option value=''>--Select--</option>
                        {paymentMethods.map((method, i) => {
                            return <option key={i} value={method}>{method}</option>
                        })}
                    </select>
                </div>
            </div>

            {method === 'debit card' && (
                <form>
                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' placeholder="Enter Debit card Number...." />
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' placeholder="CVV" />
                        </div>
                    </div>


                </form>
            )}

            {method === 'credit card' && (
                <form>
                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' placeholder="Enter ur Credit card number" />
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' placeholder="Cvv" />
                        </div>
                    </div>


                </form>
            )}

            {method === 'paytm UPI' && (
                <form>
                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' placeholder="Enter UPI ID..." />
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' placeholder="password" />
                        </div>
                    </div>
                </form>
            )}

            {method === 'phonepay UPI' && (
                <form>
                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' placeholder="Enter phonepay UPI..." />
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col-md-4'>
                            <input className='form-control' type='text' placeholder="password" />
                        </div>
                    </div>


                </form>
            )}

            <button className="btn btn-outline-primary" onClick={handleOrder}>Confirm Order</button>
        </div>
    )
}
export default Payment