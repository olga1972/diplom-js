import React from 'react';
import { Link } from 'react-router-dom';
import store from '../../store';

import './photoDetails.scss';
import './images/heart.svg';
import './images/heart-o.svg';
import './images/hand-o-left.svg';


const PhotoDetails = (props) => {
    let url = window.location.pathname;
    const {setLike} = props;
    let id = url.slice(8);
    const onePhoto = store.getState().photos.find(item => item.id===id);

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
        hour:'numeric',
        minute:'numeric',
        second: 'numeric'
    };

    const dateCreated = onePhoto.created_at;
    const dataCreatedFormated = new Date(dateCreated).toLocaleString("ru", options);

    return (
        <>
            <h2>PhotoDetails</h2>

            <figure className="photo">
                <picture>
                    <source
                        media="(min-width: 1200px)"
                        type="image/png"
                        srcset={onePhoto.urls.regular}/>

                    <source
                        media="(min-width: 500px)"
                        type="image/png"
                        srcset={onePhoto.urls.small}/>

                    <source
                        media="(min-width: 320px)"
                        type="image/png"
                        srcset={onePhoto.urls.thumb}/>
    
                    <img
                        img className="photo__preview"
                        src={onePhoto.urls.regular}
                        alt={onePhoto.alt_description}/>
                    </picture>

                    <figcaption className="photo__wrap">
                        <div className="photo__info-details">
                            <a href={onePhoto.user.links.html} className="photo__author" target="_blank" rel="noopener noreferrer">{onePhoto.user.name}</a>
                            <div className="photo__date">{onePhoto.likes}</div>
                        </div>
                        <div className="photo__info-details">
                            <div className="photo__date">{dataCreatedFormated}</div>
                            <button className="like" onClick={ () => {setLike(onePhoto.id)}}></button>
                        </div>
                    </figcaption>
                </figure>

                <Link className="btn back" to="/photos">В ленту</Link>
        </>
    )

}

export default PhotoDetails;
