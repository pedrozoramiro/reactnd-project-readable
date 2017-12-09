import React, { Component } from 'react';
import { connect } from 'react-redux'

import ActionDone from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import FlatButton from "material-ui/FlatButton";
import { Grid, Row, Col } from 'react-flexbox-grid';


import CommentDetails from './CommentDetails'
import { getAllComments, updateVoteScore, saveComment, deleteComment, updateBodyComment } from './commentAction'

class CommentList extends Component {

    state = { newCommentBody: '' }

    componentDidMount = () => {
        const { postId } = this.props;
        if (postId) {
            this.props.getAllComments(postId);
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
                    <Col xs >
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
        getAllComments: (data) => dispatch(getAllComments(data)),
        updateVoteScore: (comments, commentIndex, voteScoreCmd) => dispatch(updateVoteScore(comments, commentIndex, voteScoreCmd)),
        saveComment: (body, postId) => dispatch(saveComment(body, postId)),
        deleteComment: (body, postId) => dispatch(deleteComment(body, postId)),
        updateBodyComment: (body, commentId, commentIndex) => dispatch(updateBodyComment(body, commentId, commentIndex)),

    }
}

function mapStateToProps({ commentReducer }) {
    return { ...commentReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)