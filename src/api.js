const BASE_URL = 'https://thinkful-list-api.herokuapp.com/xevier';

function apiFetch(...args) {
    let error;

    return fetch(...args)
        .then(response => {
            if (!response.ok) {
                error = { code: response.status};
            }
            return response.json();
        })

        .then(data => {
            if(error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            return data;
        });
}

const getBookmarks = function () {
    return fetch(`${BASE_URL}/bookmarks`)
};

const createBookmark = function (obj) {
    const newBookmark = obj;
    console.log('newbookmark:', newBookmark)
    const options = {
        method: 'POST',
        headers: ({
            'Content-type': 'application/json'
        }),
        body: newBookmark,
    }

    return apiFetch(BASE_URL + '/bookmarks', options)
}

const deleteBookmark = function (objId) {
    const options = {
        method: 'DELETE',
        headers: ({
            'Content-type': 'application/json'
        })
    }
    return apiFetch(BASE_URL + '/bookmarks/' + objId, options)
}

export default {
    getBookmarks, //read
    createBookmark, //create
    deleteBookmark, //delete
}