import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { startRegisterUser } from "../../actions/userAction";
import { startSupplierRegister } from "../../actions/actionGenerator";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
    ), url(/pics/ur223.jpg);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: translucent;
    border: 2px solid black;
`;

const Title = styled.h1`
    font-weight: 600;
    font-size: 24px;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    margin: 20px 0px;
    font-size: 12px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #008080;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #004b49;
    }

    &:active {
        transform: scale(0.95);
    }
`;

const registrationReducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        default:
            return state;
    }
};

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, dispatchRegistration] = useReducer(registrationReducer, {
        username: "",
        email: "",
        password: "",
        admin: true,
    });

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: state,
        validationSchema,
        onSubmit: (values) => {
            if (state.admin) {
                dispatch(startSupplierRegister(values, () => navigate('/auth/login')));
            } else {
                dispatch(startRegisterUser(values, () => navigate('/auth/login')));
            }
            dispatchRegistration({ type: "SET_FIELD", field: "admin", value: false });
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatchRegistration({ type: "SET_FIELD", field: name, value });
        formik.handleChange(e);
    };

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={formik.handleSubmit}>
                    <Input
                        placeholder="Username"
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Input
                        placeholder="Email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button type="submit" disabled={formik.isSubmitting}>
                        CREATE
                    </Button>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default RegistrationForm;