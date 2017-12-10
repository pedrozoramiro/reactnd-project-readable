import React, { Component } from 'react';
import { connect } from 'react-redux'
import {reset,initialize} from 'redux-form';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import ActionAdd from 'material-ui/svg-icons/action/note-add';

import PostItem from './detail/PostItem'
import PostEditDialog from './detail/PostEditDialog'
import CategoryList from './category/CategoryList'
import {
    requestSavePost,
    requestAllPosts,
    requestAllPostsByCategory,
    requestRemovePost,
    requestVoteScore,
    requestCreatePost,
    requestUpdatePost
} from './postAction'
import { RaisedButton } from 'material-ui';

class PostList extends Component {

    state = { openPostEditDialog: false, postEditIndex: null, sortProperty: 'voteScore' }

    componentDidMount = () => {
        const { match } = this.props;
        this.loadPosts(match.params.category);
        debugger;
    };

    handleSort = (event, index, sortProperty) => {
        this.setState({ sortProperty });
    }

    loadPosts = (category) => {
        const { history, getAllPosts, getAllByCategory } = this.props;
        if (category) {
            getAllByCategory(category);
            history.push(`/${category}`)
            return;
        }
        getAllPosts();
        history.push('/');
    }

    handleOpenModal = (openPostEditDialog, postEditIndex) => {
        const {posts,initializePostEditForm} = this.props;
        this.setState({ openPostEditDialog, postEditIndex });
        if(openPostEditDialog){
            const post = postEditIndex ? posts[postEditIndex]:{};
            this.props.initializePostEditForm(post);
        }
    }

    handleSubmit = (post) => {
        const { postEditIndex } = this.state;
        if(post.id){
            this.props.updatePost(post, postEditIndex);
        }else{
            this.props.createPost(post);
        }
        this.setState({ openPostEditDialog: false });
    }

    render() {
        const { openPostEditDialog, postEditIndex ,sortProperty } = this.state;
        const { posts, removePost, updateVoteScore, updatePost } = this.props;
        const postsSorted = posts.sort((a, b) => b[sortProperty] - a[sortProperty]);
        const postEdit = posts[postEditIndex];
        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                    title={<span>Udacity Projeto 2 </span>}
                />
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <CategoryList handleToCategory={this.loadPosts} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <SelectField
                            floatingLabelText="Ordenação"
                            value={this.state.sortProperty}
                            onChange={this.handleSort}
                        >
                            <MenuItem value='voteScore' primaryText="Votos" />
                            <MenuItem value='timestamp' primaryText="Data" />
                        </SelectField>
                        <ToolbarSeparator />
                        <RaisedButton onClick={() => this.handleOpenModal(true)} primary icon={<ActionAdd />} />
                    </ToolbarGroup>
                </Toolbar>
                <GridList
                    cellHeight={180}
                >
                    {postsSorted.map((post, index) => (
                        <PostItem key={index}
                            postIndex={index}
                            post={post}
                            handleUpdateVoteScore={updateVoteScore}
                            handleRemove={removePost}
                            handleUpdatePost={() => this.handleOpenModal(true, index)}
                        />)
                    )}
                </GridList>
                <PostEditDialog
                    open={openPostEditDialog}
                    handleCloseModal={() => this.handleOpenModal(false)}
                    onSubmit={this.handleSubmit}
                    postEdit={postEdit}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initializePostEditForm: (post) => dispatch(initialize('PostEditForm', post)),
        createPost: (post, postIndex) => dispatch(requestCreatePost({ post })),
        updatePost: (post, postIndex) => dispatch(requestUpdatePost({ post, postIndex })),
        getAllPosts: () => dispatch(requestAllPosts()),
        getAllByCategory: (category) => dispatch(requestAllPostsByCategory({ category })),
        removePost: (post) => dispatch(requestRemovePost({post})),
        updateVoteScore: (post, postIndex, voteScoreCmd) => dispatch(requestVoteScore({ post, postIndex, voteScoreCmd })),
    }
}

function mapStateToProps(state) {
    const { posts } = state;
    return { ...posts };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)