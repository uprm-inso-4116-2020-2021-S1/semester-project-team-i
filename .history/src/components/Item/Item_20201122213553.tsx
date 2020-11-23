
import React from 'react';
import './Item.css';
import Dialog from '@material-ui/core/Dialog';
import waffles from '../../assets/waffles.jpg';

interface ItemProps {
    imgSrc: string;
    description: string;
    name: string;
}

export const Item = (props: ItemProps) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div>

            <img src={props.imgSrc} alt="foto" onClick={handleClickOpen}></img>

            <Dialog className="" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <div className="contenedor">

                    <table className="bigTable">
                        <tr>

                            <td className="">{/* tiene todo excepto flechas */}
                                <table className="otro">
                                    <tr>
                                        <td>
                                            <div >

                                                <table className="otro">
                                                    <tr className="otro">
                                                        <td >
                                                            {/* aqui va la foto circular */}
                                                            <img src={props.imgSrc} className="perfil" alt="" />

                                                        </td>
                                                        <td className="size">
                                                            <h1 className="size">{props.name}</h1>
                                                        </td>
                                                    </tr>
                                                </table>

                                                <table className="otro">
                                                    <tr >
                                                        <p>{props.description}</p>
                                                    </tr>
                                                </table>

                                            </div>
                                        </td>
                                        <td className="pic" style={{
                                            background: `linear-gradient(to right, rgba(255,255,255,1) 10%,
                                            rgba(255,255,255,0)), url(${props.imgSrc})`
                                        }}>

                                        </td>
                                    </tr>
                                </table>
                            </td> {/* tiene todo excepto flechas */}

                        </tr>
                    </table>
                </div>

            </Dialog>
        </div>


    );
}


