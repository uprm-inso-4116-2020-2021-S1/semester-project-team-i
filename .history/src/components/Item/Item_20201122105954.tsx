
import React from 'react';
import './Item.css';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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
            <DialogActions>

<button className="boton" onClick={handleClickOpen}>
          + Add Dish
      </button>
      </DialogActions>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

      </Dialog>
      <DialogContent>

            
            </DialogContent>
        </div>


    );
}

function pressed() {
    console.log('Button pressed!');
  }
