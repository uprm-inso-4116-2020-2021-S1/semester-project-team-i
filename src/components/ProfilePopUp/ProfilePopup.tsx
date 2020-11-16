import React from 'react';

/*import Modal from 'react-modal'; try implement modal for popup profile*/ 
import './ProfilePopup.css';

import { Route, RouteComponentProps } from 'react-router';



interface ProfPopup {
    showEditProfile: boolean;
}

export const ProfilePopup = (props: ProfPopup) =>{

    const [open, setOpen] = React.useState(false);
    const [showEditProfile, setShowEditProfile] = React.useState(false);

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

        return (
            <div >
                <div className="rectanglePopup" >
                        <div className = "ppButton">
                            <button className="profPic" onClick={handleClickOpen}>

                            </button>
                                <div className= "text"> @wafflerapr
                                    </div>
                        </div>
                        <button className ="boxButton" onClick={openShowEdit}>
                                Edit Profile</button>
                        <button className ="boxButton" onClick={handleClickOpen}>
                                Manage Rest.</button>
                        <button className ="boxButton" onClick={handleClickOpen}>
                                Log out</button> 
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
                            <button className = "saveb" onClick = {closeShowEdit}>
                                    Save Changes
                            </button>
                        </div>
                        </div>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }
    export default ProfilePopup;