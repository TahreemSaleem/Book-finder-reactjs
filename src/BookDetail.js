import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class BookDetail extends React.Component{

    constructor(){
        super()
        this.state = {
            name : "",
            cover: "",
            rating:0.0,
            author:""
        }
    }
    componentDidMount(){
        const {book}   =this.props.location.state;
        console.log(this.props.location.state)
        this.setState({
            name: book['title'],
            cover: book['image'],
            rating: book['rating'],
            author: book['author']
        })
    }
    render (){
        
        return (   
            <div className='flexbox book-items'>
                <div>
                    <img src={this.state.cover} alt="book-cover" />
                    <div className='book-summary'>
                        <p className='book-sub-heading'>{this.state.name}</p>
                        <p className='book-sub-heading'>{this.state.author}</p>
                        <p >{this.state.rating}</p>
                    </div>
                </div>
                <Link to='/'>
                    <button className='btn btn-back' >Go back</button>
                </Link>
            </div>
        )
    }
}

export default BookDetail;