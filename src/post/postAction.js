export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const REFRESH_POSTS = 'REFRESH_POSTS'
export const SORT_POST = 'SORT_POST'
export const REFRESH_POST = 'REFRESH_POST'


export function sortPosts(sortProperty){
  return {
    type: SORT_POST,
    sortProperty
  }
}

export function addPost ( post) {
  return {
    type: ADD_POST,
    post
  }
}

export function deletePost(post) {
  return {
    type: REMOVE_POST,
    post
  }
}

export function refreshAllPosts(data) {
  const posts = Array.isArray(data) ? data: [data];
  return {
    type: REFRESH_POSTS,
    posts
  }
}

function refreshPostUpdate(postIndex) {
  return function (post) {
    return {
      type: REFRESH_POST,
      postIndex,
      post
    }
  }
}

export function updateVoteScore(post,postIndex,voteScoreCmd){  
  return postData(`http://localhost:3001/posts/${post.id}`,{option:voteScoreCmd}, refreshPostUpdate(postIndex));
}


export function getPost(postId){
  return fetchData(`http://localhost:3001/posts/${postId}`,refreshAllPosts);
}


export function fetchAllPosts (){
  return fetchData("http://localhost:3001/posts",refreshAllPosts);
}

export function fetchAllByCategory (category){
  return fetchData(`http://localhost:3001/${category}/posts`,refreshAllPosts);
}

export function removePost (post){
  return deleteData(`http://localhost:3001/posts/${post.id}`,deletePost(post));
}

export function postData(url,data,action){
  return (dispatch) => {
    fetch(url,
      { headers: { 'Authorization': 'whatever-you-want',
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
         method: 'post', 
         body: JSON.stringify(data)
      }
    )
    .then((res) => res.json())
    .then(data=>dispatch(action(data)))
  };
}

export function deleteData(url,action){
  return (dispatch) => {
    fetch(url,{ headers: { 'Authorization': 'whatever-you-want'},method: 'delete'})
    .then((res) => res.json())
    .then(data=>dispatch(action))
};
}
export function fetchData(url, success) {
  return (dispatch) => {
      fetch(url,{ headers: { 'Authorization': 'whatever-you-want' }})
      .then((res) => res.json())
      .then(data=>dispatch(success(data)))
  };
}
