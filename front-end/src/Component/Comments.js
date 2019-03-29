import React from 'react';
import Rating from 'react-star-rating-lite';

export default class Comment extends React.Component{
    getdates(timestamps) {
        let dateinput = new Date(timestamps);
        let day = dateinput.getDate();
        let month = dateinput.getMonth()+1; 
        let year = dateinput.getFullYear();
        if(day<10) {
            day='0'+day;
        } 
        if(month<10) {
            month='0'+month;
        } 
        dateinput = month+'/'+day+'/'+year;
        return dateinput;   
    }
    render(){
        let rate = Math.floor(Math.random() * 6)
        return(
           
            <div className="comment--container"> 
               <div className="comment__info--container">
                 <div className="comment__name">{this.props.name}</div>
                 <div className="comment__date">{this.getdates(this.props.date)}</div>
               </div>
               <Rating weight="18" value={rate} />
               <div className="comment__comment">{this.props.comment}</div>
            </div>
        )
    }
}