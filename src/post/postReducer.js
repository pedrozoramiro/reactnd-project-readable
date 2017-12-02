import {
  ADD_POST,
  REMOVE_POST,
  REFRESH_POSTS,
} from './postAction'

const initialState = {
  posts:[]
}

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:{
      const {posts} = state;
      posts.push(action.post);
      return state;
    }
    
    case REMOVE_POST:{
      const {posts} = state;
      return {...state, posts:posts.filter(p => p.id !== action.post.id)}
    }

    case REFRESH_POSTS:{
      const {posts} = action;
      return {...state, posts:posts}
    }

    default:
      return state;
  }
      
}


/*id	     String	Identificador único
timestamp	 Integer	Data de criação - dados default rastreiam isto em Unix time. Você pode usar Date.now() para obter este número
title	     String	Título do post
body	     String	Corpo do post
author	   String	Autor do post
category	 String	Deve ser uma das categorias fornecidas pelo servidor
voteScore	 Integer	Votos líquidos que a postagem recebeu (default: 1)
deleted	   Boolean	Marcado se o post foi 'deletado' (sem acesso no front end), (default: false) */