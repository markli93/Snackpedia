import React from 'react';
import axios from 'axios';
import Flag from 'react-world-flags';
import Comment from './Comments';
import {Link} from "react-router-dom";
import { QRCode } from "react-qr-svg";
const uuidv1 = require('uuid/v1');
const { getCode } = require('country-list');

export default class OceansnackDetail extends React.Component{
    constructor(){
        super();
        this.state ={ 
            item: {},
            comment:{} 
        };
        this.commentForm = React.createRef();
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/ocean/${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                item: response.data
            })
        })
        .catch(err=>{
            console.log(err)
        })

        axios.get(`http://localhost:8080/ocean/${this.props.match.params.id}/comments`)
        .then(response => {
            this.setState({
                comment: response.data
            })
            console.log(this.state.comment)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    submitComment = (e)=>{
        e.preventDefault();
        if(this.commentForm.current.userName.value ===''|| this.commentForm.current.userComment.value ===''){
            alert('Invalid Input');
        }
        else{
            axios.post(`http://localhost:8080/ocean/${this.props.match.params.id}/comments`,{
            "name":this.commentForm.current.userName.value,
            "comment":this.commentForm.current.userComment.value,
            "id":uuidv1(),
            "date":Date.now()
        })
        .then(res=>{
            this.setState({
                comment:res.data
            })
            this.commentForm.current.userName.value="";
            this.commentForm.current.userComment.value="";
        })
        .catch(err=>{
            console.log(err)
        })

        }
    }
    render(){
        let item = this.state.item;
        let comment = this.state.comment;
        let cn = '';
        if(item.country){
            cn = getCode(item.country)
        }
        return(
            <div className="detail__container__ocean">
                <div className='detail--container'>
                    <Link to='/ocean'>
                        <img className="back" src='/Assets/SVG/back.svg' alt='back'/>
                    </Link>
                    <div className="QR__container">
                    <img className="detail__image" src= {item.image} alt=''/>
                    <QRCode className="overlay"
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="Q"
                        style={{ width: 300 } }
                        value= {`https://www.amazon.ca/s?k=${item.name}`}
                    />
                    </div>
                    <div className="detail__info">
                        <h1>{item.name}</h1>
                        <div className="detail__info--container">
                            <label>Country of Origin:</label>
                            <div>
                            <Flag code={cn} height='20' />
                            </div>
                            <span className="detail__country">{item.country}</span>
                        </div>
                        <div>
                            <label>Description:</label>
                            <p>{item.description}</p>
                        </div>
                        <div className="detail__info--container">
                            <label>Flavour:</label>
                            <span>{item.flavour}</span>
                        </div>
                        <div className="detail__info--container">
                            <label>Price:</label>
                            <span>{item.price}</span>
                        </div>
                    </div>
                </div>
                <form className="review--container" ref={this.commentForm} onSubmit={this.submitComment}>
                    <h2>Comments</h2>
                    <div className="review__input">
                        <label>Name:</label>
                        <input type='text' name='userName' placeholder='Name'/>
                    </div>
                    <div className="review__input">
                        <label>Review:</label>
                        <div>
                            <textarea type='text' name='userComment' placeholder='Review'/>
                        </div>
                    </div>
                    <div className="review__button--container">
                        <button type='submit'>Submit</button>
                    </div> 
                </form>
                {
                    comment.length> 0 && comment.map(item =>(
                        <Comment
                            name={item.name}
                            comment={item.comment}
                            date={item.date}
                        />
                    ))
                }
        </div>
        )
    }
}