import store from "./store";

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/xevier/bookmarks';

function apiFetch(...args) {
    let error;

    return fetch(...args)
        .then(response => {
            if (!response.ok) {
                error = true;
                store.setError(true);
                return response.json();
            } else {
                store.setError(false);
                return response.json();
            }
        })

        .then(data => {
            if(!error) {
                return data;
            }
        });
};

const getBookmarks = function () {
    return apiFetch(`${BASE_URL}`)
};

const createBookmark = function (newBookmark) {
    return apiFetch(`${BASE_URL}`,
        {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: newBookmark,
        })
}

const deleteBookmark = function (id) {
    return apiFetch(`${BASE_URL}/${id}`,
    {
        method: 'DELETE',
        });
    }


export default {
    getBookmarks, //read
    createBookmark, //create
    deleteBookmark, //delete
};