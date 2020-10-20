// Timeline note: upgraded to React 17 and Webpack 5, October 2020.
// New JSX transform enabled. Added import/export JSON feature.

var React = require('react');
var useState = React.useState;
var useRef = React.useRef;
var ReactDOM = require('react-dom');
var useBookmarks = require('./hooks/useBookmarks');
var BookmarkForm = require('./components/BookmarkForm');
var BookmarkList = require('./components/BookmarkList');
var CategoryFilter = require('./components/CategoryFilter');
var SearchBox = require('./components/SearchBox');
var SortControl = require('./components/SortControl');
var ErrorBoundary = require('./components/ErrorBoundary');

require('./styles/app.css');

function App() {
  var bm = useBookmarks();
  var _search = useState('');
  var searchTerm = _search[0];
  var setSearchTerm = _search[1];
  var _category = useState('All');
  var selectedCategory = _category[0];
  var setSelectedCategory = _category[1];
  var fileInputRef = useRef(null);

  function getCategories() {
    var cats = {};
    bm.bookmarks.forEach(function(b) {
      if (b.category) {
        cats[b.category] = true;
      }
    });
    return Object.keys(cats).sort();
  }

  function getFilteredBookmarks() {
    var bookmarks = bm.bookmarks;
    var term = searchTerm.toLowerCase();

    if (selectedCategory !== 'All') {
      bookmarks = bookmarks.filter(function(b) {
        return b.category === selectedCategory;
      });
    }

    if (term) {
      bookmarks = bookmarks.filter(function(b) {
        var title = (b.title || '').toLowerCase();
        var url = (b.url || '').toLowerCase();
        var note = (b.note || '').toLowerCase();
        return title.indexOf(term) !== -1 ||
               url.indexOf(term) !== -1 ||
               note.indexOf(term) !== -1;
      });
    }

    return bm.getSorted(bookmarks);
  }

  function handleExport() {
    var json = JSON.stringify(bm.bookmarks, null, 2);
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarks.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      try {
        var imported = JSON.parse(ev.target.result);
        if (Array.isArray(imported)) {
          bm.importBookmarks(imported);
        }
      } catch (err) {
        console.error('Failed to import bookmarks:', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  var categories = getCategories();
  var filtered = getFilteredBookmarks();

  return React.createElement(ErrorBoundary, null,
    React.createElement('div', { className: 'app' },
      React.createElement('header', { className: 'app-header' },
        React.createElement('h1', null, 'Bookmark Box'),
        React.createElement('div', { className: 'header-actions' },
          React.createElement('button', { className: 'btn-export', onClick: handleExport }, 'Export'),
          React.createElement('button', { className: 'btn-import', onClick: handleImport }, 'Import'),
          React.createElement('input', {
            type: 'file',
            ref: fileInputRef,
            style: { display: 'none' },
            accept: '.json',
            onChange: handleFileChange
          })
        )
      ),
      React.createElement('div', { className: 'app-body' },
        React.createElement('div', { className: 'sidebar' },
          React.createElement(BookmarkForm, {
            onAdd: bm.addBookmark,
            categories: categories
          })
        ),
        React.createElement('div', { className: 'main-content' },
          React.createElement('div', { className: 'toolbar' },
            React.createElement(SearchBox, {
              value: searchTerm,
              onChange: setSearchTerm
            }),
            React.createElement(CategoryFilter, {
              categories: categories,
              selected: selectedCategory,
              onChange: setSelectedCategory
            }),
            React.createElement(SortControl, {
              value: bm.sortOrder,
              onChange: bm.setSortOrder
            })
          ),
          React.createElement(BookmarkList, {
            bookmarks: filtered,
            onDelete: bm.deleteBookmark,
            onEdit: bm.editBookmark
          })
        )
      )
    )
  );
}

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app')
);
