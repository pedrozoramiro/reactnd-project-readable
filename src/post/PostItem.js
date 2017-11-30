import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import CommentList from './comment/CommentList'

class PostItem extends Component {


    render() {
        return (
            <div>
                 <h2>PostItem</h2>
                 <Link to="/category/post_id">ITEM LINK</Link>
            </div>
        );
    }
}
export default PostItem;