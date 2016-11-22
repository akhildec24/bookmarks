// Timeline note: this version uses React patterns common around late 2016.
// React.createClass, getInitialState, props callbacks, Webpack 1, Babel 6.
// Do not use hooks, TypeScript, Vite, Tailwind, or modern React APIs.

var React = require('react');
var ReactDOM = require('react-dom');
var BookmarkForm = require('./components/BookmarkForm');
var BookmarkList = require('./components/BookmarkList');
var CategoryFilter = require('./components/CategoryFilter');
var SearchBox = require('./components/SearchBox');

require('./styles/app.css');

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

var App = React.createClass({
  getInitialState: function() {
    var stored = localStorage.getItem(STORAGE_KEY);
    var bookmarks;
    if (stored) {
      bookmarks = JSON.parse(stored);
    } else {
      bookmarks = sampleBookmarks;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBookmarks));
    }
    return {
      bookmarks: bookmarks,
      searchTerm: '',
      selectedCategory: 'All'
    };
  },

  saveToStorage: function(bookmarks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  },

  handleAddBookmark: function(bookmark) {
    var newBookmark = {
      id: Date.now(),
      title: bookmark.title,
      url: bookmark.url,
      category: bookmark.category,
      note: bookmark.note,
      createdAt: new Date().toISOString()
    };
    var updated = [newBookmark].concat(this.state.bookmarks);
    this.setState({ bookmarks: updated });
    this.saveToStorage(updated);
  },

  handleDeleteBookmark: function(id) {
    var updated = this.state.bookmarks.filter(function(b) {
      return b.id !== id;
    });
    this.setState({ bookmarks: updated });
    this.saveToStorage(updated);
  },

  handleSearchChange: function(term) {
    this.setState({ searchTerm: term });
  },

  handleCategoryChange: function(category) {
    this.setState({ selectedCategory: category });
  },

  getCategories: function() {
    var cats = {};
    this.state.bookmarks.forEach(function(b) {
      if (b.category) {
        cats[b.category] = true;
      }
    });
    return Object.keys(cats).sort();
  },

  getFilteredBookmarks: function() {
    var bookmarks = this.state.bookmarks;
    var searchTerm = this.state.searchTerm.toLowerCase();
    var selectedCategory = this.state.selectedCategory;

    if (selectedCategory !== 'All') {
      bookmarks = bookmarks.filter(function(b) {
        return b.category === selectedCategory;
      });
    }

    if (searchTerm) {
      bookmarks = bookmarks.filter(function(b) {
        var title = (b.title || '').toLowerCase();
        var url = (b.url || '').toLowerCase();
        var note = (b.note || '').toLowerCase();
        return title.indexOf(searchTerm) !== -1 ||
               url.indexOf(searchTerm) !== -1 ||
               note.indexOf(searchTerm) !== -1;
      });
    }

    return bookmarks;
  },

  render: function() {
    var categories = this.getCategories();
    var filtered = this.getFilteredBookmarks();

    return React.createElement('div', { className: 'app' },
      React.createElement('header', { className: 'app-header' },
        React.createElement('h1', null, 'Bookmark Box')
      ),
      React.createElement('div', { className: 'app-body' },
        React.createElement('div', { className: 'sidebar' },
          React.createElement(BookmarkForm, {
            onAdd: this.handleAddBookmark,
            categories: categories
          })
        ),
        React.createElement('div', { className: 'main-content' },
          React.createElement('div', { className: 'toolbar' },
            React.createElement(SearchBox, {
              value: this.state.searchTerm,
              onChange: this.handleSearchChange
            }),
            React.createElement(CategoryFilter, {
              categories: categories,
              selected: this.state.selectedCategory,
              onChange: this.handleCategoryChange
            })
          ),
          React.createElement(BookmarkList, {
            bookmarks: filtered,
            onDelete: this.handleDeleteBookmark
          })
        )
      )
    );
  }
});

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app')
);
