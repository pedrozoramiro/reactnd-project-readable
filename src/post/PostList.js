import React, { Component } from 'react';
import { connect } from 'react-redux'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PostItem from './detail/PostItem'
import PostEditDialog from './detail/PostEditDialog'
import CategoryList from './category/CategoryList'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import ActionAdd from 'material-ui/svg-icons/action/add-shopping-cart';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import {
    fetchAllPosts,
    removePost,
    fetchAllByCategory,
    sortPosts,
    updateVoteScore,
    savePost
} from './postAction'

class PostList extends Component {

    state = { openPostEditDialog: false, sortProperty: 'voteScore' }

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
    handleOpenPostEditDialog = () => {
        this.setState({ openPostEditDialog: true })
    }


    handleCloseModal = () => {
        this.setState({ openPostEditDialog: false })
    }

    handleSubmitaaaa = post => {
        this.props.savePost(post);
        this.setState({ openPostEditDialog: false });
    }

    render() {
        const { openPostEditDialog } = this.state;
        const { posts, removePost, updateVoteScore } = this.props;
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
                        <FlatButton onClick={this.handleOpenPostEditDialog} primary label="Novo Post" />
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
                            handleRemove={removePost} />)
                    )}
                </GridList>
                <PostEditDialog
                    open={openPostEditDialog}
                    handleCloseModal={this.handleCloseModal}
                    onSubmit={this.handleSubmitaaaa}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {

        savePost: (data) => dispatch(savePost(data)),
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