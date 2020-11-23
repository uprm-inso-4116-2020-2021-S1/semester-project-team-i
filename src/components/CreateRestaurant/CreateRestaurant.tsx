import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import './CreateRestaurant.css';
import cam from '../../assets/camara.png'; // gives image path
import MenuItem from '@material-ui/core/MenuItem';
import ReactFirebaseFileUpload from './CR.js';
import { Establishment, EstablishmentService } from '../../services/EstablishmentService';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router';

let history;

interface RestaurantData {
  name: string;
  phone: string;
  location: string;
  openTime: string;
  closeTime: string;
  openFromDay: string;
  openToDay: string;
  description: string;
}

const onSubmit = (values: RestaurantData) => {
  console.log(values);
  const newEstablishment: Establishment = {
    name: values.name,
    phone: values.phone,
    location: values.location,
    openTime: values.openTime,
    closeTime: values.closeTime,
    openFromDay: values.openFromDay,
    openToDay: values.openToDay,
    description: values.description,
    user_id: (localStorage.getItem('loggedInUser') as unknown as number)
  }

  EstablishmentService.createEstablishment(newEstablishment);
  
}

export const goToNewRestaurant = (e: Establishment) => {
  history.push(`/restaurant/${e.eid}`);
}

export const CreateRestaurant = () => {

  history = useHistory();

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

  // // cajitas de select
  // const useStyles = makeStyles((theme: Theme) =>
  //   createStyles({
  //     root: {
  //       '& .MuiTextField-root': {
  //         margin: theme.spacing(1),
  //         width: '25ch',
  //       },
  //     },
  //   }),
  // );

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
              <td >
                <DialogTitle id="form-dialog-title">New Restaurant</DialogTitle>
              </td>
              <td className="celda">
                <button className="cancelbtn" onClick={handleClose} color="primary">Cancel</button>
              </td>
            </tr>
          </table>

          <ReactFirebaseFileUpload />

          <DialogContent>
            <Formik
              initialValues={{
                name: "", phone: "", location: "", openTime: "", closeTime: "",
                openFromDay: "Saturday", openToDay: "Sunday", description: ""
              }}
              onSubmit={values => {
                onSubmit(values);
              }}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form style={{ color: "white" }}>
                  <table className="tabla" >
                    <tr>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="string"
                        style={{ width: "100%" }}
                        onChange={handleChange} onBlur={handleBlur}
                      />

                    </tr>
                    <tr>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="phone"

                        style={{ width: "100%" }}
                        onChange={handleChange} onBlur={handleBlur}
                      />
                    </tr>
                    <tr>

                      <TextField
                        autoFocus
                        margin="dense"
                        id="location"
                        name="location"
                        label="Location"
                        type="string"

                        style={{ width: "100%" }}
                        onChange={handleChange} onBlur={handleBlur}
                      />
                    </tr>
                  </table>
                  <table className="tabla">
                    <tr>
                      <td>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="openTime"
                          name="openTime"
                          label="Opening Time"
                          type="time"

                          style={{ width: "100%" }}
                          onChange={handleChange} onBlur={handleBlur}
                        />
                      </td>
                      <td>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="closeTime"
                          name="closeTime"
                          label="Closing Time"
                          type="time"

                          style={{ width: "100%" }}
                          onChange={handleChange} onBlur={handleBlur}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <TextField
                          id="openFromDay"
                          name="openFromDay"
                          select
                          label="Select"
                          value={fromDay}
                          onChange={changeFromDay}
                          // onChange={handleChange}
                          onBlur={handleBlur}
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
                          id="openToDay"
                          name="openToDay"
                          select
                          label="Select"
                          value={toDay}
                          onChange={changeToDay}
                          // onChange={handleChange}
                          onBlur={handleBlur}
                          helperText="Open to..."
                          style={{ width: "100%" }} >
                          {toWeek.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </td>
                    </tr>
                    <tr>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="string"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </tr>
                  </table>
                  <button type="submit" onClick={handleClose} className="botonDone">Done</button>

                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}