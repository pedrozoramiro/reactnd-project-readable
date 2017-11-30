import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import CommentList from '../comment/CommentList'

class PostDetails extends Component {


    render() {
        /*this.props.match.params.category
          this.props.match.params.post_id */
        return (
            <div>
                <Link to="/">close</Link>
                <CommentList/>
            </div>
        );
    }
}
export default PostDetails;