
export function postData(url,data,action){
    return fetchBase(url,action,'POST',data);
}

export function deleteData(url,action){
    return fetchBase(url,action,'DELETE');
}

export function getData(url, action) {
    return fetchBase(url,action,'GET');
}

export function putData(url,data, action) {
    return fetchBase(url,action,'PUT',data);
}

function buildUrl(path){
    return `http://localhost:3001${path}`;
}
function buildHeader(){
    return { 'Authorization': 'abacate',
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
    };
}
function fetchBase(url,action,method, data){
    
    return (dispatch) => {
        fetch(buildUrl(url),
        {   headers:buildHeader(),
            method: method,
            body: data ? JSON.stringify(data) : null
        })
        .then((res) => res.json())
        .then(data=>dispatch(action(data)))
    };
}
