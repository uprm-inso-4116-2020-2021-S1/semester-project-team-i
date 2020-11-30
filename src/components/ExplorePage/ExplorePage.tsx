import React from 'react';
import './ExplorePage.css';
import categoryBTN from '../../assets/categoryBTN.png';
import regionBTN from '../../assets/regionBTN.png';
import topRankedBTN from '../../assets/topRankedBTN.png';
import upvotePhoto from '../../assets/upvotePhoto.png';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import axios from 'axios';
import { Dish } from '../Restaurant/Restaurant';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { SERVER_STR } from '../Login/Login';

interface SuggestedPosts {
    imgProfile?: string;
    username?: string;
    imgProduct: string;
    imgUpvote: string;
    upvoteCount: number;
    eid: number;
    alt: string;
}

const pueblos = [
    'Adjuntas',
    'Aguada',
    'Aguadilla',
    'Aguas Buenas',
    'Aibonito',
    'Añasco',
    'Arecibo',
    'Arroyo',
    'Barceloneta',
    'Barranquitas',
    'Bayamón',
    'Cabo Rojo',
    'Caguas',
    'Camuy',
    'Canóvanas',
    'Carolina',
    'Cataño',
    'Cayey',
    'Ceiba',
    'Ciales',
    'Cidra',
    'Coamo',
    'Comerío',
    'Corozal',
    'Culebra',
    'Dorado',
    'Fajardo',
    'Florida',
    'Guánica',
    'Guayama',
    'Guayanilla',
    'Guaynabo',
    'Gurabo',
    'Hatillo',
    'Hormigueros',
    'Humacao',
    'Isabela',
    'Jayuya',
    'Juana Díaz',
    'Juncos',
    'Lajas',
    'Lares',
    'Las Marías',
    'Las Piedras',
    'Loíza',
    'Luquillo',
    'Manatí',
    'Maricao',
    'Maunabo',
    'Mayagüez',
    'Moca',
    'Morovis',
    'Naguabo',
    'Naranjito',
    'Orocovis',
    'Patillas',
    'Peñuelas',
    'Ponce',
    'Quebradillas',
    'Rincón',
    'Río Grande',
    'Sabana Grande',
    'Salinas',
    'San Germán',
    'San Juan',
    'San Lorenzo',
    'San Sebastián',
    'Santa Isabel',
    'Toa Alta',
    'Toa Baja',
    'Trujillo Alto',
    'Utuado',
    'Vega Alta',
    'Vega Baja',
    'Vieques',
    'Villalba',
    'Yabucoa',
    'Yauco',];

const ThePost = (props: { post: SuggestedPosts }) => {
    console.log(props.post);
    return (
        <div className="thePostConatainer">
            <table>
                <tr>
                    <Link to={`/restaurant/${props.post.eid}`}>
                        <td><div id="profilePhoto" style={{ background: `url(${props.post.imgProfile})` }}></div></td>
                        <td id="username"><h4>{props.post.username}</h4></td>
                    </Link>
                </tr>
                <tr>
                    <td><div id="photoTD" style={{ background: `url(${props.post.imgProduct})` }}></div></td>
                </tr>
                <tr>
                    <td id="upvoteBTN"><button  ><img id="upvotePhoto" src={props.post.imgUpvote} alt={props.post.alt} /></button></td>
                    <td id="countTD"><h4 id="count">{props.post.upvoteCount}</h4></td>
                </tr>
            </table>
        </div>
    );
}

interface MyCategory {
    cid: number;
    dishes?: Dish[];
    name: string;
}

interface ExplorePageStates {
    puebloName: string;
    categoryName: string;
    searchInput: string;
}

export default class ExplorePage extends React.Component<{}, ExplorePageStates> {    

    constructor(props: {}) {

        super(props);
        this.state = {
            puebloName: "",
            categoryName: "",
            searchInput: "",
        }
        this.getInitialData();
        // if(!localStorage.getItem('loggedInUser')){
        //     this.history.push("/");
        // }
    }

    private categoryMap: MyCategory[] = [];
    private featuredList: SuggestedPosts[] = [];
    private topResults: Dish[] = [];
    private isLoading: boolean = true;

    getInitialData = async () => {

        await axios.get(SERVER_STR+"/dishes?featured=true&limit=4").then(
            res => {
                console.log(res);
                res.data.dishes.map((dish: Dish) => {
                    const item: SuggestedPosts = {
                        imgProfile: dish.establishment?.image_url,
                        username: dish.establishment?.name,
                        imgProduct: dish.image_url,
                        imgUpvote: upvotePhoto,
                        upvoteCount: dish.rating,
                        eid: dish.establishment_id,
                        alt: dish.name,
                    }
                    this.featuredList.push(item);
                    console.log(item);
                    console.log(this.featuredList);
                })

            }
        ).finally(() => this.isLoading = false)
        await axios.get(SERVER_STR+"/categories").then(
            res => {
                this.categoryMap = res.data.categories;
                console.log(res);
                console.log(this.categoryMap);
            }
        );
        this.forceUpdate();
    }

    filterResults = async () => {
        this.topResults = [];
        await axios.get(SERVER_STR+"/dishes").then(
            res => {
                res.data.dishes.map((dish: Dish) => {
                    if ((dish.establishment?.location.includes(this.state.puebloName) &&
                        dish.category?.name === this.state.categoryName)
                        || (this.state.searchInput != "" && (dish.name.includes(this.state.searchInput)
                            || dish.description.includes(this.state.searchInput)
                            || dish.establishment?.name.includes(this.state.searchInput)
                            || dish.category?.name.includes(this.state.searchInput)
                            || dish.establishment?.location.includes(this.state.searchInput)))) {
                        this.topResults.push(dish);
                    }
                });
                console.log(this.topResults);
            }
        );
        this.forceUpdate();
    }

    render() {

        if (this.isLoading) return <div></div>;

        return (

            <div className="containerWholeTrend">
                <div className="containerWholeTrend">
                    <div className="containerWholeTrend">
                        <div className="containerWholeTrend">

                            <div className="suggested">
                                <table>
                                    <tr>
                                        <td id="bigTDL" >
                                            {this.featuredList[0] && <ThePost
                                                post={this.featuredList[0]} />}
                                            {this.featuredList[1] && <ThePost
                                                post={this.featuredList[1]} />}
                                        </td>
                                        <td id="bigTDR">
                                            {this.featuredList[2] && <ThePost
                                                post={this.featuredList[2]} />}
                                            {this.featuredList[3] && <ThePost
                                                post={this.featuredList[3]} />}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="filterTable">
                        <table>
                            <tr>
                                <td id="searchTD">
                                    <div className="searchExplore">
                                        <form className="searchBarEX">
                                            <TextField id="filled-basic" label="Search" variant="filled" fullWidth
                                                onChange={(event) => {
                                                    this.setState({
                                                        searchInput: event.target.value,
                                                        puebloName: "",
                                                        categoryName: ""
                                                    });
                                                    this.filterResults();
                                                }} />
                                        </form>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button className="filters">
                                        <img src={regionBTN} alt="Not Found" />
                                    </button>
                                    <div className="underFilterTable">
                                        <FormControl>
                                            <InputLabel shrink htmlFor="select-multiple-native">
                                                Choose a Region
                                    </InputLabel>
                                            <List>
                                                {pueblos.map((pueblo, index) => (
                                                    <ListItem
                                                        button
                                                        key={index}
                                                        selected={pueblo === this.state.puebloName}
                                                        style={{ height: '30px', width: '90%' }}
                                                        onClick={() => {
                                                            this.setState({ puebloName: pueblo });
                                                            this.filterResults();
                                                        }}>
                                                        {pueblo}
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </FormControl>
                                    </div>
                                </td>
                                <td>
                                    <div className="">
                                    </div>
                                    <button className="filters">
                                        <img src={categoryBTN} alt="Not Found" />
                                    </button>
                                    <div className="underFilterTable">
                                        <FormControl>
                                            <InputLabel shrink htmlFor="select-multiple-native">Choose a Category</InputLabel>
                                            <List>
                                                {this.categoryMap.map((categoria) => (
                                                    <ListItem
                                                        button
                                                        key={categoria.cid}
                                                        selected={categoria.name === this.state.categoryName}
                                                        style={{ height: '30px', width: '90%' }}
                                                        onClick={() => { this.setState({ categoryName: categoria.name }) }}>
                                                        {categoria.name}
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </FormControl>
                                    </div>
                                </td> <td>
                                    <button className="filters">
                                        <img src={topRankedBTN} alt="Not Found" />
                                    </button>
                                    <div className="underFilterTable">
                                        {this.topResults[0] && <ListItem button href={`/restaurant/${this.topResults[0].establishment_id}`}>
                                            <ListItemIcon>
                                                <LooksOneIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={this.topResults[0].name} />
                                        </ListItem>}
                                        {this.topResults[1] && <ListItem button href={`/restaurant/${this.topResults[1].establishment_id}`}>
                                            <ListItemIcon>
                                                <LooksTwoIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={this.topResults[1].name} />
                                        </ListItem>}
                                        {this.topResults[2] && <ListItem button href={`/restaurant/${this.topResults[2].establishment_id}`}>
                                            <ListItemIcon>
                                                <Looks3Icon />
                                            </ListItemIcon>
                                            <ListItemText primary={this.topResults[2].name} />
                                        </ListItem>}
                                        {this.topResults[3] && <ListItem button href={`/restaurant/${this.topResults[3].establishment_id}`}>
                                            <ListItemIcon>
                                                <Looks4Icon />
                                            </ListItemIcon>
                                            <ListItemText primary={this.topResults[3].name} />
                                        </ListItem>}
                                        {this.topResults[4] && <ListItem button href={`/restaurant/${this.topResults[4].establishment_id}`}>
                                            <ListItemIcon>
                                                <Looks5Icon />
                                            </ListItemIcon>
                                            <ListItemText primary={this.topResults[4].name} />
                                        </ListItem>}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    };
}

