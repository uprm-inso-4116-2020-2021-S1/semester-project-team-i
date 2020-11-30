import React from 'react';
import axios from 'axios';
import './ProfilePopup.css';
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { User, UserService } from '../../services/UserService';
import { CreateRestaurant } from '../CreateRestaurant/CreateRestaurant';
import { SERVER_STR } from '../Login/Login';


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

    UserService.editUserById(uid, editedUser);
}
let isRestaurantOwner = false;
let userEID = -1;

export const Profile = () => {

    const loggedInUID = localStorage.getItem('loggedInUser');
    let dummyUser: User = {
        uid: loggedInUID as unknown as number,
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        establishments: []
    }

    axios.get(SERVER_STR + `/users/${loggedInUID as unknown as number}`).then(res => {
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

    let showUser = true;

    return (
        <div>
               {showUser && <button className="profile" onClick={handleClickOpenFirst}></button>}
                <Dialog open={openFirst} onClose={handleCloseFirst} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <div className="rectanglePopup">
                            <table className="ppButton">
                                {/* <Link to="/restaurant/@Wafflerapr">
                                <button className="profPic" onClick={() => { }}>
                                </button> */}
                                <div className="text"> User Menu
                                    </div>
                                {/* </Link> */}
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
                                            localStorage.removeItem('loggedInUser');
                                            axios.get(SERVER_STR + `/logout`)
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
                                        <div className="profPicb"></div>
                                    </td>
                                    <td>
                                        <button className="txt" onClick={() => { }}>Change Profile Photo</button>
                                    </td>
                                </tr>
                            </table>

                            <table style={{ textAlign: 'center', marginLeft: '10%', marginTop: '5%', width: '80%' }}>
                                <tr>
                                    <div>
                                        <Formik
                                            initialValues={{ username: "", name: "", password: "" }}
                                            onSubmit={values => {
                                                onSubmit(values);
                                            }}>
                                            {({ values, handleChange, handleBlur }) => (
                                                <Form style={{ color: "white" }}>
                                                    <div className="fieldName">Username </div>
                                                    <div>
                                                        <TextField name="username" style={{ width: "70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                                                    </div>
                                                    <div className="fieldName">Name</div>
                                                    <div>
                                                        <TextField name="name" style={{ width: "70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                                                    </div>
                                                    <div className="fieldName">Password </div>
                                                    <div>
                                                        <TextField name="password" type="password" style={{ width: "70%" }} onChange={handleChange} onBlur={handleBlur}></TextField>
                                                    </div>
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