let bookmarks = [];
let adding = false;
let error = null;
//let filteredBookmarks = [];
let filter = 0;
let errorMssg = '';



const addBookmarkToStore = function (newEntry) {
    const newBookmark = {
        expanded: false,
    };
    bookmarks.push(Object.assign(newEntry, newBookmark));
    console.log('addBookmarkToStore function', bookmarks);
}

function removeBookmarkFromStore(id) {
    let index = -1;
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].id == id) 
        index = i;
    }
    bookmarks.splice(index, 1);
}

function findBookmarkId(id) {
    let thisObj = bookmarks.find(bookmark => bookmark.id === id);
    return thisObj;
}

function setError(val) {
    this.error = val;
}

function toggleBookmark(id) {
    let thisOne = findBookmarkId(id);
    thisOne.expanded = !thisOne.expanded;
}

export default {
    bookmarks,
    adding,
    error,
    filter,
   // filteredBookmarks,
    errorMssg,
    addBookmarkToStore,
    removeBookmarkFromStore,
    findBookmarkId,
    toggleBookmark,
    setError,
}