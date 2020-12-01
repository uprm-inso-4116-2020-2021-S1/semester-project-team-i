
import React from 'react';
import './Item.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import left from '../../assets/left.png'; // gives image path
import right from '../../assets/right.png'; // gives image path
import waffles from '../../assets/waffles.jpg';


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

                <Dialog className=""  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

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



                    <div className="contenedor">

                        {/* <div className="contenedor"> */}

                        <table className="bigTable">
                            <tr>
                                <td >
                                    {/* primer boton */}

                                    <button>
                                        <img src={left} alt="" className="arrow" />
                                    </button>
                                </td>


                                <td className="wrapper">{/* tiene todo excepto flechas */}
                                    <table className="otro">
                                        <tr>
                                            <td>
                                                <div >

                                                            <table className="otro">
                                                                <tr className="otro">
                                                                    <td >
                                                                        {/* aqui va la foto circular */}
                                                                        <img src={waffles} className="perfil" alt=""/>

                                                                    </td>
                                                                    <td className="size">
                                                                        <h1 className="size">@Wafflerapr</h1>
                                                                    </td>
                                                                    <td>
                                                                        {/* loguito de comment */}
                                                                    </td>
                                                                    <td>
                                                                        {/* loguito de redes */}
                                                                    </td>
                                                                </tr>
                                                            </table>

                                                     

<table className="otro">
    <tr >

    
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
                    </tr>
                    </table>

                                                    

                                                    {/* <div className="second"> */}
                                                    {/* aqui esta la foto */}
                                                    {/* </div> */}

                                                </div>
                                            </td>
                                            <td  className="pic" style={{
                                            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${waffles})`}}>
                                               
                                                {/* <img src={waffles} className="" alt="" /> */}
                                            </td>
                                        </tr>
                                    </table>
                                </td> {/* tiene todo excepto flechas */}
                                <td className="right">
                                    {/* otro boton */}
                                    <button >
                                        <img src={right} alt="" className="arrow" />
                                    </button>
                                </td>
                            </tr>
                        </table>

                        {/* </div> */}


                    </div>

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


