import React, {Component} from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import Header from '../../components/Header/Header';
import PhotosList from '../../components/PhotosList/PhotosList';
import store from '../../store';
import Unsplash, {toJson, setBearerToken} from 'unsplash-js';


  console.log('auth');
    const unsplash = new Unsplash({
        accessKey: "rOCoQmwn-eMbE_b57Bgd9LlZmpYTmTlp8dyQ8i3tBds",
        secretKey: "vO_eYWwcjZtP10-Hk533hzyR9ZMsOESWTft6j1_i_Tc",
        callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
      });

      const authenticationUrl = unsplash.auth.getAuthenticationUrl([
        "public",
        "write_likes",
      ]);

      console.log('url '+ authenticationUrl);

      window.location.assign(authenticationUrl);
      
      // тут возможно нужна проверка на корректность открытого url
      const code = window.location.search.split("code=")[1];
      console.log('code' + code);
      
      if (code) {
        unsplash.auth.userAuthentication(code);
        unsplash.auth.setBearerToken(toJson.access_token);
        console.log(toJson.access_token);
        unsplash.auth.setBearerToken(toJson.access_token);
        console.log(toJson.access_token);
      
        unsplash.photos.listPhotos(2, 15, "latest")
        .then(res =>
            res.json())
        .then(json => {
          console.log('json' + json);})
        .catch(err => console.log('Auth err', err));
        
        //unsplash.photos.likePhoto("kBJEJqWNtNY");
      }



 class App extends Component {
    componentDidMount() {
      fetch('https://source.unsplash.com/daily')
        .then(res => res.json())
        .then(data => {
            //this.setState({ photos: data });
            console.log(data);
        })
        .catch(err => {
            console.log('Error!', err);
        });
    }

  render() {
    const isAuth =true;
    return (

      isAuth ? (
        <div className="wrapper">
                <Header></ Header>

                <PhotosList />
            </div>

      ) : (
        <Redirect to="/" />
      )
    )
  }

}

 export default App;






