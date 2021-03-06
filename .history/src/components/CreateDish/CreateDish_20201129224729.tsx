import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import './CreateDish.css';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ReactFirebaseFileUpload from './CD.js';

import { Dish, DishService } from '../../services/DishService';
import { Form, Formik } from 'formik';
import axios from 'axios';

let myImgUrl = "https://upload.wikimedia.org/wikipedia/commons/4/42/Photo-camera-in-circular-outlined-interface-button.svg";
let type = '';
let category_id = 0;
let catetegory = "";

async function getInitialData (){

  await axios.get("http://localhost:5000/categories").then(
  res => {
    this.categoryMap = res.data.categories;
    console.log(res);
    console.log(this.categoryMap);
}
);
}

interface CreateDishProps {
  establishmentId: number;
}

interface MyCategory {
  cid: number;
  dishes?: Dish[];
  name: string;
}

interface DishData {
  description: string;
  price: number;
  rating: number;
  image_url: string;
  category_id: number;
  name: string;
  type: string;
  establishment_id: number;
}

const onSubmit = (values: DishData) => {

  const newDish: Dish = {
    description: values.description,
    price: values.price as number,
    rating: values.rating,
    image_url: myImgUrl,
    category_id: category_id,
    name: values.name,
    type: type,
    establishment_id: values.establishment_id as number
  }

  console.log(newDish);
  DishService.createDish(newDish);
}





export const CreateDish = (props: CreateDishProps) => {

  const categoryMap: MyCategory[] = [];  

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
      value: 0,
      label: 'Mexican',
    },
    {
      value: 1,
      label: 'Italian',
    },
    {
      value: 2,
      label: 'Puertorrican',
    },
    {
      value: 3,
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
 // const [category, setCategory] = React.useState('EUR');


  const changeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    category_id = (event.target.value) as unknown as number;
    // category = (event.target.value);
  };

 // const [type, setType] = React.useState('EUR');


  const changeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    type = (event.target.value);
  };

  getInitialData();
  // cajitas de select

  const setMyImageUrl = (url: string) => {
    myImgUrl = url;
    console.log(myImgUrl);
  }

  return (
    <div>
      <div>

        <button className="boton" onClick={handleClickOpen}>
          + Add Dish
      </button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">


          <table>
            <tr>
              <td  >
                <DialogTitle id="form-dialog-title" >New Dish</DialogTitle>
              </td>
              <td className="celda">

                <button className="cancelbtn" onClick={handleClose} color="primary">
                  Cancel
          </button>
              </td>

            </tr>

          </table>

          <ReactFirebaseFileUpload setMyImageUrl={setMyImageUrl}/>

          <DialogContent>
            <Formik
              initialValues={{
                description: "", price: 0, rating: 0, image_url: myImgUrl, category_id: 1,
                name: "", type: "", establishment_id: props.establishmentId
              }}
              onSubmit={values => {
                onSubmit(values);
              }}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form style={{ color: "white" }}>

                  <table className="tabla">
                    <tr>


                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="string"

                        style={{ width: "100%" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                    </tr>
                    <tr>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        name="price"
                        label="Price"
                        type="string"

                        style={{ width: "100%" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </tr>
                    <tr>

                      <TextField
                        id="type"
                        select
                        label="Select"
                        name="type"
                        value={type}
                        onChange={changeType}
                        onBlur={handleBlur}
                        // onChange={handleChange} 
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
                        id="category" 
                        select
                        label="Select"
                        name="category"
                        value={category_id}
                        onChange={changeCategory}
                        // onChange={handleChange} 
                        onBlur={handleBlur}
                        helperText="Select category of dish"
                        style={{ width: "100%" }}
                      >
                        {categoryMap.map((option) => (
                          // <MenuItem key={option} value={option}>
                          //   {option}

                          // </MenuItem>
                        ))}
                      </TextField>
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
                  <button type="submit" className="botonDone" onClick={handleClose} color="primary">
                    Done
          </button>

                </Form>
              )}
            </Formik>
          </DialogContent>

        </Dialog>
      </div>
    </div>
  );
}