import React, { Component } from 'react';
import { connect } from 'react-redux'

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
    fetchAllPosts,
    removePost,
    fetchAllByCategory,
    sortPosts,
    updateVoteScore,
    savePost
} from './postAction'
import { RaisedButton } from 'material-ui';

class PostList extends Component {

    state = { openPostEditDialog: false, postEditIndex: null, sortProperty: 'voteScore' }

    componentDidMount = () => {
        const { match } = this.props;
        this.loadPosts(match.params.category);
    };

    handleSort = (event, index, sortProperty) => {
        this.setState({ sortProperty });
        this.props.sortPosts(sortProperty);
    }

    loadPosts = (category) => {
        const { history, fetchAllPosts, fetchAllByCategory } = this.props;
        if (category) {
            fetchAllByCategory(category);
            history.push(`/${category}`)
            return;
        }
        fetchAllPosts();
        history.push('/');
    }

    handleOpenModal = (openPostEditDialog, postEditIndex) => {
        this.setState({ openPostEditDialog, postEditIndex })
    }

    handleSubmit = (post) => {
        const { postEditIndex } = this.state;
        this.props.savePost(post, postEditIndex);
        this.setState({ openPostEditDialog: false });
    }

    render() {
        const { openPostEditDialog, postEditIndex } = this.state;
        const { posts, removePost, updateVoteScore, updatePost } = this.props;
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
                    {posts.map((post, index) => (
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
        savePost: (data, postIndex) => dispatch(savePost(data, postIndex)),
        fetchAllPosts: (data) => dispatch(fetchAllPosts(data)),
        fetchAllByCategory: (data) => dispatch(fetchAllByCategory(data)),
        removePost: (data) => dispatch(removePost(data)),
        sortPosts: (sortProperty) => dispatch(sortPosts(sortProperty)),
        updateVoteScore: (post, postIndex, voteScoreCmd) => dispatch(updateVoteScore(post, postIndex, voteScoreCmd)),

    }
}

function mapStateToProps(state) {
    const { posts } = state;
    return { ...posts };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)