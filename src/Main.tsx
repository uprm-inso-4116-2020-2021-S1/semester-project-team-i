import React from 'react';
import { LandingPage } from './LandingPage';
import './Main.css';
import { initializeIcons } from '@uifabric/icons';
import { ExplorePage } from './ExplorePage';

initializeIcons();

interface MainState {
    isLandingPageVisible: boolean;
    isExploreVisible: boolean;
}

export class Main extends React.Component<{}, MainState> {

    constructor(props: {}){
        super(props);
        this.state ={
            isLandingPageVisible: true,
            isExploreVisible: false
        }
    }

    render() {
        return (
            <body>
                <div className="navbar">
                    <span className="title" onClick={()=>
                        {this.setState({
                            isExploreVisible : false,
                            isLandingPageVisible: true
                        })}}>Find &amp; Eat</span>
                    <div className="explore" onClick={()=>
                        {this.setState({
                            isExploreVisible : true,
                            isLandingPageVisible: false
                        })}}></div>
                    <div className="profile"></div>
                </div>
                {this.state.isLandingPageVisible && <LandingPage></LandingPage>}
                {this.state.isExploreVisible && <ExplorePage></ExplorePage>}
            </body>
            
        )
    };
}