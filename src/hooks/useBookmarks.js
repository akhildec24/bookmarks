var React = require('react');
var useState = React.useState;
var useEffect = React.useEffect;
var storage = require('../services/bookmarkStorage');
var filters = require('../utils/filters');

function useBookmarks() {
  var _state = useState(storage.load);
  var bookmarks = _state[0];
  var setBookmarks = _state[1];

  var _sort = useState('newest');
  var sortOrder = _sort[0];
  var setSortOrder = _sort[1];

  useEffect(function() {
    storage.save(bookmarks);
  }, [bookmarks]);

  function addBookmark(data) {
    var newBookmark = {
      id: Date.now(),
      title: data.title,
      url: data.url,
      category: data.category,
      note: data.note,
      createdAt: new Date().toISOString()
    };
    setBookmarks(function(prev) {
      return [newBookmark].concat(prev);
    });
  }

  function deleteBookmark(id) {
    setBookmarks(function(prev) {
      return prev.filter(function(b) { return b.id !== id; });
    });
  }

  function editBookmark(id, updates) {
    setBookmarks(function(prev) {
      return prev.map(function(b) {
        if (b.id === id) {
          return Object.assign({}, b, updates);
        }
        return b;
      });
    });
  }

  function importBookmarks(imported) {
    setBookmarks(function(prev) {
      var existingUrls = {};
      prev.forEach(function(b) { existingUrls[b.url] = true; });
      var newOnes = imported.filter(function(b) {
        return b.url && !existingUrls[b.url];
      });
      return newOnes.concat(prev);
    });
  }

  function isDuplicate(url) {
    return filters.isDuplicateUrl(bookmarks, url);
  }

  return {
    bookmarks: bookmarks,
    sortOrder: sortOrder,
    setSortOrder: setSortOrder,
    addBookmark: addBookmark,
    deleteBookmark: deleteBookmark,
    editBookmark: editBookmark,
    importBookmarks: importBookmarks,
    isDuplicate: isDuplicate
  };
}

module.exports = useBookmarks;
