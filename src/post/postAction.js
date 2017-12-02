export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const REFRESH_POSTS = 'REFRESH_POSTS'

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

export function refreshAllPosts(posts) {
  return {
    type: REFRESH_POSTS,
    posts
  }
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

export function deleteData(url,action){
  return (dispatch) => {
    fetch(url,{ headers: { 'Authorization': 'whatever-you-want'},method: 'delete'})
    .then((res) => res.json())
    .then(data=>dispatch(action))
};
}
export function fetchData(url, success,error) {
  return (dispatch) => {
      fetch(url,{ headers: { 'Authorization': 'whatever-you-want' }})
      .then((res) => res.json())
      .then(data=>dispatch(success(data)))
  };
}
