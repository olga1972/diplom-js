import React, { Component } from 'react';
import PhotoItem from '../PhotoItem/PhotoItem';
//import { Link } from 'react-router-dom';
//import store from '../../store';

import { connect } from 'react-redux';

import { photosRequested, photosLoaded, auth } from '../../actions';

//import './photosList.scss';

class PhotosList extends Component {
    getFullView(id) {
        console.log(id);
        alert(id);
    } 
    
    onPhotoSelected(id) {
        console.log('onPhotoSelected');
      }

    render() {
    
        console.log('photoList');
        console.dir(this.props.photoItem);
        const {photoItem} = this.props;

        //const items = Object.assign(photoItem).map (photo => {
            const items = photoItem.map ((photo, index) => {
                console.dir(photo);
            
           return (
                    <li key={photo.id}>
                        <PhotoItem 
                            key = { photo.id }
                            id = { photo.id}
                            preview = { photo.urls}
                            author = { photo.user}
                            date = { photo.created_at }
                            likes = {photo.likes }
                            photoItem = { photoItem }
                        />
                            {/* onClick={ () => this.onPhotoSelected(photo.id)} */}
                    </li>
           )
       })

        return items;
  }

}

const mapStateToProps =  (state) =>{
    return {
        photoItem: state.photos,
        isAuth: state.isAuth
        //loading: state.loading,
        //error: state.error
    }
}


const mapDispatchToProps = {
    photosRequested,
    photosLoaded,
    auth
    //auth: (isAuth)=> {store.dispatch(auth(isAuth))}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);