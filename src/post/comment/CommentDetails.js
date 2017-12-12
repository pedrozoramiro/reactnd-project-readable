import React, { Component } from 'react';
import If from '../../commons/If'
import RaisedButton from 'material-ui/RaisedButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionCancel from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';

import {  Row } from 'react-flexbox-grid';
import { Card, CardActions,CardText } from 'material-ui/Card';

class CommentDetails extends Component {

    state = { enabledEdit: false, body: '' };

    componentDidMount = () => {
        const { comment } = this.props;
        this.setState({ body: comment.body });
    };

    handleEnabledEdit = (enabledEdit) => this.setState({ enabledEdit });
    handleChange = (event) => this.setState({ [event.target.name]: event.target.value });
    handleCancelEdit = (event) => {
        const { comment } = this.props;
        this.setState({ body: comment.body });
        this.handleEnabledEdit(false);
    }
    handleDoneEdit = (event) => {
        const { comment, commentIndex, updateBodyComment } = this.props;
        const { body } = this.state;
        updateBodyComment(body, comment.id, commentIndex);
        this.handleEnabledEdit(false);
    }
    render() {
        const { enabledEdit, body } = this.state;
        const { comment, commentIndex, updateVoteScore, deleteComment } = this.props;
        return (

            <Card>
                <CardText >
                    <If test={!enabledEdit} >
                        <Row xs >{comment.body}</Row>
                        <Row >{`Score:${comment.voteScore}`} </Row>
                    </If>
                    <If test={enabledEdit} >
                        <TextField name="body" value={body} onChange={this.handleChange} fullWidth={true} />
                    </If>
                </CardText>
                <CardActions>
                    <If test={!enabledEdit} >
                        <RaisedButton icon={<ActionThumbUp />} onClick={() => updateVoteScore(comment, commentIndex, 'upVote')} />
                        <RaisedButton icon={<ActionThumbDown />} onClick={() => updateVoteScore(comment, commentIndex, 'downVote')} />
                        <RaisedButton icon={<ActionEdit />} onClick={() => this.handleEnabledEdit(true)} />
                        <RaisedButton icon={<ActionDelete />} onClick={() => deleteComment(comment)} />
                    </If>
                    <If test={enabledEdit} >
                        <RaisedButton icon={<ActionDone />} onClick={this.handleDoneEdit} />
                        <RaisedButton icon={<ActionCancel />} onClick={this.handleCancelEdit} />
                    </If>
                </CardActions>
            </Card>
        );
    }
}
export default CommentDetails;