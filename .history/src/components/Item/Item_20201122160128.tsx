
import React from 'react';
import './Item.css';

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

{/* 
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

          </table> */}

          

          <DialogContent className="contenedor">
            
{/* <div className="contenedor"> */}
    
          <table className="bigTable">
                <tr>
                    <td >
                        {/* primer boton */}

                        <button>
                        <img src={left} alt="" className="arrow"/>
                        </button>
                    </td>


                    <td>{/* tiene todo excepto flechas */}
                        {/* <table> */}
                        <div className="wrapper">

                            <div className="first">

                                <div className="space">

                                    <table className= "cabeza">
                                        <tr>
                                            <td className="profilePic" >
                                                {/* aqui va la foto circular */}

                                            </td>
                                            <td >
                                                <h1>@Wafflerapr</h1>
                                            </td>
                                            <td>
                                                {/* loguito de comment */}
                                            </td>
                                            <td>
                                                {/* loguito de redes */}
                                            </td>
                                        </tr>
                                    </table>
                                
                                </div>
                               
                                <div className="pad">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare porttitor ex.
                                        In fermentum ipsum nec neque gravida lobortis. Vestibulum tristique lectus ac tortor
                                        posuere fermentum. Ut eu lorem blandit, imperdiet leo quis, imperdiet nunc. Nulla tincidunt
                                        accumsan varius. Cras et sollicitudin libero. Proin condimentum, lorem eget vehicula varius, n
                                        isl lacus rutrum tellus, eget tempus nibh mi quis turpis. Morbi iaculis iaculis eros ac fringilla.
                                        Nunc posuere imperdiet mi sed fermentum. Fusce vestibulum pellentesque massa, vitae dapibus odio convallis
                                        quis. Donec justo neque, sodales et consequat ut, porttitor in ex. Ut vel nunc id nibh vulputate venenatis
                                        vitae non sapien. Cras dictum vel nunc at fermentum. Suspendisse eleifend ante aliquet ligula bibendum, in
                                        sodales velit lacinia. Nunc maximus mi dictum suscipit semper. In nisi nunc, interdum ut augue eu, dictum pretium dui.
                    </p>

                                </div>
                            </div>

                            <div className="second">
                                {/* aqui esta la foto */}
                            </div>

                        </div>
                        {/* </table> */}
                     </td> {/* tiene todo excepto flechas */}
                    <td className="right">
                        {/* otro boton */}
                        <button >
                        <img src={right} alt="" className="arrow"/>
                        </button>
                    </td>
                </tr>
            </table>
      
            {/* </div> */}

            
          </DialogContent>

          {/* <DialogActions> */}



            {/* <button className="botonDone" onClick={handleClose} color="primary">
              Done
          </button> */}

          {/* </DialogActions> */}
        </Dialog>
      </div>
    </div>


    );
}


