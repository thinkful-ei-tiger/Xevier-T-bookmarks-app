import $ from 'jquery';
import api from './api.js';
import './index.css';
import bookmarkMeat from './index.js';
import STORE from './store';

function main() {
    api.getBookmarks()
    .then(response => response.json())
    .then(response => {
        response.forEach(bookmark => STORE.addBookmarkToStore(bookmark)
        )
       bookmarks.render()
    })
    bookmarks.bindEventListeners();
};

$(main);

