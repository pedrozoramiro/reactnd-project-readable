import React, { Component }  from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import CommentList from '../comment/CommentList'
import TextField from 'material-ui/TextField';

import {
    getPost,
} from '../postAction'


class PostDetails extends Component {    
    componentDidMount = () => {
        const {post, match} =this.props;
        if(!post){
            this.props.getPost(match.params.post_id);
        }
    };

    render() {
        const {post} = this.props ;
        return (
            <div>
                <Link to="/">X</Link>
                {post ? post.title :""}
                <CommentList/>
            </div>
        );
    }
}

function mapStateToProps (state,ownProps) {
    const {match} = ownProps;
    const {posts} = state;
    const post = posts.posts.find(p=>p.id === match.params.post_id);
    return {post};
}

function mapDispatchToProps (dispatch) {
    return {
        getPost: (post_id) => dispatch(getPost(post_id))        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetails)