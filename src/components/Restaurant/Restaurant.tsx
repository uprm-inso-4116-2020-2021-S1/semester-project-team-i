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
import Menu from '../Menu/Menu';
import img1 from '../../assets/plate1.png';
import { Item } from '../Item/Item';
import { Establishment, EstablishmentService } from '../../services/EstablishmentService';


interface RestaurantProps extends RouteComponentProps<{
    eid: string
}> {

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


    private eid = this.props.match.params.eid as unknown as number;
    private establishment: Establishment = {
        name: '',
        description: '',
        phone: '',
        location: '',
        openTime: '',
        closeTime: '',
        openFromDay: '',
        openToDay: ''
    }

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

    setEstablishment(e: Establishment) {
        this.establishment = e;
        console.log(this.establishment);
        this.forceUpdate();
    }
    componentDidMount() {
        EstablishmentService.getEstablishmentById(this.eid, this.setEstablishment.bind(this));
        console.log(this.eid);
    }

    render() {
        return (
            <body>
                <div className="white">
                    <table>
                        <tr >
                            <td style={{ width: "38%" }}>
                                <div className="restPic">
                                </div>
                            </td>
                            <td style={{ textAlign: "center", width: "50%" }}>
                                <div className="handle">{this.establishment.name}</div>
                                <div className="details">
                                    Open: {this.establishment.openFromDay} through {this.establishment.openToDay}<br />
                                    Hours: {this.establishment.openTime} to {this.establishment.closeTime}<br />
                                    Address: {this.establishment.location}<br />
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
                                <div style={{ marginBottom: "20px", marginLeft: "100px" }}>
                                    <img alt="instagram" src={instagram}></img>
                                </div>
                                <div style={{ marginBottom: "20px", marginLeft: "100px" }}>
                                    <img alt="twitter" src={twitter}></img>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div>

                    {!this.state.showMenuList &&
                        <div className="orange">
                            <table style={{width:"80%", marginLeft:"10%", marginRight:"10%"}}>
                                <tr>
                                    <td>
                                        <Item imgSrc={plate1} name={this.establishment.name} description="Wafflera vende waffles."></Item>
                                    </td>
                                    <td>
                                        <Item imgSrc={plate2} name={this.establishment.name} description="Wafflera vende waffles."></Item>
                                    </td>
                                    <td>
                                        <Item imgSrc={plate3} name={this.establishment.name} description="Wafflera vende waffles."></Item>
                                    </td>
                                </tr>


                            </table>
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