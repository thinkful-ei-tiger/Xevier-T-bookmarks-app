import $ from 'jquery';
import index from './index.css';

import api from './api';
import STORE from './store.js';
import store from './store.js';


const app = $('#root');
const list = $('#bookmarks-list')


function renderInitialView() {
  let initialView = ``;
  initialView += `${headerUI()}  ${submitFormUI()} ${filterUI()}`
  $('#root').html(initialView);
  list.html(bookmarkListUI());
}

const generateError = function(errorMessage) {}

// function renderSubmitForm() {
//   let submitForm = ``;
//   submitForm = `${headerUI()}${submitFormUI()}`
//   $('#root').html(submitForm);
//  // used code above instead of app.append(headerUI()); 
//  // app.append(submitFormUI());
//  //change html of root to show submit form html
// }

//------------------------TEMPLATES----------------------------------
function headerUI() {
  return `
  <div id="header">
  <div>
    <h1>My Bookmarks</h1>
  </div>
  </div>
`;
};

// <div id="main-page">    
// <button id="add-new-bookmark">Add New Bookmark</button>
// goes at the top of mainpageUI
function filterUI() {
  return `
    <form>
      <label for="filter">Filter</label>
          <select name="filter" size="1">
            <option value=1>&#9733;</option>
            <option value=2>&#9733;&#9733;</option>
            <option value=3>&#9733;&#9733;&#9733;</option>
            <option value=4>&#9733;&#9733;&#9733;&#9733;</option>
            <option value=5>&#9733;&#9733;&#9733;&#9733;&#9733;</option>
          </select>
    </form>
  </div>
  <br>
  `;
};


function submitFormUI() {
  return `
  <div class="hidden">
          <form id="bookmark-form">

            <label for="title">Title</label>

            <input type="text" name="title" class="js-title" placeholder="Bookmark Title">
            <br>
            
            <label for="js-url">URL</label>
            <input type="text" name="url" class="js-url-link" placeholder="URL Link">
            <br>
            
            <label for="rating">Rating</label>
                <select name="rating" size="1">
                  <option value=1>&#9733;</option>
                  <option value=2>&#9733;&#9733;</option>
                  <option value=3>&#9733;&#9733;&#9733;</option>
                  <option value=4>&#9733;&#9733;&#9733;&#9733;</option>
                  <option value=5>&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                </select>
            <br>

            <label for="description">Description:</label>
              <textarea id="description" name="desc"></textarea>
            <br>
            <input type="submit" value="Add Bookmark" id="add-bookmark"></input>
          </form>
          </div>
          <br>
          `;
};

function bookmarkListUI() {
  const itemsUI = store.bookmarks.map((bookmark) => {
    return `
    <div class="item" data-item-id='${bookmark.id}'>
      <span>${bookmark.title}</span>
      <span>${bookmark.rating}</span>
      <form id="list-form">
        <input type="submit" value="delete" id="delete"></input>
      </form>
    </div>
    `;
});

    return `
    <div class="list">
      ${itemsUI.join(' ')}
    </div>
    `;
  };
//-----------------------------------------------------------------------



//function to hold string of submit view

// **** listener functions

// get ID from element
// const getIdFromElement = function (bookmark) {
//   return $(bookmark).closest('.item').data('item-id');
// };

// handle click for new bookmark
const handleAddBookmark = function () {
  $('#bookmark-form').submit(function(e) {
    e.preventDefault();
    console.log('im here')

    let formElement = $('#bookmark-form')[0];
    let jsonObj = serializeJson(formElement);

    api.createBookmark(jsonObj)
      .then(newBookmark => {
        STORE.addBookmarkToStore(newBookmark);
        render();
      })

    // $.fn.extend({
    //   serializeJSON: function() {
    //     const formData = new FormData(this[0]);
    //     const jsFormData = {};
    //     formData.forEach((val, name) => (jsFormData[name] = val));
    //     return JSON.stringify(jsFormData);
    //   }
    // });
    // const jsonStringedFormData = $('#bookmark-form').serializeJSON();

    // api
    //   .createBookmark(jsonStringedFormData)
    //   .then((data) => {
    //     store.bookmarks.push(data);
    //     render();
      // });
  });
}
//     const form = serializeJson(e.target)
//     store.bookmarks.push(form)
//     renderInitialView();
//   })
// }

// const serializeJson = (form) => {
//   const formData = new FormData(form);
//   const ob = {};
//   formData.forEach((val, name) => ob[name] = val);
//   return ob;
// }

// const handleBookmarkDelete = function () {
//   $('#root').on('submit', '#delete', (e) => {
//     const bookmarkID = $(e.currentTarget)
//     .parent()
//     .parent()
//     .parent()
//     .data('item-id');
//   api.deleteBookmark(id)
//     .then(() => {
//       STORE.deleteBookmark(id)
//     })
//   })
// }

// -> call function to remove item from bookmarks array, render

// handle listener for filtering
// -> grab value of the filter option, re-render 


// handle listener for expanding


// function render() {
//   let bookmarks = [];
//   if (store.filter > 0) {
//     bookmarks = store.bookmarks.filter(
//       (bookmark) => bookmark.rating >= store.filter
//     );
//   } else {
//     bookmarks = store.bookmarks;
//   }
//   const currentView = 
// }


function bindEventListeners() {
  handleAddBookmark();
}

export default {
  bindEventListeners,
  render,
}