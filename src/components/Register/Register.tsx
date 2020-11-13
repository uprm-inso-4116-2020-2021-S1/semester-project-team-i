import React from 'react';
import './Register.css';
import { Button, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterProps {
  onSubmit: (values: RegisterData) => void;
}

export const Register: React.FC<RegisterProps> = ({ onSubmit }) => {

  return (
    <div className="pancakePic">
      <div className="rectangleRegister">
        <span className="registerText">Register</span>
        <div style={{width:"80%", marginLeft:"10%", marginTop:"-20px", marginBottom:"20px"}}><hr></hr></div>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          onSubmit={values => {
            onSubmit(values);
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form style={{ color: "white" }}>
                <div className="fieldName">First Name </div>
                <div>
                  <TextField name="firstName" style={{ width:"70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                </div>
                <div className="fieldName">Last Name </div>
                <div>
                  <TextField name="lastName" style={{ width:"70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
              </div>
                <div className="fieldName">Email </div>
                <div>
                  <TextField name="email" style={{ width:"70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                </div>
                <div className="fieldName">Password </div>
                <div>
                  <TextField name="password" style={{ width:"70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
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