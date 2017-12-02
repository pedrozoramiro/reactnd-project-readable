import React, { Component }  from 'react';
import { connect } from 'react-redux'

import PostItem from './detail/PostItem'
import {fetchAllPosts} from './postAction'

class PostList extends Component {

    componentDidMount = () => {
        this.props.fetchAllPosts();
      };
    

    render() {
        const {posts} = this.props;
        return (
            <div>
                <h2>{this.props.match.params.category || 'CATEGORY NOT FOUND'}</h2>
                {posts.map(post=>(<PostItem post={post} />))} 
            </div>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchAllPosts: (data) => dispatch(fetchAllPosts(data))
    }
  }

function mapStateToProps ({postsReducer}) {
   const {posts} = postsReducer;
   return {posts}
}
  
 export default connect(mapStateToProps,mapDispatchToProps)(PostList)