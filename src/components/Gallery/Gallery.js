import * as React from 'react';
import Masonry from 'react-masonry-component';
import PhotoItem from '../PhotoItem/PhotoItem';
import store from '../../store';
import './gallery.scss';

import './images/thumbs-o-up.svg';


class Gallery extends React.Component {
    render() {
        const masonryOptions = {
            transitionDuration: 0
        };

        const photoItems = store.getState().photos;

        const items = Object.assign(photoItems).map (photo => {
            const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                timezone: 'UTC',
            };

            const dateFormated = new Date(photo.created_at).toLocaleString("ru", options);

        return (
            <li key={photo.id} className="image-element-class">
                <PhotoItem
                    key = { photo.id }
                    id = { photo.id}
                    preview = { photo.urls['thumb']}
                    author = { photo.user}
                    date = { dateFormated }
                    likes = {photo.likes }
                    photoItems = { photoItems }
                />
            </li>
        );
    });

    return (
        <Masonry
            className={'my-gallery-class'}
            elementType={'ul'}
            options={masonryOptions}
        >
            {items}
        </Masonry>
    )

  }
}

export default Gallery;