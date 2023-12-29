import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startSupplierRegister } from "../../actions/actionGenerator";
import Heading from "../reusables/Heading";
import validator from "validator";
import { useHistory } from 'react-router-dom';

const SupplierRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    // Validate form fields
    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Name is required';
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!validator.isEmail(email.trim())) {
            errors.email = 'Invalid email format';
        }

        if (!username.trim()) {
            errors.username = 'Username is required';
        }

        if (!password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            const formData = { name, email, username, password };
            // Use the startSupplierRegister action with a callback to redirect after registration
            dispatch(startSupplierRegister(formData, () => {
                history.push('/supplier/login'); // Redirect to the login page after successful registration
            }));
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="container mt-5">
            <Heading className="mb-4" type="h3" title="Supplier Registration" />
            <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                        {formErrors.name && <span className="text-danger">{formErrors.name}</span>}
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {formErrors.email && <span className="text-danger">{formErrors.email}</span>}
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                        {formErrors.username && <span className="text-danger">{formErrors.username}</span>}
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        {formErrors.password && <span className="text-danger">{formErrors.password}</span>}
                    </div>
                </div>

                <input className="btn btn-primary" type="submit" value="Register" />
            </form>
        </div>
    );
};

export default SupplierRegister;