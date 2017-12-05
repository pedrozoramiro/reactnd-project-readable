import React, { Component }  from 'react';

import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';

class CommentDetails extends Component {


    render() {
        const {comment,commentIndex,updateVoteScore} = this.props;
        return (
            <div>
                <h3>{comment.body}</h3>
                <h3>{comment.voteScore}</h3>
                <FlatButton icon={<ActionThumbUp  />}  onClick={()=>updateVoteScore(comment,commentIndex,'upVote')} />
                <FlatButton icon={<ActionThumbDown  />} onClick={()=>updateVoteScore(comment,commentIndex,'downVote')} />
            </div>
        );
    }
}
export default CommentDetails;