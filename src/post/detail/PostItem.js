import React, { Component }  from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class PostItem extends Component {


    render() {
        const {handleRemove,post} = this.props;
        return (
            <div>
                 <h2>PostItem</h2>
                 <button onClick={()=>handleRemove(post)}>DELETE</button>
                 <Link to="/category/post_id">ITEM LINK</Link>
            </div>
        );
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired
  };

export default PostItem;