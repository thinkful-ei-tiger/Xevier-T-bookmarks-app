import $ from 'jquery';
import api from './api';
import './index.css';
import bookmarkMeat from './bookmark-meat';
import store from './store';

function main() {
    api.getBookmarks()

    .then(response => {
        response.forEach(bookmark => store.addBookmarkToStore(bookmark)
        );

       bookmarkMeat.render()
    });
    bookmarkMeat.bindEventListeners();
};

$(main);


