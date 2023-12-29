import React, {useState} from 'react'
import Heading from '../reusables/Heading'
import { useDispatch } from 'react-redux'
import { startEditUserAccount, startRegisterUser } from '../../actions/userAction'
import validator from 'validator'
import Button from '../reusables/Button'

const UserRegister = (props)=>{
    const { _id, name : userName, username : userEmail, age : userAge, gender: userGender, handleClose } = props
    const dispatch = useDispatch()
    const [ name, setName ] = useState(userName ? userName : '')
    const [email, setEmail]= useState(userEmail ? userEmail : '')
    const [age, setAge] = useState(userAge ? userAge : '')
    const [gender, setGender]= useState(userGender ? userGender : '')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [formErrors,setFormErrors] = useState({})

    const errors={}

    //Validation    
    const runValidations = ()=>{
        if( name.trim().length === 0 ){
            errors.name = '*Required'
            setFormErrors(errors)
        }
        if(email.trim().length === 0){
            errors.email = '*Required'
            setFormErrors(errors)
        } else if( !validator.isEmail(email.trim()) ){
            errors.email = 'Invalid Email'
            setFormErrors(errors)
        }
        
        if(String(age).trim().length === 0){
            errors.age = '*Required'
            setFormErrors(errors)
        }  if(gender.trim().length === 0){
            errors.gender = '*Required'
            setFormErrors(errors)
        }  
        
        if(!_id){
            if(password.trim().length === 0){
                errors.password = '*Required'
                setFormErrors(errors)
            } else if(password.trim().length <8){
                errors.password = 'Password is too short'
                setFormErrors(errors)
            }
        }
    }

    const handleChange=(e)=>{
        const checkName =e.target.name
        const value = e.target.value
        if( checkName === 'name' ){
            setName(value)
        }else if(checkName === 'Email'){
            setEmail(value)
        } else if(checkName === 'age'){
            setAge(value)
        } else if(checkName === 'gender'){
            setGender(value)
        } else if(checkName === 'password'){
            setPassword(value)
        } else if(checkName === 'isAdmin'){
            setIsAdmin(!isAdmin)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        runValidations()
        setFormErrors(errors)
        if(Object.keys(errors).length === 0){
            const regData = {
                name,
                username : email,
                age,
                gender,
                password,
                isAdmin 
            }
            console.log(regData)

            const redirect = () => {
                props.history.push('/user/login') 
            }

            const updateData = {
                name,
                username : email,
                age,
                gender,
            }

            if(_id){
                dispatch(startEditUserAccount(_id, updateData, handleClose))
            }else{
                dispatch(startRegisterUser(regData, redirect))
            }
        }
    }

    return(
        <div className='container my-4'> 
            { !_id && (
                <Heading
                    className="mb-4"
                    type="h3"
                    title="Register here"
                />
            ) }
            <form onSubmit={handleSubmit} >
            <div className='row mb-3'>
                    <div className='col-md-6'>
                        <input className="form-control" type='text' name='name' value={name} onChange={handleChange} placeholder='Enter your Name'/> 
                        {formErrors.name ? <span className="text-danger">{formErrors.name}</span> : null} 
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-md-6'>
                        <input className="form-control" type='text' name='Email' value={email} onChange={handleChange} placeholder='Enter your Email'/> 
                        {formErrors.email ? <span className="text-danger">{formErrors.email}</span> : null} 
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-md-6'>
                        <input className="form-control" type='text' name='age' value={age} onChange={handleChange} placeholder='Enter your age'/> 
                        {formErrors.age ? <span className="text-danger">{formErrors.age}</span> : null} 
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-md-6'>
                        <input className="form-control" type='text' name='gender' value={gender} onChange={handleChange} placeholder='Enter your gender'/> 
                        {formErrors.gender ? <span className="text-danger">{formErrors.gender}</span> : null}   
                    </div>
                </div>
                { !_id && (
                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <input className="form-control" type='password' name='password' value={password} onChange={handleChange} placeholder='Enter your password'/> 
                            {formErrors.password ? <span className="text-danger">{formErrors.password}</span> : null} 
                        </div>
                    </div>
                ) }
                
                <input className='btn btn-primary mt-3' type='submit' value={ _id ? "Save" : "Register" } />

                <Button
                    className="btn btn-outline-secondary mt-3 mx-3"
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

export default UserRegister