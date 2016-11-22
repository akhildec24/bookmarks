var React = require('react');
var BookmarkItem = require('./BookmarkItem');

var BookmarkList = React.createClass({
  render: function() {
    var bookmarks = this.props.bookmarks;
    var onDelete = this.props.onDelete;

    if (bookmarks.length === 0) {
      return React.createElement('div', { className: 'bookmark-list-empty' },
        React.createElement('p', null, 'No bookmarks found.')
      );
    }

    return React.createElement('div', { className: 'bookmark-list' },
      bookmarks.map(function(bookmark) {
        return React.createElement(BookmarkItem, {
          key: bookmark.id,
          bookmark: bookmark,
          onDelete: onDelete
        });
      })
    );
  }
});

module.exports = BookmarkList;
