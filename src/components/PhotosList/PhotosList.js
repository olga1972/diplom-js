import React, { Component } from 'react';
import PhotoItem from '../PhotoItem/PhotoItem';
//import { Link } from 'react-router-dom';
import store from '../../store';

//import './photosList.scss';

class PhotosList extends Component {
    render() {
        console.log(store.getState().photos);
        const photoItems = store.getState().photos;

        const items = Object.assign(photoItems).map (photo => {
           //const items = photoItems.map ((photo, index) => {
            return (
                <li key={photo.id}>
                    <PhotoItem 
                        key = { photo.id }
                        id = { photo.id}
                        preview = { photo.urls}
                        author = { photo.user}
                        date = { photo.created_at }
                        likes = {photo.likes }
                        photoItems = { photoItems }
                    />
                </li>
           )
       })

        return items;
    }
}

export default PhotosList;