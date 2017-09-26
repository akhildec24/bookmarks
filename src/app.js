// Timeline note: upgraded to React 16 and ES6 class components, September 2017.
// No hooks. No TypeScript. No Vite. No Tailwind. No modern React APIs.

var React = require('react');
var ReactDOM = require('react-dom');
var BookmarkForm = require('./components/BookmarkForm');
var BookmarkList = require('./components/BookmarkList');
var CategoryFilter = require('./components/CategoryFilter');
var SearchBox = require('./components/SearchBox');
var ErrorBoundary = require('./components/ErrorBoundary');

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

class App extends React.Component {
  constructor(props) {
    super(props);
    var stored = localStorage.getItem(STORAGE_KEY);
    var bookmarks;
    if (stored) {
      bookmarks = JSON.parse(stored);
    } else {
      bookmarks = sampleBookmarks;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBookmarks));
    }
    this.state = {
      bookmarks: bookmarks,
      searchTerm: '',
      selectedCategory: 'All'
    };
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.handleDeleteBookmark = this.handleDeleteBookmark.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  saveToStorage(bookmarks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }

  handleAddBookmark(bookmark) {
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
  }

  handleDeleteBookmark(id) {
    var updated = this.state.bookmarks.filter(function(b) {
      return b.id !== id;
    });
    this.setState({ bookmarks: updated });
    this.saveToStorage(updated);
  }

  handleSearchChange(term) {
    this.setState({ searchTerm: term });
  }

  handleCategoryChange(category) {
    this.setState({ selectedCategory: category });
  }

  getCategories() {
    var cats = {};
    this.state.bookmarks.forEach(function(b) {
      if (b.category) {
        cats[b.category] = true;
      }
    });
    return Object.keys(cats).sort();
  }

  getFilteredBookmarks() {
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
  }

  render() {
    var categories = this.getCategories();
    var filtered = this.getFilteredBookmarks();

    return React.createElement(ErrorBoundary, null,
      React.createElement('div', { className: 'app' },
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
      )
    );
  }
}

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app')
);
