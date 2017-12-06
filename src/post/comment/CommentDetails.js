import React, { Component }  from 'react';
import If from '../../commons/If'
import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionEdit from 'material-ui/svg-icons/action/description';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionCancel from 'material-ui/svg-icons/action/flip-to-back';
import TextField  from 'material-ui/TextField';
import { debug } from 'util';

class CommentDetails extends Component {

    state = {enabledEdit:false,body:''};

    componentDidMount = () => {
       const {comment} = this.props;
       this.setState({body:comment.body});
    };
    
    handleEnabledEdit = (enabledEdit) => this.setState({enabledEdit});
    handleChange = (event) => this.setState({[event.target.name]: event.target.value});
    handleCancelEdit = (event) =>{
        const {comment} = this.props;
        this.setState({body:comment.body});
        this.handleEnabledEdit(false);
    } 
    handleDoneEdit = (event) =>{
        const {comment,commentIndex,updateBodyComment} = this.props;
        const {body} = this.state;
        updateBodyComment(body,comment.id,commentIndex);
    } 
    render() {
        const {enabledEdit,body} = this.state;
        const {comment,commentIndex,updateVoteScore,deleteComment} = this.props;
        return (
            <div>
                <If test={!enabledEdit} >
                    <h3>{comment.body}</h3>
                    <FlatButton icon={<ActionEdit  />} onClick={()=>this.handleEnabledEdit(true)} />
                </If>
                <If test={enabledEdit} >
                    <TextField name="body"  value={body} onChange={this.handleChange} fullWidth={true} />
                    <FlatButton icon={<ActionCancel  />} onClick={this.handleCancelEdit} />
                    <FlatButton icon={<ActionDone  />} onClick={this.handleDoneEdit} />
                </If>
                <h3>{comment.voteScore}</h3>
                <FlatButton icon={<ActionThumbUp  />}  onClick={()=>updateVoteScore(comment,commentIndex,'upVote')} />
                <FlatButton icon={<ActionThumbDown  />} onClick={()=>updateVoteScore(comment,commentIndex,'downVote')} />
                <FlatButton icon={<ActionDelete  />} onClick={()=>deleteComment(commentIndex,comment.id)} />
            </div>
        );
    }
}
export default CommentDetails;