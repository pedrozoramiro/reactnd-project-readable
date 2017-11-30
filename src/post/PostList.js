import React, { Component }  from 'react';
import PostItem from './PostItem'

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
export default PostList;