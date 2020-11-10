import $ from 'jquery';
import index from './index.css';

import api from './api';
import store from './store';


function render() {
  let initialView = ``;
  initialView += `${headerUI()}${submitFormUI()}${filterUI()}${bookmarkListUI()}`
  $('main').html(initialView);
}


//------------------------TEMPLATES----------------------------------
//removed an extra div from the header
function headerUI() {
  return `
  <div id="header">
    <h1>My Bookmarks</h1>
  </div>
`;
};

function filterUI() {
  return `
    <form id='filter'>
      <label for="filter">Filter:</label>
          <select id='dropdown' class='filter' name="filter" size="1">
            <option value=0></option>
            <option value=1 ${(store.filter === 1) ? 'selected' : ''}>1</option>
            <option value=2 ${(store.filter === 2) ? 'selected' : ''}>2</option>
            <option value=3 ${(store.filter === 3) ? 'selected' : ''}>3</option>
            <option value=4 ${(store.filter === 4) ? 'selected' : ''}>4</option>
            <option value=5 ${(store.filter === 5) ? 'selected' : ''}>5</option>
          </select>
    </form>
  </div>
  <br>
  `;
};


function submitFormUI() {
  return `
  <div id='submit-form'>
          <form id="bookmark-form">

            <label for="title">Title</label>

            <input id='title' type="text" name="title" class="js-title" placeholder="Bookmark Title">
            <br>
            
            <label for="url">URL</label>
            <input type="text" id='url' name="url" class="js-url-link" placeholder="URL Link">
            <br>
            
            <label for="rating">Rating</label>
                <select name="rating" size="1">
                  <option value=1>1</option>
                  <option value=2>2</option>
                  <option value=3>3</option>
                  <option value=4>4</option>
                  <option value=5>5</option>
                </select>
            <br>

            <label for="description">Description:</label>
              <textarea id="description" name="desc"></textarea>
            <br>
            <div id='button-style'>
            <input type="submit" value="Add Bookmark" name="add-b" id="add-bookmark"></input>
            </div>
          </form>
          </div>
          <br>
          `;
};

function bookmarkListUI() {
  const list = store.bookmarks.filter(item => item.rating >= store.filter);
  const itemsUI = list.map((bookmark) => {
    return `
    <form class="list-form">
    <div class="item" data-item-id='${bookmark.id}'>
      <span class='title-name'>${bookmark.title}<br><br>Rating: ${bookmark.rating}</span>
     
      <div id='item' class='hidden'>
      <span><a href='${bookmark.url}'>Visit Site!</a></span>
      <br><br>
      <span>${bookmark.desc}&nbsp;&nbsp;&nbsp;</span>
      </div>
      
      <input type="submit" value="delete" id="delete" name="del"></input>
      <input type="submit" value="view" id="toggle" name="view"></input>
      </div>
    </form>
    `;
});

    return `
    <div class="list">
      ${itemsUI.join(' ')}
    </div>
    `;
};


//-----------------------------------------------------------------------

const handleExpand = function () {
  $('main').on('click', '#toggle', (e) => {
    e.preventDefault();
    let bookmarkID = $(e.target).closest('div').find('#item')
    $(bookmarkID).toggleClass('hidden').toggleClass('expanded');
  });
}

function handleFilterSelected() {
  $('main').on('change', '#filter', (event) => {
    let filter = $('.filter').val();
    console.log(filter);
    store.filter = filter;
    render();
  })
}

const handleBookmarkDelete = function () {
  $('main').on('submit', '.list-form', (e) => {
    e.preventDefault();

    let bookmarkID = $(e.target).find('.item').data('item-id');

  api.deleteBookmark(bookmarkID)
    .then(() => {
      store.removeBookmarkFromStore(bookmarkID)
      render()
    })
    })
};

function validateEntry(newEntry) {
  let data = JSON.parse(newEntry)
  if (!data.url.includes('http') || data.url.length <= 5) {
      alert('URL must be longer than 5 characters and include http(s)://.');
  } else if (data.title === ' ' || data.title.length <= 1) {
    alert('Title cannot be empty.');
  }
}

const handleAddBookmark = function () {
  $('main').on('submit', '#bookmark-form', function(e) {
    e.preventDefault();


    let jsonObj = $(e.target).serializeJson();
    validateEntry(jsonObj);

    api.createBookmark(jsonObj)
      .then(newBookmark => {
        store.addBookmarkToStore(newBookmark);
        render();
      });
  });
}

$.fn.extend({ serializeJson: function() { 
  const formData = new FormData(this[0]); 
  const o = {}; 
  formData.forEach((val, name) => o[name] = val); 
  return JSON.stringify(o); } 
});

function bindEventListeners() {
  handleAddBookmark();
  handleBookmarkDelete();
  handleExpand();
  handleFilterSelected();
}

export default {
  bindEventListeners,
  render,
}