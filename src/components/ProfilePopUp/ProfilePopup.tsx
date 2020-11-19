import React from 'react';

import './ProfilePopup.css';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
//import ReactFirebaseFileUpload from '../CreateDish/CD.js';



interface ProfData {
    username: string;
    name: string;
    password: string;
  }

interface ProfPopup {
    onSubmit: (values: ProfData) => void;
    showEditProfile: boolean;
    linktoRestManager:boolean;
}
    


export const Profile : React.FC<ProfPopup> = ({ onSubmit }) => {

    const [open, setOpen] = React.useState(false);
    const [showEditProfile, setShowEditProfile] = React.useState(false);
    const [linktoRestManager, setlinktoRestManager] =  React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }
    function handleClose(){
        setOpen(false);
    }
    function openShowEdit() {
        setShowEditProfile(true);
    }
    function closeShowEdit() {
        setShowEditProfile(false);
    }

    function openlinktoRestManager(){
        setlinktoRestManager(true);
    }


        return (
            <div >
                <div className="rectanglePopup" >
                        <div className = "ppButton">
                        <Link to="/restaurant/@Wafflerapr">
                            <button className ="profPic" onClick={handleClickOpen}>
                                </button>
                                <div className= "text"> @Wafflerapr
                                    </div>
                        </Link>
                        </div>
                        <button className ="boxButton" onClick={openShowEdit}>
                                Edit Profile</button>
                        <Link to="/restManager">
                            <button className ="boxButton" >
                                Manage Rest.
                                </button>
                        </Link>
                        <Link to="/">
                            <button className ="boxButton" onClick={openlinktoRestManager}>
                                Log Out
                                </button>
                        </Link>
                </div>

                <div>

                    {showEditProfile &&
                        <div>
                            
                            <div className = "background">

                            <div className = "rectangleE">
                            <div className = "profPicb">
                            </div>
                            <button className = "txt" onClick = {handleClickOpen}>
                                    Change Profile Photo
                            </button>
                            <div className = "rec">
                            <Formik
                                initialValues={{ username: "", name:"", password: "" }}
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
                                        <div className="fieldName">Name</div>
                                        <div>
                                        <TextField name="name" style={{ width:"70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                                        </div>
                                        <div className="fieldName">Password </div>
                                        <div>
                                        <TextField name="password" type="password" style={{ width:"70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                                        </div>
                                    </Form>
                                )}
                                </Formik>
                                
                                </div>

                            <button className = "saveb" onClick = {closeShowEdit}>
                                    Save Changes
                            </button>
                            <button className = "close" onClick = {closeShowEdit}>
                            </button>
                            
                            </div>
                        </div>
                        </div>
                    }

                </div>
            </div>
        )
    }
    export default Profile;