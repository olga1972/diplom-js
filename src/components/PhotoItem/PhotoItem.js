import React from 'react';

const PhotoItem = ( props) => {
    const {id, preview, url, author, date, likes} = props;

    return (
        <>
            <li className="photo__item">
                <div className="photo__id">{id}</div>
                <img className="photo__img" src={url} alt={id}></img>
                <img className="photo__preview" src={preview} alt="preview"></img>
                <div className="photo__author">{author}</div>
                <div className="photo__date">{date}</div>
                <div className="photo__likes">{likes}</div>
            </li>
        
        </>
    )
}


export default PhotoItem;