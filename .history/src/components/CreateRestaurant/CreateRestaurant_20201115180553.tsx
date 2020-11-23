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

  const fromWeek = [
    {
      value: 'Sunday',
      label: 'Sunday',
    },
    {
      value: 'Monday',
      label: 'Monday',
    },
    {
      value: 'Tuesday',
      label: 'Tuesday',
    },
    {
      value: 'Wednesday',
      label: 'Wednesday',
    },
    {
      value: 'Thursday',
      label: 'Thursday',
    },
    {
      value: 'Friday',
      label: 'Friday',
    },
    {
      value: 'Saturday',
      label: 'Saturday',
    },
  ];

  const toWeek = [
    {
      value: 'Sunday',
      label: 'Sunday',
    },
    {
      value: 'Monday',
      label: 'Monday',
    },
    {
      value: 'Tuesday',
      label: 'Tuesday',
    },
    {
      value: 'Wednesday',
      label: 'Wednesday',
    },
    {
      value: 'Thursday',
      label: 'Thursday',
    },
    {
      value: 'Friday',
      label: 'Friday',
    },
    {
      value: 'Saturday',
      label: 'Saturday',
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
  const [toDay, setToDay] = React.useState('EUR');


  const changeToDay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDay(event.target.value);
  };

  const [fromDay, setFromDay] = React.useState('EUR');


  const changeFromDay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDay(event.target.value);
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
                <DialogTitle id="form-dialog-title">New Restaurant</DialogTitle>
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
                <tr>
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
                    label="Phone"
                    type="email"

                    style={{ width: "100%" }}
                  />
                </tr>
                <tr>

                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="location"
                    type="email"

                    style={{ width: "100%" }}
                  />
                </tr>
              </table>
              <table className="tabla">
                <tr>
                  <td>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Opening Time"
                      type="time"

                      style={{ width: "100%" }}
                    />
                  </td>
                  <td>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Closing Time"
                      type="time"

                      style={{ width: "100%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                      id="standard-select-type" //no se que va aqui
                      select
                      label="Select"
                      value={toDay}
                      onChange={changeToDay}
                      helperText="Open to..."
                      style={{ width: "100%" }}

                    >
                      {toWeek.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </td>
                  <td>
                    <TextField
                      id="standard-select-type" //no se que va aqui
                      select
                      label="Select"
                      value={fromDay}
                      onChange={changeFromDay}
                      helperText="Open from..."
                      style={{ width: "100%" }}

                    >
                      {fromWeek.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </td>
                </tr>
              </table>
              <table className="tabla">
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