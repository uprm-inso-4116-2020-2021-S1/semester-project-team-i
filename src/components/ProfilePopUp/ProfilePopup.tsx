import React from 'react';
import axios from 'axios';
import './ProfilePopup.css';
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { User, UserService } from '../../services/UserService';
import { Establishment, EstablishmentService } from '../../services/EstablishmentService';
import { CreateRestaurant } from '../CreateRestaurant/CreateRestaurant';



interface ProfData {
    username: string;
    name: string;
    password: string;
}

const onSubmit = (values: ProfData) => {

    const loggedInUID = localStorage.getItem('loggedInUser');
    let editedUser: User = {
        uid: loggedInUID as unknown as number,
        firstName: '',
        lastName: '',
        password: '',
        email: ''
    }

    editedUser.username = values.username;
    editedUser.firstName = values.name;
    editedUser.password = values.password;

    const uid = editedUser.uid as number;
}
let isRestaurantOwner = false;
let userEID = -1;

export const Profile: React.FC = () => {

    const loggedInUID = localStorage.getItem('loggedInUser');
    let dummyUser: User = {
        uid: loggedInUID as unknown as number,
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        establishments: []
    }

    axios.get(`http://127.0.0.1:5000/users/${loggedInUID as unknown as number}`).then(res => {
        dummyUser = res.data.user;
        if (dummyUser.establishments?.length && dummyUser.establishments?.length > 0) {
            isRestaurantOwner = true;
            userEID = dummyUser.establishments[0].eid as unknown as number;
            console.log(userEID);
        }
        console.log(res);

    });

    const [openFirst, setOpenFirst] = React.useState(false);
    const [showEditProfile, setShowEditProfile] = React.useState(false);
    const [linktoRestManager, setlinktoRestManager] = React.useState(false);
    const [usernameE, setUEdit] = React.useState(false);
    const [nameE, setNEdit] = React.useState(false);
    const [passE, setPEdit] = React.useState(false);

    function handleClickOpenFirst() {
        setOpenFirst(true);
    }
    function handleCloseFirst() {
        setOpenFirst(false);
    }

    function openShowEdit() {
        setShowEditProfile(true);
    }
    function closeShowEdit() {
        setShowEditProfile(false);
    }

    function openlinktoRestManager() {
        setlinktoRestManager(true);
        handleCloseFirst();
    }

    function openUserEdit() {
        setUEdit(true);
        setNEdit(false);
        setPEdit(false);
    }
    function openNameEdit() {
        setUEdit(false);
        setNEdit(true);
        setPEdit(false);
    }
    function openPassEdit() {
        setUEdit(false);
        setNEdit(false);
        setPEdit(true);
    }

    return (
        <div>
            <button className="profile" onClick={handleClickOpenFirst}>
            </button>
            <Dialog open={openFirst} onClose={handleCloseFirst} aria-labelledby="form-dialog-title"
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}>
                <DialogContent >

                    <div className="rectanglePopup">

                        <table className="ppButton" style={{ textAlign: 'center', }}> User Menu
                        </table>

                        <table style={{ paddingTop: '15%', textAlign: 'center', width: '100%' }}>
                            <tr>
                                <button className="boxButton" onClick={openShowEdit}>Edit Profile</button>
                            </tr>
                            <tr>
                                {isRestaurantOwner && <Link to={`/restaurantManager/${userEID}`}>
                                    <button className="boxButton" onClick={handleCloseFirst}>Manage Rest.</button>
                                </Link>}
                                {!isRestaurantOwner
                                    && <CreateRestaurant></CreateRestaurant>
                                }
                            </tr>
                            <tr>
                                <Link to="/">
                                    <button className="boxButton" onClick={() => {
                                        axios.get(`http://127.0.0.1:5000/logout`)
                                            .then(res => {
                                                console.log(res);
                                                openlinktoRestManager();
                                            });
                                    }}>Log Out</button>
                                </Link>
                            </tr>
                        </table>

                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={showEditProfile} onClose={closeShowEdit} aria-labelledby="form-dialog-second">
                <DialogContent>
                    <div className="rectangleE">
                        <table style={{ marginLeft: '10%', marginTop: '10%', width: '80%' }}>
                            <tr>
                                <td>
                                    <button className="txt" onClick={() => { }}>Profile Owner Name</button>
                                </td>
                            </tr>
                        </table>

                        <table style={{ textAlign: 'center', marginLeft: '10%', marginTop: '7%', width: '80%'}}>
                            <tr>
                                <div>
                                    <Formik
                                        initialValues={{ username: "", name: "", password: "" }}
                                        onSubmit={values => {
                                            onSubmit(values);
                                        }}>
                                        {({ values, handleChange, handleBlur }) => (
                                            <Form style={{ color: "white" }}>
                                                <tr >
                                                    <div className="fieldName">Username </div>
                                                    <td>
                                                        <button className="fieldName" style={{ marginLeft: '80%' }} onClick={openUserEdit}>
                                                            Edit</button>
                                                    </td>
                                                </tr>
                                                <td>
                                                    {usernameE &&
                                                        <TextField name="username" style={{ marginLeft: '35px', width: "100%" }} onChange={handleChange} onBlur={handleBlur}></TextField>}
                                                </td>
                                                <tr>
                                                    <div className="fieldName">Name</div>
                                                    <td>
                                                        <button className="fieldName" style={{ marginLeft: '80%' }} onClick={openNameEdit}>
                                                            Edit</button>
                                                    </td>
                                                </tr>
                                                <td>
                                                    {nameE && <TextField name="name" style={{ marginLeft: '35px', width: "100%" }} onChange={handleChange} onBlur={handleBlur}></TextField>}
                                                </td>
                                                <tr>
                                                    <div className="fieldName">Password </div>
                                                    <td>
                                                        <button className="fieldName" style={{ marginLeft: '80%' }} onClick={openPassEdit}>
                                                            Edit</button>
                                                    </td>
                                                </tr>
                                                <td>
                                                    {passE &&
                                                        <TextField name="password" type="password" style={{ marginLeft: '35px', width: "100%" }} onChange={handleChange} onBlur={handleBlur}></TextField>}
                                                </td>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </tr>
                            <tr>
                                <button className="saveb" onClick={closeShowEdit}>Save Changes</button>
                            </tr>
                        </table>

                        <DialogActions>
                            <button className="close" onClick={closeShowEdit}>
                            </button>
                        </DialogActions>
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    )
}
export default Profile;