import React, { Component } from 'react';
import { connect } from 'react-redux'

import { withRouter } from 'react-router'
import { Route } from "react-router-dom";
import PostList from '../post/PostList'
import PostDetails from '../post/detail/PostDetails'
import {requestAllCategories} from '../post/category/categoryActions'

class App extends Component {
  
  componentDidMount() {
		this.props.getAllCategories();
	}


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

function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => dispatch(requestAllCategories())
  }
}


export default withRouter(connect(null, mapDispatchToProps)(App))
