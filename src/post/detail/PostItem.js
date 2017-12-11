import React, { Component }  from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';

import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import ActionDetails from 'material-ui/svg-icons/action/visibility';

import  RaisedButton  from 'material-ui/RaisedButton';

class PostItem extends Component {
/* título, autor, número de comentários, pontuação atual e um mecanismo de votos */

    render() {
        const {handleRemove,handleUpdatePost,handleUpdateVoteScore,postIndex,post} = this.props;
        return (
          <Card>
            <CardHeader
              title={post.title}
              subtitle={`category: ${post.category}  Score: ${post.voteScore}  Commentários: ${post.commentCount}  Autor: ${post.author} `}
            />
            <CardActions>
              <RaisedButton icon={<ActionThumbUp  />}  onClick={()=>handleUpdateVoteScore(post,postIndex,'upVote')} />
              <RaisedButton icon={<ActionThumbDown  />} onClick={()=>handleUpdateVoteScore(post,postIndex,'downVote')} />
              <RaisedButton icon={<ActionDetails  />}  containerElement={ <Link to={`/${post.category}/${post.id}`}/>} />
              <RaisedButton icon={<ActionEdit  />} onClick={()=>handleUpdatePost(post)} />
              <RaisedButton icon={<ActionDelete  />}  onClick={()=>handleRemove(post)} />
            </CardActions>
          </Card>
        );
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleUpdateVoteScore :PropTypes.func.isRequired
  };

export default PostItem;
/*Atributo	Tipo	Descrição
id	String	Identificador único
timestamp	Integer	Data de criação - dados default rastreiam isto em Unix time. Você pode usar Date.now() para obter este número
title	String	Título do post
body	String	Corpo do post
author	String	Autor do post
category	String	Deve ser uma das categorias fornecidas pelo servidor
voteScore	Integer	Votos líquidos que a postagem recebeu (default: 1)
deleted	Boolean	Marcado se o post foi 'deletado' (sem acesso no front end), (default: false) */