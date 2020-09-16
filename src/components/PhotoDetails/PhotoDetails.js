import React from 'react';
import { Link } from 'react-router-dom';
//import ReactDOM from 'react-dom';
import PhotoItem from '../PhotoItem/PhotoItem';
//import {BrowserRouter as Router, Route, NavLink, Link, Switch, Redirect} from 'react-router-dom';
//import Unsplash, {toJson} from 'unsplash-js';
import store from '../../store';

//function loadOnePhoto(id) {
    //if(store.getState().isAuth) {

      /* unsplash.photos.getPhoto(id)
      .then(toJson)
      .then(json => {
        console.log(json)
        return json})
  } */
  //}

const PhotoDetails = (props) => {
    let {match} = props;
    //const {photoItem} = this.props;
    console.log('match.id');
    console.dir(store.getState().photos);
    let id = match.params.id;
    console.dir(match.params.id);
    const onePhoto = store.getState().photos.find(item => item.id===id);

    function getOnePhoto(id) {
        const onePhoto = store.getState().photos.find(item => item.id===id);
        return onePhoto;
        //alert(1);
    }

    getOnePhoto(id);
    
    return (
        <>
        <h2>PhotoDetails</h2>
        
            <div>
                <PhotoItem
                    key = { onePhoto.id }
                    id = { onePhoto.id}
                    preview = { onePhoto.urls}
                    author = { onePhoto.user}
                    date = { onePhoto.created_at }
                    likes = {onePhoto.likes } />
                    {/* photoItem = { photoItem } */}
                    {/* onClick={ () => this.onPhotoSelected(photo.id)} */}
            </div>
            <button>Поставить лайк</button>
            <Link to="/photos">Вернуться в галерею</Link>
        </>
    )

}

export default PhotoDetails;
