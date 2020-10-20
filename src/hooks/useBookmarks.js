var React = require('react');
var useState = React.useState;
var useEffect = React.useEffect;

var STORAGE_KEY = 'bookmark-box-data';

var sampleBookmarks = [
  {
    id: 1,
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    category: 'Development',
    note: 'Essential web development reference',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    category: 'News',
    note: 'Tech community news and discussion',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'CSS-Tricks',
    url: 'https://css-tricks.com',
    category: 'Development',
    note: 'CSS tips and techniques',
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'A List Apart',
    url: 'https://alistapart.com',
    category: 'Design',
    note: 'Web design articles and best practices',
    createdAt: new Date().toISOString()
  }
];

function loadBookmarks() {
  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBookmarks));
  return sampleBookmarks;
}

function useBookmarks() {
  var _state = useState(loadBookmarks);
  var bookmarks = _state[0];
  var setBookmarks = _state[1];

  var _sort = useState('newest');
  var sortOrder = _sort[0];
  var setSortOrder = _sort[1];

  useEffect(function() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
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

  function getSorted(list) {
    var sorted = list.slice();
    if (sortOrder === 'newest') {
      sorted.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else {
      sorted.sort(function(a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
    return sorted;
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

  return {
    bookmarks: bookmarks,
    sortOrder: sortOrder,
    setSortOrder: setSortOrder,
    getSorted: getSorted,
    addBookmark: addBookmark,
    deleteBookmark: deleteBookmark,
    editBookmark: editBookmark,
    importBookmarks: importBookmarks
  };
}

module.exports = useBookmarks;
