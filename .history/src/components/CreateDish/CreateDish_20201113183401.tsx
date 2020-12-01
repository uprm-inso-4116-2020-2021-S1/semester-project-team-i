import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './CreateDish.css';
import cam from '../../assets/camara.png'; // gives image path
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {storage} from "../firebase";



export const CreateDish = () => {
  // lo de la foto
const [image, setImage] = useState(null);

  const handleChange = (e: React.ChangeEvent<any>) => {
    if (e.target.files[0]) {
      // setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {};

  //lo de la foto

  const categories = [
    {
      value: 'apetizer',
      label: 'apetizer',
    },
    {
      value: 'entree',
      label: 'entre',
    },
    {
      value: 'dessert',
      label: 'dessert',
    },
    {
      value: 'drink',
      label: 'drink',
    },
  ];

  const types = [
    {
      value: 'Mexican',
      label: 'Mexican',
    },
    {
      value: 'Italian',
      label: 'Italian',
    },
    {
      value: 'Puertorrican',
      label: 'Puertorrican',
    },
    {
      value: 'Breakfast',
      label: 'Breakfast',
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// cajitas de select
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

  const classes = useStyles();
  const [category, setCategory] = React.useState('EUR');


const changeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
  setCategory(event.target.value);
};

const [type, setType] = React.useState('EUR');


const changeType = (event: React.ChangeEvent<HTMLInputElement>) => {
  setType(event.target.value);
};

// cajitas de select

  return (
    <div className="container">
      <div className="child">


        <button className="boton" onClick={handleClickOpen}>
          Open form dialog
      </button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

         
          <table>
<tr>
          <td  >
          <DialogTitle id="form-dialog-title">New Dish</DialogTitle>
          </td>
          <td className="celda">

          <button className="cancelbtn" onClick={handleClose} color="primary">
              Cancel
          </button>
          </td>
          
          </tr>

          </table>

          
         

          {/* boton de camara */}
          <div className="espacio">
          <input type="file" onChange={handleChange} />
            <button onClick={handleUpload} className="camara">
              <img src={cam} className="imagen" />
            </button>
          </div>
          {/* boton de camara */}

          <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
          
            <table className="tabla">
              <tr >

      
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="email"
             
              style={{ width:"100%" }}
            />
           
      </tr>
      <tr>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Price"
              type="email"
              
              style={{ width:"100%" }}
            />
            </tr>
            <tr>

             <TextField
          id="standard-select-type" //no se que va aqui
          select
          label="Select"
          value={type}
          onChange={changeType}
          helperText="Select type of dish"
          style={{ width:"100%" }}
          
        >
           {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          </tr>

          <tr>
             <TextField
          id="standard-select-category" //no se que va aqui
          select
          label="Select"
          value={category}
          onChange={changeCategory}
          helperText="Select category of dish"
          style={{ width:"100%" }}
        >
           {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          </tr>

         <tr>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="email"
              style={{ width:"100%" }}
            />
            </tr>
                </table>
               
               </form>
          </DialogContent>

          <DialogActions>

           

            <button className="boton" onClick={handleClose} color="primary">
              Done
          </button>

          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}