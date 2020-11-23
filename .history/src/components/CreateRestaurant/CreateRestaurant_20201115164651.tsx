import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import './CreateRestaurant.css';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ReactFirebaseFileUpload from './CR.js';


interface CreateDishProps {
  establishmentId: number;
}

export const CreateRestaurant = (props: CreateDishProps) => {

  const types = [
    {
      value: 'appetizer',
      label: 'appetizer',
    },
    {
      value: 'entree',
      label: 'entree',
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

  const categories = [
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
          + Add Dish
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

          <ReactFirebaseFileUpload />

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

                    style={{ width: "100%" }}
                  />

                </tr>
                <tr>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Price"
                    type="email"

                    style={{ width: "100%" }}
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
                    style={{ width: "100%" }}

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
                    style={{ width: "100%" }}
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
                    style={{ width: "100%" }}
                  />
                </tr>
              </table>

            </form>
          </DialogContent>

          <DialogActions>



            <button className="botonDone" onClick={handleClose} color="primary">
              Done
          </button>

          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}