var React = require('react');
var useState = React.useState;

function BookmarkItem(props) {
  var bookmark = props.bookmark;
  var _editing = useState(false);
  var editing = _editing[0];
  var setEditing = _editing[1];
  var _editTitle = useState(bookmark.title);
  var editTitle = _editTitle[0];
  var setEditTitle = _editTitle[1];
  var _editNote = useState(bookmark.note || '');
  var editNote = _editNote[0];
  var setEditNote = _editNote[1];

  function handleDelete() {
    props.onDelete(bookmark.id);
  }

  function handleEdit() {
    setEditing(true);
  }

  function handleSave() {
    props.onEdit(bookmark.id, { title: editTitle, note: editNote });
    setEditing(false);
  }

  function handleCancel() {
    setEditTitle(bookmark.title);
    setEditNote(bookmark.note || '');
    setEditing(false);
  }

  if (editing) {
    return React.createElement('div', { className: 'bookmark-item bookmark-item-editing' },
      React.createElement('div', { className: 'form-group' },
        React.createElement('input', {
          type: 'text',
          value: editTitle,
          onChange: function(e) { setEditTitle(e.target.value); }
        })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('textarea', {
          value: editNote,
          onChange: function(e) { setEditNote(e.target.value); },
          rows: 2
        })
      ),
      React.createElement('div', { className: 'bookmark-item-footer' },
        React.createElement('button', { className: 'btn-save', onClick: handleSave }, 'Save'),
        React.createElement('button', { className: 'btn-cancel', onClick: handleCancel }, 'Cancel')
      )
    );
  }

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
      React.createElement('button', { className: 'btn-edit', onClick: handleEdit }, 'Edit'),
      React.createElement('button', { className: 'btn-delete', onClick: handleDelete }, 'Delete')
    )
  );
}

module.exports = BookmarkItem;
