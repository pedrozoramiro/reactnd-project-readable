import React, { Component } from 'react';
import { connect } from 'react-redux'

import ActionDone from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import FlatButton from "material-ui/FlatButton";
import { Row, Col } from 'react-flexbox-grid';


import CommentDetails from './CommentDetails'
import { requestAllComments, requestUpdateComment, requestCreateComment, requestRemoveComment, requestVoteScoreComment } from './commentAction'

class CommentList extends Component {

    state = { newCommentBody: '' }

    componentDidMount = () => {
        const { postId } = this.props;
        if (postId) {
            this.props.getAllComments({id:postId});
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;;
        this.setState({ [name]: value });
    }

    handleUpdateBodyComment = (body, commentId, commentIndex) => {
        const { updateBodyComment } = this.props;
        updateBodyComment(body, commentId, commentIndex);
    }

    render() {
        const { newCommentBody } = this.state;
        const { comments, updateVoteScore, postId, saveComment, deleteComment } = this.props;
        const handleUpdateBodyComment = this.handleUpdateBodyComment;
        return (
            <div>
                <Row>
                    <Col xs={true} >
                        <TextField
                            hintText="Novo Comentário"
                            name="newCommentBody"
                            value={newCommentBody}
                            onChange={this.handleChange}
                            fullWidth={true}
                        />
                    </Col>
                    <Col xs={1} >
                        <FlatButton icon={<ActionDone />} onClick={() => saveComment(newCommentBody, postId)} />
                    </Col>
                </Row>

                <h3>Comentários</h3>
                {comments.map(function (comment, index) {
                    return <CommentDetails key={index}
                        commentIndex={index}
                        comment={comment}
                        updateVoteScore={updateVoteScore}
                        updateBodyComment={handleUpdateBodyComment}
                        deleteComment={deleteComment} />
                })}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getAllComments: (post) => dispatch(requestAllComments({post})),
        updateVoteScore: (comment, commentIndex, voteScoreCmd) => 
                            dispatch(requestVoteScoreComment({comment, commentIndex, voteScoreCmd})),
        saveComment: (body, parentId) => 
                            dispatch(requestCreateComment({body,parentId})),
        deleteComment: (comment) => 
                            dispatch(requestRemoveComment({comment})),
        updateBodyComment: (body, id, commentIndex) => 
                            dispatch(requestUpdateComment({comment:{body, id}, commentIndex})),

    }
}

function mapStateToProps({ commentReducer }) {
    return { ...commentReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)