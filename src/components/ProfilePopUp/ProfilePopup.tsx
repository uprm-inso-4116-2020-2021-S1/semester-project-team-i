import React from 'react';
import { RouteComponentProps } from 'react-router';
import './ProfilePopup.css';

interface ProfPopup extends RouteComponentProps<{ 
    name: string }> {

}

export const ProfilePopup = (props: ProfPopup) =>{

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

        return (
            <body>
                <div className = "background">
                    <div className="rectanglePopup">
                        <div className="profPic">
                        <div className= "text">
                            @wafflerapr</div>
                            
                            </div>
                        <button className ="boxButton" onClick={handleClickOpen}>
                                Edit Profile</button>
                        <button className ="boxButton" onClick={handleClickOpen}>
                                Manage Rest.</button>
                        <button className ="boxButton" onClick={handleClickOpen}>
                                Log out</button> 
                    </div>
                </div>
            </body>
        )
    }
    export default ProfilePopup;