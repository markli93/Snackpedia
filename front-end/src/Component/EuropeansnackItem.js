import React from 'react';
import { Link } from 'react-router-dom';
export default class EuropeansnackItem extends React.Component{
    render(){
        return(
            <div className='image--container'>
                <Link to={`/europe/${this.props.id}`}>
                    <img className="img" src ={this.props.image} alt=''/>
                </Link>
            </div>
        )
    }
}