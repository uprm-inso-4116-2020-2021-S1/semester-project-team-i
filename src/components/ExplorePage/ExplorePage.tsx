import React from 'react';
import './ExplorePage.css';
import firstPlace from '../../assets/firstPlace.png';
import secondPlace from '../../assets/secondPlace.png';
import thirdPlace from '../../assets/thirdPlace.png';


import categoryBTN from '../../assets/categoryBTN.png'; 
import regionBTN from '../../assets/regionBTN.png'; 
import searchBTN from '../../assets/searchBTN.png'; 
import topRankedBTN from '../../assets/topRankedBTN.png'; 

import profilePic from '../../assets/profileIMG.png';
import foodPhoto from '../../assets/photo-singlePost.jpg';
import upvotePhoto from '../../assets/upvotePhoto.png';




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


// export const SuggestPostsGrid = () => {
//     imgProfile: profilePic;
//     username: string;
//     imgProduct: foodPhoto;
//     imgUpvote: string;
//     upvoteCount: string;


// }

const ThePost = (props: SuggestedPosts) => {
    return (
        <div className = "thePostConatainer">
            <table>
                <tr>
                    <td><button id = "profileBTN"><a href={`/restaurant/${props.username}`}><img id = "profilePhoto" src={props.imgProfile} alt={props.alt}  /></a></button></td>
                    <td style = {{height: '30px'}}><h4>{props.username}</h4></td>
                </tr>
                <tr>
                    <td id="photoTD"><button id="sizingPostBTN" ></button></td>
                </tr>
                <tr>
                    <td><button  id = "upvoteBTN"><img  id = "upvotePhoto" src={props.imgUpvote} alt={props.alt}/></button></td>
                    <td id = "count"><h4>{props.upvoteCount}</h4></td>
                </tr>
            </table>
        </div>
    );
}

const TrendingItem = (props: TrendingItemProps) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", textAlign: "end" }}>
            <img alt={props.alt} src={props.imgSrc}></img>
            <span className="trendingText">{props.placeHandle}</span>
        </div>
    );
}

export const ExplorePage = () => {

    const place1 = "@ojala";
    const place2 = "@lajibarita";
    const place3 = "@wafflerapr"

    const upvoteCountTemp = "1,000";

    return (
       <div className = "containerWholeTrend">

        <div className = "containerWholeTrend">
        <div className="trendingBox">
            <span className="font">Trending Places</span>
            <hr></hr>
            <div style={{ height: '10px' }}></div>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                <TrendingItem
                    imgSrc={firstPlace}
                    alt="firstPlace"
                    placeHandle={place1} />
                <TrendingItem
                    imgSrc={secondPlace}
                    alt="secondPlace"
                    placeHandle={place2} />
                <TrendingItem
                    imgSrc={thirdPlace}
                    alt="thirdPlace"
                    placeHandle={place3} />
            </div>
        </div>
        <div className = "ContainerWholeTrend"> 

<div className = "filterTable">
        <table  cellPadding = "0">
        <tr>
            <td>
            <button className="filters">
                        <img src={searchBTN} alt="Not Found"/>
                        </button>
            </td>
            <td>
            <button className="filters">
                        <img src={regionBTN} alt="Not Found"/>
                        </button>
            </td> <td>
            <button className="filters">
                        <img src={categoryBTN} alt="Not Found"/>
                        </button>
            </td> <td>
            <button className="filters">
                        <img src={topRankedBTN} alt="Not Found"/>
                        </button>
            </td>
        </tr>
        </table>
        </div>
        </div>
</div>


<div className = "containerWholeTrend"> 
       <div className="suggested">
           <ThePost
            imgProfile = {profilePic}
            username = {place1}
            imgProduct = {foodPhoto}
            imgUpvote = {upvotePhoto}
            upvoteCount = {upvoteCountTemp}
            alt = "Not Found" />
            <ThePost
            imgProfile = {profilePic}
            username = {place1}
            imgProduct = {foodPhoto}
            imgUpvote = {upvotePhoto}
            upvoteCount = {upvoteCountTemp}
            alt = "Not Found" />
            <ThePost
            imgProfile = {profilePic}
            username = {place1}
            imgProduct = {foodPhoto}
            imgUpvote = {upvotePhoto}
            upvoteCount = {upvoteCountTemp}
            alt = "Not Found" />
            <ThePost
            imgProfile = {profilePic}
            username = {place1}
            imgProduct = {foodPhoto}
            imgUpvote = {upvotePhoto}
            upvoteCount = {upvoteCountTemp}
            alt = "Not Found" />
            </div>
            
        </div>

        
        </div>


    )

};