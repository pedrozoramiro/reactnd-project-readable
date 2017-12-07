import React, { Component }  from 'react';
import { connect } from 'react-redux'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PostItem from './detail/PostItem'
import PostEditDialog from './detail/PostEditDialog'
import CategoryList from './category/CategoryList'

import ActionAdd from 'material-ui/svg-icons/action/add-shopping-cart';
import {
    fetchAllPosts,
    removePost,
    fetchAllByCategory,
    sortPosts,
    updateVoteScore
} from './postAction'
import FlatButton  from 'material-ui/FlatButton';

class PostList extends Component {
    
    state= {openPostEditDialog : false,sortProperty : 'voteScore'}

     componentDidMount = () => {
        const {match} =this.props;
         this.loadPosts(match.params.category);
    };
    

    handleSort = (event, index, sortProperty) =>{
        this.setState({sortProperty});
        this.props.sortPosts(sortProperty);
    } 
   
    loadPosts = (category) => {
        const {history,fetchAllPosts,fetchAllByCategory} =this.props;
        if(category){
            fetchAllByCategory(category);
            history.push(`/${category}`)
            return;
        }
        fetchAllPosts();
        history.push('/');
    }
    handleOpenPostEditDialog = () =>{
        this.setState({ openPostEditDialog : true})
    }


    handleCloseModal= () =>{
        this.setState({ openPostEditDialog : false})
    }

    handleSubmitEditPost = (event) =>{
        debugger;
        event.preventDefault();
        console.log(event.target)
        this.setState({ openPostEditDialog : false});
    }

    render() {
        const {openPostEditDialog} = this.state;
        const {posts,removePost,updateVoteScore} = this.props;
        return (
            <div>    
                <FlatButton icon={<ActionAdd  />} onClick={this.handleOpenPostEditDialog} />
                <SelectField
                    floatingLabelText="Ordenação"
                    value={this.state.sortProperty}
                    onChange={this.handleSort}
                    >
                    <MenuItem value='voteScore' primaryText="voteScore" />
                    <MenuItem value='timestamp' primaryText="timestamp" />
                </SelectField>

                <h2>{this.props.match.params.category || 'Todos'}</h2>
                <CategoryList handleToCategory={this.loadPosts} />
                {posts.map((post,index)=>(
                    <PostItem key={index} 
                              postIndex={index} 
                              post={post} 
                              handleUpdateVoteScore={updateVoteScore} 
                              handleRemove={removePost} />)
                )} 

                <PostEditDialog 
                    open={openPostEditDialog} 
                    handleCloseModal={this.handleCloseModal} 
                    handleSubmit={this.handleSubmitEditPost}
                    />
            </div>/* título, autor, número de comentários, pontuação atual e um mecanismo de votos */
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchAllPosts: (data) => dispatch(fetchAllPosts(data)),
        fetchAllByCategory: (data) => dispatch(fetchAllByCategory(data)),
        removePost: (data) => dispatch(removePost(data)),
        sortPosts: (sortProperty) => dispatch( sortPosts(sortProperty)),
        updateVoteScore: (post,postIndex,voteScoreCmd) => dispatch( updateVoteScore(post,postIndex,voteScoreCmd)),
        
    }
  }

function mapStateToProps (state) {
    const {posts} = state;
    return {...posts};
}
  
 export default connect(mapStateToProps,mapDispatchToProps)(PostList)