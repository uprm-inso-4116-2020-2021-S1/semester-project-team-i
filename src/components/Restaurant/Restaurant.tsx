import React from 'react';
import { RouteComponentProps } from 'react-router';
import './Restaurant.css';
import plate1 from "../../assets/plate1.png";
import plate2 from "../../assets/plate2.png";
import plate3 from "../../assets/plate3.png";

interface RestaurantProps extends RouteComponentProps<{ name: string}> {

}

interface RestaurantStates {
    showMenu: boolean;
}

export default class Restaurant extends React.Component<RestaurantProps, RestaurantStates> {

    private daysOpen = "Monday thru Fridays";
    private hours = "8:00 am - 10:00 pm";
    private address = "Calle Bosque";
    private facebookHandle = "";
    private instagramHandle = "";
    private twitterHandle = "";

    constructor(props: RestaurantProps) {
        super(props);
        this.state = {
            showMenu: false
        }
    }


    render() {
        return(
            <body>
                <div className="white">
                    <table>
                        <tr >
                            <td style={{width:"45%"}}>
                                <div className="restPic">
                                </div>
                            </td>
                            <td>
                                <div className="handle">{this.props.match.params.name}</div>
                                <div>Open: {this.daysOpen}</div>
                                <div>Hours: {this.hours}</div>
                                <div>Address: {this.address}</div>

                            </td>
                            <td>
                                <hr>
                                </hr>

                            </td>
                        </tr>
                    </table>

                </div>
                <div className="orange">
                    
                    <img alt="plate1" style={{margin:"50px"}} src={plate1}></img>
                    <img alt="plate2" style={{margin:"50px"}} src={plate2}></img>
                    <img alt="plate3" style={{margin:"50px"}} src={plate3}></img>                   

                </div>

            </body>
        );
    }

}