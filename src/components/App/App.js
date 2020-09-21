import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import { Route, Link, Switch } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Auth from '../../components/Auth/Auth';
import PhotosList from '../../components/PhotosList/PhotosList';
import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';

import '../../components/PhotoDetails/photoDetails.scss';

import GetServices, { unsplash, authenticationUrl } from '../../services';

import { connect } from 'react-redux';

import { photosRequested, photosLoaded, auth, setLikePhoto, unsetLikePhoto } from '../../actions';


//Создаем новый объект класса GetServices
const getServices = new GetServices(unsplash, authenticationUrl);
window.addEventListener('scroll', getScroll);


function getScroll() {
  if(document.body.scrollHeight === document.body.offsetHeight) {
    getServices.loadMore();
    window.removeEventListener('scroll', getScroll);
  }
  
}

  class App extends Component {
    handleClick (){
      
      //Отправляем пользователя на страницу аутентификации
      window.location.assign(authenticationUrl);
      console.log('handleClick');
    }

    loadPhotos () {
      
      getServices.loadPhotos();
     // window.removeEventListener('scroll', getScroll);
    }

    loadMore () {
      //window.addEventListener('scroll', getScroll);
      getServices.loadMore();
      //window.removeEventListener('scroll', getScroll);
    }

    setLike(id) {
      const btnLike = document.querySelector('.like');
      console.log('set like');
      
      console.log(id);
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

      <div key="app" className="wrapper">
        <Header></ Header>

        <button onClick={this.handleClick}>Авторизация</button>

        <Link to='/photos' onClick={ this.loadPhotos }>
          Загрузить фото
        </Link>
          {/* <button onClick={this.loadPhotos}>Загрузить фото</button> */}
        
        <button onClick={this.loadMore}>Загрузить ещё</button>
    
        <Switch>
          <Route key="Home" exact path='/' component={() => <h1>Welcome to Unsplash Photo-Viewer!</h1>}/>
          <Route exact path='/Auth' component={ Auth } />
            {/* {store.getState().isAuth ? <Route path='/photos' component={ PhotosList } /> : null } */}
          <Route key="PhotosList" exact path='/photos' component={ PhotosList } />
          {/* <Route key="PhotoDetails" exact path='/photos/:id' component={ PhotoDetails }/> */}
          <Route key="PhotoDetails" exact path='/photos/:id'><PhotoDetails setLike={this.setLike}/></Route>
          {/* <Redirect to={'/'}/> */}
          {/* <Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>} /> */}
        </Switch>
      </div>
    )
  }

}

const mapStateToProps =  (state) =>{
  return {
      photos: state.photos,
      isAuth: state.isAuth,
      photoItem: state.photos,
      //loading: state.loading,
      //error: state.error
  }
}


const mapDispatchToProps = {
  photosRequested,
  photosLoaded,
  auth,
  setLikePhoto,
  unsetLikePhoto
  //auth: (isAuth)=> {store.dispatch(auth(isAuth))}
}

export default connect(mapStateToProps, mapDispatchToProps)(App, getServices);






