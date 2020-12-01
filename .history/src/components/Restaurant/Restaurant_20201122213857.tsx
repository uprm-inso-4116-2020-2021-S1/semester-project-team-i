import React from 'react';
import { RouteComponentProps } from 'react-router';
import './Restaurant.css';
import plate1 from "../../assets/plate1.png";
import plate2 from "../../assets/plate2.png";
import plate3 from "../../assets/plate3.png";
import menuIcon from "../../assets/menuIcon.png";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import img1 from '../../assets/plate1.png';
import { Item } from '../Item/Item';


interface RestaurantProps extends RouteComponentProps<{ 
    name: string }> {

}

interface RestaurantStates {
    showMenuList: boolean;

}

export interface Dish {
    name: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
    rating: number;
    type: string;
}

export default class Restaurant extends React.Component<RestaurantProps, RestaurantStates> {

    private daysOpen = "Monday thru Friday";
    private hours = "8:00 am - 10:00 pm";
    private address = "Calle Bosque";
    private facebookHandle = "";
    private instagramHandle = "";
    private twitterHandle = "";
    private menu: Dish[] = [
        {
            name: 'pancakes',
            price: 10,
            description: 'helloooo',
            category: 'breakfast',
            imageUrl: img1,
            rating: 200,
            type: 'entree'
        },
        {
            name: 'pancakes',
            price: 10,
            description: 'helloooo',
            category: 'breakfast',
            imageUrl: img1,
            rating: 200,
            type: 'entree'
        },
        {
            name: 'pancakes',
            price: 10,
            description: 'helloooo',
            category: 'breakfast',
            imageUrl: img1,
            rating: 200,
            type: 'drinks'
        },
        {
            name: 'pancakes',
            price: 10,
            description: 'helloooo',
            category: 'breakfast',
            imageUrl: img1,
            rating: 200,
            type: 'entree'
        },
        {
            name: 'pancakes',
            price: 10,
            description: 'helloooo',
            category: 'breakfast',
            imageUrl: img1,
            rating: 200,
            type: 'dessert'
        }
    ];

    constructor(props: RestaurantProps) {

        super(props);
        this.state = {
            showMenuList: false
        }

    }


    render() {
        return (
            <body>
                <div className="white">
                    <table>
                        <tr >
                            <td style={{ width: "50%" }}>
                                <div className="restPic">
                                </div>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <div className="handle">{this.props.match.params.name}</div>
                                <div className="details">
                                    Open: {this.daysOpen}<br />
                                    Hours: {this.hours}<br />
                                    Address: {this.address}<br />
                                </div>
                                <div style={{ marginTop: "20px", textAlign: "left" }} onClick={() => {
                                    this.setState({
                                        showMenuList: !this.state.showMenuList
                                    })
                                }}>
                                    <img alt="menuIcon" src={menuIcon}></img>
                                </div>
                            </td>
                            <td>
                                <div style={{ marginBottom: "20px", marginTop: "40px", marginLeft: "100px" }}>
                                    <img alt="facebook" src={facebook}></img>
                                </div>
                                <div style={{ marginBottom: "20px",  marginLeft: "100px"  }}>
                                    <img alt="instagram" src={instagram}></img>
                                </div>
                                <div style={{ marginBottom: "20px",  marginLeft: "100px"  }}>
                                    <img alt="twitter" src={twitter}></img>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                  
                    {!this.state.showMenuList &&
                        <div className="orange">
                          
                            <Item imgSrc={plate1} name={this.props.match.params.name} description="Wafflera vende waffles."></Item>

                        
                            <img alt="plate2" style={{ margin: "50px" }} src={plate2}></img>
                            <img alt="plate3" style={{ margin: "50px" }} src={plate3}></img>
                        </div>}
                    {this.state.showMenuList &&
                        <div className="divider">
                            <div className="divider">&nbsp;<br></br></div>
                            <Menu myMenu={this.menu}></Menu>
                        </div>
                    }
                </div>

            </body>
        );
    }

}