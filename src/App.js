import React, { Component } from 'react';
import { Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import PostList from './post/PostList'
import PostDetails from './post/PostDetails'

class App extends Component {
  
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={PostList}/>
        <Route exact path="/:category" component={PostList}/>
        <Route exact path="/:category/:post_id" component={PostDetails}/>
      </div>
    );
  }
}

export default App;
