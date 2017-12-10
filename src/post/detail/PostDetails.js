import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux'

import { Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';


import CommentList from '../comment/CommentList'
import If from '../../commons/If'

import {
    requestPost,
} from '../postAction'


class PostDetails extends Component {
    componentDidMount = () => {
        const { post, match } = this.props;
        if (!post.id) {
            this.props.getPost(match.params.post_id);
        }
    };

    render() {
        const { post } = this.props;
        return (
            <div>
                <AppBar
                    iconElementLeft={<IconButton containerElement={<Link to="/" />}><NavigationClose /></IconButton>}
                    title={<span>Detalhes do post </span>}
                />
                <Card>
                    <CardTitle title={post.title} 
                    subtitle={`Score: ${post.voteScore}  
                              Commentários: ${post.commentCount}  
                              Autor: ${post.author}
                              Data: ${new Date(post.timestamp).toLocaleDateString()} `} />
                    <CardText >{post.body}</CardText>
                    <CardText>
                        <If test={post.id}>
                            <CommentList postId={post.id} />
                        </If>
                    </CardText>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { match } = ownProps;
    const { posts } = state;
    const post = posts.posts.find(p => p.id === match.params.post_id);
    return { post };
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (post_id) => dispatch(requestPost(post_id))
    }
}


PostDetails.defaultProps = {
    post: {}
};

PostDetails.propTypes = {
    post: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)