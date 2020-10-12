import React, { Component }  from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Auth from '../../components/Auth/Auth';
import Gallery from '../../components/Gallery/Gallery';
import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import '../../components/PhotoDetails/photoDetails.scss';
import '../../components/Loader/loader.scss';

import GetServices, { unsplash, authenticationUrl } from '../../services';
import store from '../../store';

import { connect } from 'react-redux';

import { photosLoaded, auth, loading, setLikePhoto, unsetLikePhoto } from '../../actions';

import '../../fonts.scss';
import './app.scss';

//Создаем новый объект класса GetServices
const getServices = new GetServices(unsplash, authenticationUrl);

// Функция отслеживания положения скрола
function getScroll() {
  let url = window.location.pathname;
  if(url === '/photos') {
    let scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
  
    while (pageHeight - windowHeight - scrolled === 0) {
      getServices.loadMore();
      window.removeEventListener('scroll', getScroll, false, true);
      break;
    }
  }
}

class App extends Component {

  state = {
    message : '',
    classError: false,
    photosLoaded: false
  }

  componentDidUpdate() {
   window.addEventListener('scroll', getScroll, false, true);
  }

  handleClick (){
    //Отправляем пользователя на страницу аутентификации
    window.location.assign(authenticationUrl);
  }

  loadPhotos () {
    
    if(store.getState().isAuth) {
      this.setState({photosLoaded: true });
      getServices.loadPhotos();
      
    }
    else {
      const message = "Для просмотра фотографий нужно авторизоваться!";
      const classError = true;
      this.setState({message: message });
      this.setState({classError: classError });
    }
    return <ErrorMessage classError = {this.classError} message = {this.message}/>
  }

  loadMore () {
    if(store.getState().isAuth) {
      getServices.loadMore();
    }
    else {
      const message = "Для просмотра фотографий нужно авторизоваться!";
      const classError = true;
      this.setState({message: message });
      this.setState({classError: classError });
    }
    return <ErrorMessage classError = {this.classError} message = {this.message}/>
  }

  setLike(id) {
    const btnLike = document.querySelector('.like');

    if (!btnLike.classList.contains('active')) {
      btnLike.classList.add('active');
      getServices.likePhoto(id);
    }
    else {
      btnLike.classList.remove('active');
      getServices.unlikePhoto(id);
    }
  }

  render() {
    return (
      <>

        <Header/>

        <div className="btn-wrap">
          <button className="btn" onClick={this.handleClick}>Авторизация</button>

          {store.getState().isAuth ?
            <Link className="btn btn--link" to='/photos' onClick={ this.loadPhotos.bind(this) }>
              Загрузить фото
            </Link>
          : null}

          {store.getState().isAuth && this.state.photosLoaded ?
            <button className="btn" onClick={this.loadMore.bind(this)}>Загрузить ещё</button>
          : null}
        </div>

        <div key="app" className="wrapper">
        {store.getState().isLoading ? <Loader/> : null}

        {this.state.message ? <ErrorMessage classError={this.state.classError} message = {this.state.message}/> : null}

        <Switch>
          <Route key="Auth" exact path='/Auth'>
            <Auth classError = {this.state.classError}/>
          </Route>

          {store.getState().isAuth ?
            <Route key="PhotosList" exact path='/photos'>
              <Gallery getServices={this.getServices}/>
            </Route>
          : null}

          <Route key="PhotoDetails" exact path='/photos/:id'>
            <PhotoDetails setLike={this.setLike}/>
          </Route>

        </Switch>
      </div>
      </>
    )
  }

}

const mapStateToProps =  (state) =>{
  return {
      photos: state.photos,
      isAuth: state.isAuth,
      photoItem: state.photos,
      isLoading: state.isLoading,
  }
}


const mapDispatchToProps = {
  photosLoaded,
  auth,
  loading,
  setLikePhoto,
  unsetLikePhoto
}

export default connect(mapStateToProps, mapDispatchToProps)(App, getServices);






