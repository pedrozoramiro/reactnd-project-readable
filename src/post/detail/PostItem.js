import React, { Component } from 'react';
import PropTypes from "prop-types";

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDetails from 'material-ui/svg-icons/action/visibility';
import PostCardActions from './PostCardActions'

import RaisedButton from 'material-ui/RaisedButton';

function PostItem({ handleRemove, handleUpdatePost, handleUpdateVoteScore, postIndex, post, categories }) {
  return (
    <Card>
      <CardHeader
        title={post.title}
        subtitle={`Votos: ${post.voteScore}  Commentários: ${post.commentCount}  Autor: ${post.author} `}
      />
      <PostCardActions categories={categories} post={post} postIndex={postIndex} />
    </Card>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleUpdateVoteScore: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired

};

export default PostItem;