    import React, { Component }  from 'react';
    import CommentDetails from './CommentDetails'
    import {getAllComments} from './commentAction'

    import { connect } from 'react-redux'

    class CommentList extends Component {

        componentDidMount = () => {
            const {postId} =this.props;
            if(postId){
                this.props.getAllComments(postId);
            }
        };

        render() {
            const {comments} = this.props;
            return (
                <div>
                    {comments.map(function(comment,index){
                        return <CommentDetails key={index} comment={comment}/>
                    })}
                </div>
            );
        }
    }


    function mapDispatchToProps (dispatch) {
        return {
            getAllComments: (data) => dispatch(getAllComments(data))
            
        }
    }

    function mapStateToProps ({commentReducer}) {
        return {...commentReducer};
    }
    
    export default connect(mapStateToProps,mapDispatchToProps)(CommentList)