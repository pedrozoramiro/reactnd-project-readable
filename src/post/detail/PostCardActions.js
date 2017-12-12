import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

import { reset, initialize } from 'redux-form';

import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDetails from 'material-ui/svg-icons/action/visibility';
import If from '../../commons/If'




import {
    requestPost, requestUpdatePost, requestRemovePost, requestVoteScore, requestCreatePost,
} from '../postAction'

import RaisedButton from 'material-ui/RaisedButton';
import PostEditDialog from './PostEditDialog';


class PostCardActions extends Component {
    
    state = { openPostEditDialog: false, postEditIndex: null, sortProperty: 'voteScore' }

    handleOpenModal = (openPostEditDialog, postEditIndex) => {
        const { post } = this.props;
        const { initializePostEditForm } = this.state;
        this.setState({ openPostEditDialog });  
        if (openPostEditDialog) {
            this.props.initializePostEditForm(post);
        }
    }

    handleSubmit = (post) => {
        const { postIndex } = this.props;
        this.props.updatePost(post, postIndex);
        this.setState({ openPostEditDialog: false });
        
    }

    render() {
        const { post, removePost, updatePost, updateVoteScore, postIndex,categories,hideDetail} = this.props;
        const {openPostEditDialog} = this.state;
        
        return (
            <div>
                <CardActions>
                    <RaisedButton icon={<ActionThumbUp />} onClick={() => updateVoteScore(post, postIndex, 'upVote')} />
                    <RaisedButton icon={<ActionThumbDown />} onClick={() => updateVoteScore(post, postIndex, 'downVote')} />
                    <If test={!hideDetail}>
                        <RaisedButton icon={<ActionDetails  />}  containerElement={ <Link to={`/${post.category}/${post.id}`}/>} />
                    </If>
                    <RaisedButton icon={<ActionEdit />} onClick={() => this.handleOpenModal(true,postIndex)} />
                    <RaisedButton icon={<ActionDelete />} onClick={() => removePost(post)} />
                </CardActions>
                <PostEditDialog
                    open={openPostEditDialog}
                    handleCloseModal={() => this.handleOpenModal(false)}
                    onSubmit={this.handleSubmit}
                    categories={categories}
                    postEdit={post}
                    />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (post) => dispatch(requestCreatePost({ post })),        
        initializePostEditForm: (post) => dispatch(initialize('PostEditForm', post)),        
        updatePost: (post, postIndex) => dispatch(requestUpdatePost({ post, postIndex })),
        removePost: (post) => dispatch(requestRemovePost({ post })),
        updateVoteScore: (post, postIndex, voteScoreCmd) => dispatch(requestVoteScore({ post, postIndex, voteScoreCmd })),
    }
}

PostCardActions.propTypes = {
    post: PropTypes.object,
    postIndex: PropTypes.number,
    hideDetail: PropTypes.bool,
    categories:PropTypes.array    
}

export default connect(null, mapDispatchToProps)(PostCardActions)