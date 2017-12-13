import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux'

import { Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDetails from 'material-ui/svg-icons/action/visibility';

import PostCardActions from './PostCardActions'
import CommentList from '../comment/CommentList'
import If from '../../commons/If'

import {
    requestPost, requestUpdatePost, requestRemovePost, requestVoteScore,
} from '../postAction'
import RaisedButton from 'material-ui/RaisedButton';


class PostDetails extends Component {
    componentDidMount = () => {
        const { post, match } = this.props;
        if (!post.id) {
            this.props.getPost(match.params.post_id);
        }
    };

    render() {
        const { post, removePost, updatePost, updateVoteScore, postIndex, categories} = this.props;

        return (
            <div>
                <AppBar
                    iconElementLeft={<IconButton containerElement={<Link to="/" />}><NavigationClose /></IconButton>}
                    title={<span>Detalhes do post </span>}
                />
                <If test={!post.id}>
                    <p>Não foi possivel carregar o post!</p>
                </If>
                <If test={post.id}>
                    <Card>
                        <CardTitle title={post.title}
                            subtitle={`Votos: ${post.voteScore}  
                              Commentários: ${post.commentCount}  
                              Autor: ${post.author}
                              Data: ${new Date(post.timestamp).toLocaleDateString()} `} />
                        <CardText >{post.body}</CardText>
                        <PostCardActions hideDetail={true} categories={categories} post={post} postIndex={postIndex} />
                        <CardText>
                            <If test={post.id}>
                                <CommentList postId={post.id} />
                            </If>
                        </CardText>
                    </Card>
                </If>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { match } = ownProps;
    const { posts } = state;
    const { error } = posts;
    const post = posts.posts.find(p => p.id === match.params.post_id);
    const postIndex = posts.posts.indexOf(post);
    return { ...posts, error, post, postIndex };
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (post_id) => dispatch(requestPost(post_id)),
        updatePost: (post, postIndex) => dispatch(requestUpdatePost({ post, postIndex })),
        removePost: (post) => dispatch(requestRemovePost({ post })),
        updateVoteScore: (post, postIndex, voteScoreCmd) => dispatch(requestVoteScore({ post, postIndex, voteScoreCmd })),
    }
}

PostDetails.defaultProps = {
    post: {}
};

PostDetails.propTypes = {
    post: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)