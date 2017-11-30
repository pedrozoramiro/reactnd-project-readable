import React, { Component }  from 'react';
import { connect } from 'react-redux'

import PostItem from './detail/PostItem'

class PostList extends Component {


    render() {
        return (
            <div>
                <h2>{this.props.match.params.category || 'CATEGORY NOT FOUND'}</h2>
                <PostItem/>
            </div>
        );
    }
}


function mapStateToProps ({postsReducer}) {
   const {posts} = postsReducer;
   return {posts}
}
  
 export default connect(mapStateToProps)(PostList)