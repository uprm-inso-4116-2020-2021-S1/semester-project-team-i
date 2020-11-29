import React from 'react';
import './ExplorePage.css';

import categoryBTN from '../../assets/categoryBTN.png';
import regionBTN from '../../assets/regionBTN.png';
import topRankedBTN from '../../assets/topRankedBTN.png';

import profilePic from '../../assets/profileIMG.png';
import foodPhoto from '../../assets/photo-singlePost.jpg';
import upvotePhoto from '../../assets/upvotePhoto.png';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Select } from '@material-ui/core';
import { height } from '@material-ui/system';


import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import axios from 'axios';
import { Dish } from '../Restaurant/Restaurant';




interface SuggestedPosts {
    imgProfile: string;
    username: string;
    imgProduct: string;
    imgUpvote: string;
    upvoteCount: string;
    alt: string;
}

interface TrendingItemProps {
    imgSrc: string;
    alt: string;
    placeHandle: string;
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
// export const SuggestPostsGrid = () => {
//     imgProfile: profilePic;
//     username: string;
//     imgProduct: foodPhoto;
//     imgUpvote: string;
//     upvoteCount: string;


// }


const ThePost = (props: SuggestedPosts) => {
    return (
        <div className="thePostConatainer">
            <table>
                <tr>
                    <td id="profileBTN"><button ><a href="#"><img id="profilePhoto" src={props.imgProfile} alt={props.alt} /></a></button></td>
                    <td id="username"><h4>{props.username}</h4></td>
                </tr>
                <tr>
                    <td id="photoTD"><button id="sizingPostBTN" ></button></td>
                </tr>
                <tr>
                    <td id="upvoteBTN"><button  ><img id="upvotePhoto" src={props.imgUpvote} alt={props.alt} /></button></td>
                    <td id="countTD"><h4 id="count">{props.upvoteCount}</h4></td>
                </tr>
            </table>
        </div>
    );
}

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         formControl: {
//             margin: theme.spacing(1),
           
//         },
//         noLabel: {
//             marginTop: theme.spacing(3),
//         },
//     }),
// );


interface MyCategory {
    cid: number;
    dishes?: Dish[];
    name: string;
}

interface ExplorePageStates {
    puebloName: string[];
    categoryName: string[];
}



export default class ExplorePage extends React.Component<{},ExplorePageStates> {

    constructor(props: {}) {

        super(props);
        this.state = {
            puebloName: [],
            categoryName: [],
        }
        this.getCategories();
    }

    private categoryMap: MyCategory[] = [];
    getCategories = async () => {
        await axios.get("http://localhost:5000/categories").then(
            res => {
                this.categoryMap = res.data.categories;
                console.log(res);
                console.log(this.categoryMap);
            }
        );
        this.forceUpdate();
    }
    render() {

        const place1 = "@ojala";
        const upvoteCountTemp = "1,000";
        const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
            const { options } = event.target as HTMLSelectElement;
            const value: string[] = [];
            for (let i = 0, l = options.length; i < l; i += 1) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            this.setState({
                puebloName: value
            });

        }

        const handleChangeMultipleCAT = (event: React.ChangeEvent<{ value: unknown }>) => {
            const { options } = event.target as HTMLSelectElement;
            const value: string[] = [];
            for (let i = 0, l = options.length; i < l; i += 1) {
                if (options[i].selected) {
                    const x = options[i].value;
                    value.push(x);
                }
            }
            this.setState({
                categoryName: value
            });
        }

        return (

            <div className="containerWholeTrend">
                <div className="containerWholeTrend">
                    <div className="containerWholeTrend">
                        <div className="containerWholeTrend">

                            <div className="suggested">
                                <table>
                                    <tr>
                                        <td id="bigTDL" >
                                            <ThePost
                                                imgProfile={profilePic}
                                                username={place1}
                                                imgProduct={foodPhoto}
                                                imgUpvote={upvotePhoto}
                                                upvoteCount={upvoteCountTemp}
                                                alt="Not Found" />
                                            <ThePost
                                                imgProfile={profilePic}
                                                username={place1}
                                                imgProduct={foodPhoto}
                                                imgUpvote={upvotePhoto}
                                                upvoteCount={upvoteCountTemp}
                                                alt="Not Found" />
                                        </td>
                                        <td id="bigTDR">
                                            <ThePost
                                                imgProfile={profilePic}
                                                username={place1}
                                                imgProduct={foodPhoto}
                                                imgUpvote={upvotePhoto}
                                                upvoteCount={upvoteCountTemp}
                                                alt="Not Found" />
                                            <ThePost
                                                imgProfile={profilePic}
                                                username={place1}
                                                imgProduct={foodPhoto}
                                                imgUpvote={upvotePhoto}
                                                upvoteCount={upvoteCountTemp}
                                                alt="Not Found" />
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
                                            <TextField id="filled-basic" label="Search" variant="filled" fullWidth />
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
                                            <Select
                                                multiple
                                                native
                                                value={this.state.puebloName}
                                                onChange={handleChangeMultiple}
                                                style={{ height: '200px' }}
                                                inputProps={{
                                                    id: 'select-multiple-native',
                                                }}
                                            >
                                                {pueblos.map((pueblos) => (
                                                    <option key={pueblos} value={pueblos} style={{ height: '30px' }}>
                                                        {pueblos}
                                                    </option>
                                                ))}
                                            </Select>
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
                                            <InputLabel shrink htmlFor="select-multiple-native">
                                                Choose a Category
                                    </InputLabel>
                                            <Select
                                                multiple
                                                native
                                                value={this.state.categoryName}
                                                onChange={handleChangeMultipleCAT}
                                                inputProps={{
                                                    id: 'select-multiple-native',
                                                }}

                                                style={{ height: '200px' }}>

                                                {console.log(this.categoryMap)}
                                                {this.categoryMap.map((pueblos) => (
                                                        <option key={pueblos.cid} value={pueblos.name} style={{height:'30px', width:'90%'}}>
                                                        {pueblos.name}
                                                        </option>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </td> <td>
                                    <button className="filters">
                                        <img src={topRankedBTN} alt="Not Found" />
                                    </button>
                                    <div className="underFilterTable">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <LooksOneIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="@ojala" />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <LooksTwoIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="@queloque" />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <Looks3Icon />
                                            </ListItemIcon>
                                            <ListItemText primary="@wafflera" />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <Looks4Icon />
                                            </ListItemIcon>
                                            <ListItemText primary="@yoyo" />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <Looks5Icon />
                                            </ListItemIcon>
                                            <ListItemText primary="@wepa" />
                                        </ListItem>
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