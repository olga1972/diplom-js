import React from 'react';
import { Link, Route } from 'react-router-dom';
//import ReactDOM from 'react-dom';
import PhotoItem from '../PhotoItem/PhotoItem';
//import {BrowserRouter as Router, Route, NavLink, Link, Switch, Redirect, } from 'react-router-dom';
//import Unsplash, {toJson} from 'unsplash-js';
import store from '../../store';
//import GetServices from '../../services';
import getServices from '../App/App';
import './photoDetails.scss';

const PhotoDetails = (props) => {
    
    console.log('props');
    console.log(props);
    
    console.log(window.location.pathname);
    let url = window.location.pathname;
    const {setLike} = props;
    console.log(setLike);
    //this.props.setLike = this.props.setlike.bind(this);
    console.log('match.params.id');
    //console.dir(match);
    //console.dir(store.getState().photos);
    //console.dir(match.params.id);
    let id = url.slice(8);
    //let id = match.params.id;
    console.log(id);
    //console.dir(match.params.id);
    let onePhoto = store.getState().photos.find(item => item.id===id);
    console.log(onePhoto);

    function getOnePhoto(id) {
        let onePhoto = store.getState().photos.find(item => item.id===id);
        console.log(onePhoto);
        return onePhoto;
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
                    likes = {onePhoto.likes } 
                    // photoItems = { photoItems }
                    />
                    {/* onClick={ () => this.onPhotoSelected(photo.id)} */}
            </div>
            {/* <button onClick={ setLike }> Поставить лайк</button> */}
            
            <button className="like" onClick={ () => {setLike(onePhoto.id)}}> Поставить лайк</button>
            <Link to="/photos">Вернуться в галерею</Link>
        </>
    )

}

export default PhotoDetails;
