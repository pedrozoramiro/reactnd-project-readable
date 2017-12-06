    import React, { Component }  from 'react';
    import CommentDetails from './CommentDetails'
    import {getAllComments,updateVoteScore,saveComment,deleteComment} from './commentAction'
    import ActionDone from 'material-ui/svg-icons/action/done';
    import TextField from 'material-ui/TextField';
    import FlatButton  from "material-ui/FlatButton";

    import { connect } from 'react-redux'

    class CommentList extends Component {
        
        state = {newCommentBody:''}

        componentDidMount = () => {
            const {postId} =this.props;
            if(postId){
                this.props.getAllComments(postId);
            }
        };

        handleChange = (event) => {
            const {name, value} = event.target;;
            this.setState({[name]: value});
        }

        render() {
            const {newCommentBody} = this.state;
            const {comments,updateVoteScore,postId,saveComment,deleteComment} = this.props;
            return (
                <div>
                  
                  <TextField
                    hintText="Novo Comentário"
                    name="newCommentBody"
                    value={newCommentBody}
                    onChange={this.handleChange}
                    fullWidth={true}
                    />
                    <FlatButton  icon={<ActionDone  />}  onClick={()=>saveComment(newCommentBody,postId)} />
                    {comments.map(function(comment,index){
                        return <CommentDetails key={index} 
                                               commentIndex={index} 
                                               comment={comment} 
                                               updateVoteScore={updateVoteScore}
                                               deleteComment={deleteComment}/>
                    })}
                </div>
            );
        }
    }


    function mapDispatchToProps (dispatch) {
        return {
            getAllComments: (data) => dispatch(getAllComments(data)),
            updateVoteScore: (comments,commentIndex,voteScoreCmd) => dispatch(updateVoteScore(comments,commentIndex,voteScoreCmd)),
            saveComment: (body,postId) => dispatch(saveComment(body,postId)),
            deleteComment: (body,postId) => dispatch(deleteComment(body,postId)),
            
        }
    }

    function mapStateToProps ({commentReducer}) {
        return {...commentReducer};
    }
    
    export default connect(mapStateToProps,mapDispatchToProps)(CommentList)