import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { startUserLogin } from "../../actions/userAction";
import { startsupplierLogin } from "../../actions/actionGenerator";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ), url(/pics/ul5.jpg);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  border: 2px solid black;
`;

const Title = styled.h1`
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 15px 15px;
  background-color: #008080;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #004b49;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LinkText = styled(Link)`
  margin: 5px 0px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  color: teal;
`;

const RoleText = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: #008080;
`;

const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, dispatchLogin] = useReducer(loginReducer, {
    email: "",
    password: "",
    role: "",
  });

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema,
    onSubmit: (values) => {
      const loginAction =
        values.role === "admin"
          ? startsupplierLogin(values, () => navigate("/"))
          : startUserLogin(values, () => navigate("/"));
      dispatch(loginAction);
      dispatchLogin({ type: "SET_FIELD", field: "role", value: values.role });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchLogin({ type: "SET_FIELD", field: name, value });
    formik.handleChange(e);
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOG IN</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}

          <Input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}

          <RoleText>ROLE:</RoleText>
          <select
            name="role"
            value={state.role}
            onChange={handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" label="Select a role" />
            <option value="admin" label="Admin" />
            <option value="user" label="User" />
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className="text-danger">{formik.errors.role}</div>
          ) : null}

          <Button type="submit" disabled={formik.onSubmit}>
            LOGIN
          </Button>

          <LinkText to="/forgot-password">DO NOT YOU REMEMBER THE PASSWORD?</LinkText>
          <LinkText to="/auth/register">CREATE A NEW ACCOUNT</LinkText>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LoginForm;