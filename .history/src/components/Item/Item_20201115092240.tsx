
import React from 'react';
import './Item.css';
import left from '../../assets/left.png'; // gives image path
import right from '../../assets/right.png'; // gives image path


export const Item = () => {

    return (
        <div className="container">
            <table className="bigTable">
                <tr>
                    <td >
                        {/* primer boton */}

                        <button onClick={pressed}>
                        <img src={left} alt="" className="arrow"/>
                        </button>
                    </td>


                    <td>
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

                    </td>
                    <td className="right">
                        {/* otro boton */}
                        <button onClick={pressed}>
                        <img src={right} alt="" className="arrow"/>
                        </button>
                    </td>
                </tr>
            </table>
        </div>


    );
}

function pressed() {
    console.log('Button pressed!');
  }
