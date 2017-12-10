
export function postData(url,data){
    return fetchBase(url,'POST',data);
}

export function deleteData(url){
    return fetchBase(url,'DELETE');
}

export function getData(url) {
    return fetchBase(url,'GET');
}

export function putData(url,data) {
    return fetchBase(url,'PUT',data);
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
function fetchBase(url,method, data){
    return  fetch(buildUrl(url),
        {   headers:buildHeader(),
            method: method,
            body: data ? JSON.stringify(data) : null
        }).then((res) => res.json());
}
