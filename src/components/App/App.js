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

import './app.scss';

//Создаем новый объект класса GetServices
const getServices = new GetServices(unsplash, authenticationUrl);

// Функция отслеживания положения скрола
function getScroll() {
  let url = window.location.pathname;
  if(url === '/photos') {
    const wrap = document.querySelector('.wrapper');
    const scrollTop = window.pageYOffset;
    const heightWindow = window.innerHeight;
    const heightWrap = wrap.getBoundingClientRect().height + 350;

    let positionScroll = scrollTop + heightWindow - heightWrap;
    
    if(positionScroll >= 0){
      getServices.loadMore();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      window.removeEventListener('scroll', getScroll, false, true);
    }
  }
}

class App extends Component {

  state = {
    message : '',
    classError: false,
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

          <Link className="btn" to='/photos' onClick={ this.loadPhotos.bind(this) }>
            Загрузить фото
          </Link>

          <button className="btn" onClick={this.loadMore.bind(this)}>Загрузить ещё</button>

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






