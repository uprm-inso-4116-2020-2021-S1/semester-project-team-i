import React from 'react';
import './ExplorePage.css';
import firstPlace from './assets/firstPlace.png';
import secondPlace from './assets/secondPlace.png';
import thirdPlace from './assets/thirdPlace.png';

interface TrendingItemProps {
    imgSrc: string;
    alt: string;
    placeHandle: string;
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

    return (
        <div className="trendingBox">
            <span className="font">Trending Places</span>
            <hr></hr>
            <div style={{ height: '20px' }}></div>
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
    )

};