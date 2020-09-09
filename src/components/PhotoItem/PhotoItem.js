import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import PhotosList from '../../components/PhotosList/PhotosList';

//import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';

class PhotoItem extends Component {
    
    render() {
        let { id, preview, author, date, likes } = this.props;

        return (
            preview ? 
            (
                <>
                 <Link to={`/photos/${id}`}>
                    <img className="photo__preview" src={preview.small} alt="preview" />
                </Link>
                <div className="photo__author">{author.name}</div>

                <div className="photo__date">{date}</div>
                <div className="photo__likes">{likes}</div>

                <div className="photo__id">{id}</div>

                <a href={author.links.html} target="_blank" rel="noopener noreferrer">Посмотреть профиль</a>

              </>
            ) 

            : false
        )
    }
}


export default PhotoItem;