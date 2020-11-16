import React from 'react';

/*import Modal from 'react-modal'; try implement modal for popup profile*/ 
import './ProfilePopup.css';
import { Link } from 'react-router-dom';




interface ProfPopup {
    showEditProfile: boolean;
    linktoRestManager:boolean;
}

export const ProfilePopup = (props: ProfPopup) =>{

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
                            <button className="profPic" onClick={handleClickOpen}>

                            </button>
                                <div className= "text"> @wafflerapr
                                    </div>
                        </div>
                        <button className ="boxButton" onClick={openShowEdit}>
                                Edit Profile</button>
                        <Link to="/restManager">
                            <button className ="boxButton" onClick={openlinktoRestManager}>
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
                            <button className = "saveb" onClick = {closeShowEdit}>
                                    Save Changes
                            </button>
                        </div>
                        </div>
                        </div>
                    }

                    {linktoRestManager &&
                        <div>
                            <Link to="/restManager">
                            <button className ="boxButton" onClick={openlinktoRestManager}>
                                Manage Rest.
                                </button>

                            </Link>
                        </div>

                    }
                    
                </div>
            </div>
        )
    }
    export default ProfilePopup;