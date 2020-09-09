import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, NavLink, Link, Switch, Redirect} from 'react-router-dom';
import PhotosList from '../../components/PhotosList/PhotosList';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';
import App from '../../components/App/App';

const router = () => {
    return (
        <Router>
            <Switch>
              {/* <Route exact path='/photos/:id' render={({match}) => {
            console.log('params' + match.params);
                              const {id} = match.params;
                              return (<PhotoItem id={id}/>)}}/>  */}
              <Route path='/' component={() => <h1>Welcome to Unsplash Photo-Viewer!</h1>} exact/>
              <Route path='/photos' component={ PhotosList } />
              <Route exact path='/photos/:id' component={ PhotoDetails }/> 
              <Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>} />
              {/* <Route  path='*' component={() => <h1>404 Not found</h1>}/> */}
              
            </Switch>
        </Router>
    )
}

export default router;