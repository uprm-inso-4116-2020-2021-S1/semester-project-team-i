
import React from 'react';
import './Item.css';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import left from '../../assets/left.png'; // gives image path
import right from '../../assets/right.png'; // gives image path


export const Item = () => {

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <div className="container">
            <div>
            

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

                  
                </tr>

                <tr>
                 
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


