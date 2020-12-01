import React from 'react';
import './Login.css';
import { Button, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { UserService } from '../../services/UserService';

let history;
export const SERVER_STR = "https://find-and-eat-server.herokuapp.com/";

const onSubmit = (values: {username: string, password: string}) => {
 
   UserService.login(values);
 }

 export const setLoggedInUser = (uid: number) => {
  localStorage.setItem('loggedInUser', uid.toString());
  console.log(uid);
  if (uid !== -1) {
    history.push('/explore');
  }
}


export const Login: React.FC = () => {

  history = useHistory();

  return (
    <div className="pancakePic">
      <div className="rectangle">
        <span className="registerText">Login</span>
        <div style={{width:"80%", marginLeft:"10%", marginTop:"-20px", marginBottom:"20px"}}><hr></hr></div>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={values => {
            onSubmit(values);
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form style={{ color: "white" }}>
                <div className="fieldName">Username </div>
                <div>
                  <TextField name="username" style={{ width:"70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                </div>
                <div className="fieldName">Password </div>
                <div>
                  <TextField name="password" type="password" style={{ width:"70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                </div>
              <Button type="submit" className="submitButton"> Sign In!</Button>
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
