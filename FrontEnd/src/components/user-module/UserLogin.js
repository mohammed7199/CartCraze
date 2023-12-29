import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startUserLogin } from '../../actions/userAction'
import Heading from "../reusables/Heading";
import validator from "validator"
import Button from '../reusables/Button'

const UserLogin = (props) => {
    const { history } = props
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const dispatch = useDispatch()
    const errors = {}

    //Validation
    const runValidation = () => {
        if (name.trim().length === 0) {
            errors.name = '*Required'
            setFormErrors(errors)
        } else if (!validator.isEmail(name.trim())) {
            errors.name = 'Invalid Email'
            setFormErrors(errors)
        } if (password.trim().length === 0) {
            errors.password = '*Required'
            setFormErrors(errors)
        }
    }

    const handleChange = (e) => {
        const checkName = e.target.name
        const value = e.target.value
        if (checkName === 'Email') {
            setName(value)
        } else if (checkName === 'password') {
            setPassword(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        setFormErrors(errors)
        if (Object.keys(errors).length === 0) {
            const loginData = {
                username: name,
                password
            }
            const redirect = () => {
                history.push('/')
            }
            dispatch(startUserLogin(loginData, redirect))
        }
    }

    return (
        <div className="container my-5">
            <Heading
                className="mb-4"
                type="h3"
                title="Login here"
            />
            <form onSubmit={handleSubmit} >
                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <input className="form-control" type='text' name='Email' value={name} onChange={handleChange} placeholder="Enter your Email" />
                        {formErrors.name ? <div className="text-danger">{formErrors.name}</div> : null}
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <input className="form-control" type='password' name='password' value={password} onChange={handleChange} placeholder="Password" />
                        {formErrors.password ? <div className="text-danger">{formErrors.password}</div> : null}
                    </div>
                </div>

                <input className="btn btn-primary" type='submit' value='Login' />

                <Button
                    className="btn btn-outline-secondary mx-4"
                    type="button"
                    value="Cancel"
                    handleClick={() => {
                        props.history.push('/')
                    }}
                />
            </form>
        </div>
    )
}

export default UserLogin