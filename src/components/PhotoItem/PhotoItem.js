import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './photoItem.scss';

class PhotoItem extends Component {
    render() {
        let { id, preview, author, date, likes } = this.props;

        return (
            preview ?
            (
                <>
                    <Link to={`/photos/${id}`}>
                        <img className="photo__preview" src={preview} alt="preview" />
                    </Link>

                    <div className="photo__container">
                        <a href={author.links.html} className="photo__author" target="_blank" rel="noopener noreferrer">{author.name}</a>

                        <div className="photo__info">
                            <div className="photo__date">{date}</div>
                            <div className="photo__likes">{likes}</div>
                        </div>
                    </div>
                </>
            )

            : false
        )
    }
}


export default PhotoItem;