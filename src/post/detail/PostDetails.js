import React, { Component }  from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import CommentList from '../comment/CommentList'
import TextField from 'material-ui/TextField';


class PostDetails extends Component {

    componentDidMount = () => {
        const {match} =this.props;
        // this.props.getPost(match.params.post_id);
    };

    render() {
        const {post} = this.props ;
        return (
            <div>
               <TextField defaultValue={post ? post.title :""} />
                <Link to="/">close</Link>
                
                <CommentList/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    const {posts} = state;
    return {...posts};
}
  
 export default connect(mapStateToProps)(PostDetails)