let bookmarks = []
let adding = false
let error = null
let filter = false
let filteredBookmarks = []

const addBookmarkToStore = function (bookmark) {
    bookmark.forEach((bookmark) => {
        this.bookmarks.push(bookmark);
    });
}

function removeBookmarkFromStore(currentTargetBookmark) {
    const currentTargetBookmarkIndex = this.bookmarks.findIndex((bookmark) => bookmark == currentTargetBookmark
    );
    this.bookmarks.splice(currentTargetBookmarkIndex, 1);
}

function findBookmarkId(bookmarkId) {
    return this.bookmarks.find((bookmark) => bookmark.id == bookmarkId);
}

function toggleBookmark(item, state) {
    item[state] = !item[state];
}

export default {
    bookmarks,
    adding,
    error,
    filter,
    filteredBookmarks,
    addBookmarkToStore,
    removeBookmarkFromStore,
    findBookmarkId,
    toggleBookmark,
}