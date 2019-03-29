import React from 'react';
import WorldMap from 'react-world-map';
import {Link} from'react-router-dom';

export default class Map extends React.Component{
    render(){
        
        return(
            <div className="map--container">
            <h1 className="map__title">Where do you want to explore ?</h1>
            <Link to="/asia">
            <h2 className="map__asia">ASIA</h2>
            </Link>
            <Link to="/europe">
            <h2 className="map__europe">EUROPE</h2>
            </Link>
            <Link to="/na">
            <h2 className="map__na"><div>NORTH</div>AMERICA</h2>
            </Link>
            <Link to="/sa">
            <h2 className="map__sa"><div>SOUTH</div>AMERICA</h2>
            </Link>
            <Link to="/ocean">
            <h2 className="map__ocean">OCEANIA</h2>
            </Link>
            <Link to="/africa">
            <h2 className="map__africa">AFRICA</h2>
            </Link>
            <WorldMap />
            </div>
        )
    }
}