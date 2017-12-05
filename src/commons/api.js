
export function postData(url,data,action){
    return fetchBase(url,data,action,'POST');
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

function fetchBase(url,action,method, data){
    return (dispatch) => {
        fetch(buildUrl(url),
        { headers: 
            { 'Authorization': 'abacate',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            method: method,
            body: data ? JSON.stringify(data) : null
        })
        .then((res) => res.json())
        .then(data=>dispatch(action(data)))
    };
}
