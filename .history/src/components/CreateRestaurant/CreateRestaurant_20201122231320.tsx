import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './CreateRestaurant.css';
import cam from '../../assets/camara.png'; // gives image path
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ReactFirebaseFileUpload from './CR.js';
import { Establishment, EstablishmentService } from '../../services/EstablishmentService';
import { Formik } from 'formik';


interface CreateDishProps {
  establishmentId: number;
}
interface RestaurantData {
  name: string;
  phone: string;
  location: string;
  openingTime: string;
  closingTime: string;
  openFrom: string;
  openTo: string;
  description: string;

  menuid: number;
  userid: number;

}
const onSubmit = (values: RestaurantData) => {

  // eid?: number;
  //   name: string;
  //   description: string;
  //   phone: string;
  //   location: string;
  //   openTime: string;
  //   closeTime: string;
  //   openFromDay: string;
  //   openToDay: string;
  //   menu_id: number;
  //   user_id: number;

  let history;

  const newEstablishment: Establishment = {
    name: values.name,
    phone: values.phone,
    location: values.location,
    openTime: values.openingTime,
    closeTime: values.closingTime,
    openFromDay: values.openFrom,
    openToDay: values.openTo,
    description: values.description,

    menu_id: values.menuid,
    user_id: values.userid

  }

  EstablishmentService.createEstablishment(newEstablishment);
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
          + Add Restaurant
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
          <Formik
          initialValues={{ name: "", phone: "", email: "", location: "", openingTime: "", closingTime:"",
        openFrom:"", openTo:"", description:"", menuid:"", userid:"" }}
          onSubmit={values => {
            onSubmit(values);
          }}
        >

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

              </Formik>
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