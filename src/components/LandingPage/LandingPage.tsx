import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import React from 'react';
import './LandingPage.css';

export const LandingPage = () => {

    return (
        <div>
            
            <div className="hamburgerPic">
            <div className="searchBox">
                <SearchBox placeholder="Search..." onSearch={newValue => console.log('value is ' + newValue)}></SearchBox>
            </div>
            </div>
            
        </div>
        
    );
}