export const REFRESH_CATEGORY = 'REFRESH_CATEGORY'

export function refreshAllCategory({categories}) {
  return {
    type: REFRESH_CATEGORY,
    categories
  }
}


export function fetchAllCategories (){
 return fetchData("http://localhost:3001/categories",refreshAllCategory);
}

export function fetchData(url, success,error) {
  return (dispatch) => {
      fetch(url,{ headers: { 'Authorization': 'whatever-you-want' }})
      .then((res) => res.json())
      .then(data=>dispatch(success(data)))
  };
}
