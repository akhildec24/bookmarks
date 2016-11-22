var React = require('react');

var BookmarkItem = React.createClass({
  handleDelete: function() {
    this.props.onDelete(this.props.bookmark.id);
  },

  render: function() {
    var bookmark = this.props.bookmark;

    return React.createElement('div', { className: 'bookmark-item' },
      React.createElement('div', { className: 'bookmark-item-header' },
        React.createElement('h3', { className: 'bookmark-title' },
          React.createElement('a', {
            href: bookmark.url,
            target: '_blank',
            rel: 'noopener noreferrer'
          }, bookmark.title)
        ),
        React.createElement('span', { className: 'bookmark-category' },
          bookmark.category
        )
      ),
      React.createElement('p', { className: 'bookmark-url' }, bookmark.url),
      bookmark.note ? React.createElement('p', { className: 'bookmark-note' }, bookmark.note) : null,
      React.createElement('div', { className: 'bookmark-item-footer' },
        React.createElement('button', {
          className: 'btn-delete',
          onClick: this.handleDelete
        }, 'Delete')
      )
    );
  }
});

module.exports = BookmarkItem;
