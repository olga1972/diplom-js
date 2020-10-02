import React, { Component }  from 'react';
//import ReactDOM from 'react-dom';
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

import { photosRequested, photosLoaded, auth, loading, setLikePhoto, unsetLikePhoto } from '../../actions';

import './app.scss';


//Создаем новый объект класса GetServices
const getServices = new GetServices(unsplash, authenticationUrl);


//window.addEventListener('scroll', getScroll);


function getScroll() {
  const wrap = document.querySelector('.wrapper');
  const scrollTop = window.pageYOffset;
  const heightWindow = window.innerHeight;
  const heightWrap = wrap.getBoundingClientRect().height;

  if((scrollTop + heightWindow - heightWrap) >= 0){
      console.log('end page');
      this.loadMore();
      window.removeEventListener('scroll', getScroll);
  }
}

  class App extends Component {

    state = {
      message : '',
      classError: false
    }
    

  componentDidMount() {
   // window.addEventListener('scroll', getScroll);
} 

componentDidUpdate() {
  /* console.log('didUpdate');
  window.addEventListener('scroll', getScroll); */
}

    handleClick (){
      //Отправляем пользователя на страницу аутентификации
      window.location.assign(authenticationUrl);
      console.log('handleClick');
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
        
        return message;
      }
      return <ErrorMessage classError={this.classError} message = {this.state.message}/>
     
    }

    loadMore () {
      console.log('loadMore');
      getServices.loadMore();
      //window.addEventListener('scroll', getScroll);
      window.removeEventListener('scroll', getScroll);
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
    console.log('store ' + store.getState().isAuth);
       
    return (

      <div key="app" className="wrapper">
        <Header></ Header>

        {store.getState().isLoading ? <Loader/> : null}
       

        <button className="btn" onClick={this.handleClick}>Авторизация</button>
        {/* <Link to='/Auth' onClick={this.handleClick}>Авторизация</Link> */}

        <Link className="btn" to='/photos' onClick={ this.loadPhotos.bind(this) }>
          Загрузить фото
        </Link>

        
        <button className="btn" onClick={this.loadMore}>Загрузить ещё</button>
    
        {/* {this.state.message ? <ErrorMessage classError={this.state.classError} message = {this.state.message}/> : null} */}
        {this.state.message ? <ErrorMessage message = {this.state.message}/> : null}
        <Switch>
          <Route exact path='/Auth' component={Auth}/>
         
            {store.getState().isAuth ? 
              <Route key="PhotosList" exact path='/photos'><Gallery getServices={this.getServices}/></Route> 
              : null}
               {/* <ErrorMessage message = {'this.state.message'}/>  */}

          {/* <Route key="PhotosList" exact path='/photos' component={ PhotosList } /> */}
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
      isLoading: state.isLoading,
  }
}


const mapDispatchToProps = {
  photosRequested,
  photosLoaded,
  auth,
  loading,
  setLikePhoto,
  unsetLikePhoto
}

export default connect(mapStateToProps, mapDispatchToProps)(App, getServices);






