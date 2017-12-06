import React, { Component }  from 'react';

import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionDelete from 'material-ui/svg-icons/action/delete';

class CommentDetails extends Component {


    render() {
        const {comment,commentIndex,updateVoteScore,deleteComment} = this.props;
        return (
            <div>
                <h3>{comment.body}</h3>
                <h3>{comment.voteScore}</h3>
                <FlatButton icon={<ActionThumbUp  />}  onClick={()=>updateVoteScore(comment,commentIndex,'upVote')} />
                <FlatButton icon={<ActionThumbDown  />} onClick={()=>updateVoteScore(comment,commentIndex,'downVote')} />
                <FlatButton icon={<ActionDelete  />} onClick={()=>deleteComment(commentIndex,comment.id)} />
            </div>
        );
    }
}
export default CommentDetails;