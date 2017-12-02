import React, { Component }  from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux'

import PostItem from './detail/PostItem'
import CategoryList from './category/CategoryList'
import {fetchAllPosts,removePost,fetchAllByCategory} from './postAction'

class PostList extends Component {
    

     componentDidMount = () => {
        const {match} =this.props;
         this.loadPosts(match.params.category);
         debugger;
    };
    
   
    loadPosts = (category) => {
        const {history} =this.props;
        if(category){
            this.props.fetchAllByCategory(category);
            history.push(`/${category}`)
            return;
        }
        this.props.fetchAllPosts();
        history.push('/');
    }

    render() {
        const {posts,removePost} = this.props;
        return (
            <div>
                <h2>{this.props.match.params.category || 'CATEGORY NOT FOUND'}</h2>
                <CategoryList handleToCategory={this.loadPosts} />
                {posts.map((post,key)=>(
                    <PostItem key={key} post={post} handleRemove={removePost} />)
                )} 
            </div>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchAllPosts: (data) => dispatch(fetchAllPosts(data)),
        fetchAllByCategory: (data) => dispatch(fetchAllByCategory(data)),
        removePost: (data) => dispatch(removePost(data))
    }
  }

function mapStateToProps (state) {
    const {posts} = state;
    return {...posts};
}
  
 export default connect(mapStateToProps,mapDispatchToProps)(PostList)