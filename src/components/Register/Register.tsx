import React from 'react';
import './Register.css';
import { Button, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { User, UserService } from '../../services/UserService';
import { useHistory } from "react-router-dom";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

// interface RegisterProps {
//   onSubmit: (values: RegisterData) => void;
// }
let history;

const onSubmit = (values: RegisterData) => {

  const newUser: User = {
    username: values.username,
    password: values.password,
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName
  }

  UserService.createUser(newUser);
}

export const setRegisterLoggedInUser = (uid: number) => {
  localStorage.setItem('loggedInUser', uid.toString());
  console.log(uid);
  if (uid !== -1) {
    history.push('/explore');
  }
}

export const Register: React.FC = () => {

  history = useHistory();

  return (
    <div className="pancakePic">
      <div className="rectangleRegister">
        <span className="registerText">Register</span>
        <div style={{ width: "80%", marginLeft: "10%", marginTop: "-20px", marginBottom: "20px" }}><hr></hr></div>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", username: "", password: "" }}
          onSubmit={values => {
            onSubmit(values);
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form style={{ color: "white" }}>
              <div>
                <TextField name="firstName" label="First Name" style={{ width: "70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
              </div>
              <div>
                <TextField name="lastName" label="Last Name" style={{ width: "70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
              </div>
              <div>
                <TextField name="email" label="Email" style={{ width: "70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
              </div>
              <div>
                <TextField name="username" label="Username" style={{ width: "70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
              </div>
              <div>
                <TextField name="password" label="Password" type="password" style={{ width: "70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
              </div>
              <Button type="submit" className="submitButton"> Create Account!</Button>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
        <div className="returningUser">
          <span>Already have an account?&nbsp;</span>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>

  )

}

export default Register;
