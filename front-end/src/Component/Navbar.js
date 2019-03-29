import React from 'react';
import '../Styles/Navbar.scss'
import {Link} from 'react-router-dom'
export default class Navbar extends React.Component{
    render(){
        return(
            <div className='logo--container'>
                <Link to ="/">
                    <img src='Assets/PNG/logo_transparent.png' alt='logo'/>
                </Link>
            </div>
        )
    }
}