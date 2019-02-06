var React = require('react');
var BookmarkItem = require('./BookmarkItem');

function BookmarkList(props) {
  var bookmarks = props.bookmarks;
  var onDelete = props.onDelete;
  var onEdit = props.onEdit;

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
        onDelete: onDelete,
        onEdit: onEdit
      });
    })
  );
}

module.exports = BookmarkList;
