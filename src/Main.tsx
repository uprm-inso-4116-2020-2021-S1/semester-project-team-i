import React from 'react';
import { LandingPage } from './LandingPage';
import './Main.css';
import { initializeIcons } from '@uifabric/icons';
import { ExplorePage } from './ExplorePage';
import { Item } from './Item';

initializeIcons();

interface MainState {
    isLandingPageVisible: boolean;
    isExploreVisible: boolean;
    isItemVisible: boolean;
}

export class Main extends React.Component<{}, MainState> {

    constructor(props: {}){
        super(props);
        this.state ={
            isLandingPageVisible: true,
            isExploreVisible: false,
            isItemVisible: false
        }
    }

    render() {
        return (
            <body>
                <div className="navbar">
                   
                    <span className="title" onClick={()=>
                        {this.setState({
                            isExploreVisible : false,
                            isLandingPageVisible: true,
                            isItemVisible: false
                        })}}>Find &amp; Eat</span>

                    <div className="explore" onClick={()=>
                        {this.setState({
                            isExploreVisible : true,
                            isLandingPageVisible: false,
                            isItemVisible: false
                        })}}></div>

                    <div className="profile" onClick={()=>
                    {this.setState({
                        isExploreVisible : false,
                        isLandingPageVisible: false,
                        isItemVisible: true
                    })}}>
                    </div>

                </div>
                {this.state.isLandingPageVisible && <LandingPage></LandingPage>}
                {this.state.isExploreVisible && <ExplorePage></ExplorePage>}
                {this.state.isItemVisible && <Item></Item>}
            </body>
            
        )
    };
}