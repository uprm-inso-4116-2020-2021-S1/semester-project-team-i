import React from 'react';
import './EditProfile.css';
import { User, UserService } from '../../services/UserService';

/*
interface EditProfile {
    firstName: string;
    username: string;
    password: string;
  }

const onSubmit = (values: EditProfile) => {

    const user: User = {
       username: values.username,
       password: values.password,
       firstName: values.firstName,

     }
   
     UserService.editUserById(0, user);
   }
*/ 
interface EditProfile {
    establishmentId: number;
  }
  
export const EditProfile = (props: EditProfile) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return(
        <body>
            <div className = "background">
                <div className = "rectangle">
                    <div className="profPic"> </div>
                    <button className = "txt" onClick = {handleClickOpen}>Change Profile Photo</button>
                    <button className = "editbutton1"onClick={handleClickOpen}>
                        edit</button> 
                    <button className = "editbutton"onClick={handleClickOpen}>
                        edit</button> 
                    <button className = "editbutton3"onClick={handleClickOpen}>
                        edit</button> 
                    <button className ="saveb" onClick={handleClickOpen}>
                        Save Changes</button> 
            </div>
            
            </div>


        </body>

    );

  }

  export default EditProfile;