    import React, { Component }  from 'react';
    import CommentDetails from './CommentDetails'
    import {getAllComments,updateVoteScore} from './commentAction'

    import { connect } from 'react-redux'

    class CommentList extends Component {

        componentDidMount = () => {
            const {postId} =this.props;
            if(postId){
                this.props.getAllComments(postId);
            }
        };

        handleUpdateVoteScore = (comment,commentIndex,votescoreCmd) =>{

        }
        render() {
            const {comments,updateVoteScore} = this.props;
            return (
                <div>
                    {comments.map(function(comment,index){
                        return <CommentDetails key={index} 
                                               commentIndex={index} 
                                               comment={comment} 
                                               updateVoteScore={updateVoteScore}/>
                    })}
                </div>
            );
        }
    }


    function mapDispatchToProps (dispatch) {
        return {
            getAllComments: (data) => dispatch(getAllComments(data)),
            updateVoteScore: (comments,commentIndex,voteScoreCmd) => dispatch(updateVoteScore(comments,commentIndex,voteScoreCmd)),
            
        }
    }

    function mapStateToProps ({commentReducer}) {
        return {...commentReducer};
    }
    
    export default connect(mapStateToProps,mapDispatchToProps)(CommentList)