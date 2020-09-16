import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import { Route, Link, Switch } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Auth from '../../components/Auth/Auth';
import PhotosList from '../../components/PhotosList/PhotosList';
import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';

import GetServices, { unsplash, authenticationUrl } from '../../services';

import { connect } from 'react-redux';

import { photosRequested, photosLoaded, auth } from '../../actions';


//Создаем новый объект класса GetServices
const getServices = new GetServices(unsplash, authenticationUrl);

  class App extends Component {
    handleClick (){
      //Отправляем пользователя на страницу аутентификации
      window.location.assign(authenticationUrl);
    }

    loadPhotos () {
      getServices.loadPhotos();
    }

    loadMore () {
      getServices.loadMore();
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
          <Route key="PhotoDetails" exact path='/photos/:id' component={ PhotoDetails }/>
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
  auth
  //auth: (isAuth)=> {store.dispatch(auth(isAuth))}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);






