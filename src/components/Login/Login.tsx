import React from 'react';
import './Login.css';
import { Button, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

interface LoginData {
  email: string;
  password: string;
}

interface LoginProps {
  onSubmit: (values: LoginData) => void;
}

export const Login: React.FC<LoginProps> = ({ onSubmit }) => {

  return (
    <div className="pancakePic">
      <div className="rectangle">
        <span className="registerText">Login</span>
        <div style={{width:"80%", marginLeft:"10%", marginTop:"-20px", marginBottom:"20px"}}><hr></hr></div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={values => {
            onSubmit(values);
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form style={{ color: "white" }}>
                <div className="fieldName">Email </div>
                <div>
                  <TextField name="email" style={{ width:"70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                </div>
                <div className="fieldName">Password </div>
                <div>
                  <TextField name="password" style={{ width:"70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                </div>
              <Button type="submit" className="submitButton"> Sign In!</Button>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
        <div className="returningUser">
          <span>Don't have an account?&nbsp;</span>
          <Link to="/register">Register</Link>
          </div>
      </div>
    </div>

  )

}

export default Login;
