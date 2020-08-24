import React, {Component} from 'react';
import PhotoItem from '../PhotoItem/PhotoItem';

import { connect } from 'react-redux';

import { photosRequested, photosLoaded } from '../../actions';

//import './photosList.scss';

class PhotosList extends Component {
    render() {
        const {photoItem} = this.props;
console.log( Object.assign(photoItem));
        const items = Object.assign(photoItem).map (photo => {

            
            return (
                    <PhotoItem 
                        key = { photo.id }
                        url = { photo.url}
                        id = { photo.id}
                        preview = { photo.preview}
                        author = { photo.author}
                        date = { photo.date }
                        likes = {photo.likes }
                        photoItem = { photoItem } />
                )
        })

        return items;
    }

}

const mapStateToProps =  (state) =>{
    return {
        photoItem: state.photos,
        //loading: state.loading,
        //error: state.error
    }
}


const mapDispatchToProps = {
    photosRequested,
    photosLoaded
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);