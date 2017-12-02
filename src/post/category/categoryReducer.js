import {
  REFRESH_CATEGORY
} from './categoryAction'

const initialState = {
  categories:[]
}

export function categories(state = initialState, action) {
  switch (action.type) {
     case REFRESH_CATEGORY:{
      const {categories} = action;
      return {...state, categories}
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