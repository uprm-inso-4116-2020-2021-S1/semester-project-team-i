import React from 'react';
import axios from 'axios';
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
import { Item } from '../Item/Item';
import { Establishment, EstablishmentService } from '../../services/EstablishmentService';
import { SERVER_STR } from '../Login/Login';
import { Upvote } from '../ExplorePage/ExplorePage';


interface RestaurantProps extends RouteComponentProps<{
    eid: string
}> {

}

interface RestaurantStates {
    showMenuList: boolean;

}

interface Category {
    cid: number;
    name: string;
}

export interface Dish {
    did?: number;
    category_id: number;
    establishment_id: number;
    name: string;
    price: string;
    description: string;
    image_url: string;
    rating: number;
    type: string;
    establishment?: Establishment;
    category?: Category;
    categorystr?: string;
    upvotes?: Upvote[];
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
        openToDay: '',
        image_url: ''
    }

    private facebookHandle = "";
    private instagramHandle = "";
    private twitterHandle = "";
    private menu: Dish[] = [];

    constructor(props: RestaurantProps) {

        super(props);
        this.state = {
            showMenuList: false
        }
    }

    async setEstablishment(e: Establishment) {
        this.establishment = e;
        console.log(this.establishment);
        await axios.get(SERVER_STR + `/dishes?eid=${e.eid}`)
            .then(res => {
                const ans = res.data.dishes;
                this.menu = ans;
                console.log(ans);
            });

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
                            <td style={{ width: "48%" }}>
                                <div className="restPic" style={{ background: `url(${this.establishment.image_url})` }}>
                                </div>
                            </td>
                            <td style={{ textAlign: "center" }}>
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
                            <table style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
                                <tr>
                                    <td>
                                        {this.menu[0] &&
                                            <Item imgSrc={this.menu[0].image_url} name={this.menu[0].name} description={this.menu[0].description}></Item>
                                        }
                                    </td>
                                    <td>
                                        {this.menu[1] &&
                                            <Item imgSrc={this.menu[1].image_url} name={this.menu[1].name} description={this.menu[1].description}></Item>
                                        }
                                    </td>
                                    <td>
                                        {this.menu[2] &&
                                            <Item imgSrc={this.menu[2].image_url} name={this.menu[2].name} description={this.menu[2].description}></Item>
                                        }
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