var React = require('react');
var useState = React.useState;

function BookmarkForm(props) {
  var _title = useState('');
  var title = _title[0];
  var setTitle = _title[1];
  var _url = useState('');
  var url = _url[0];
  var setUrl = _url[1];
  var _category = useState('');
  var category = _category[0];
  var setCategory = _category[1];
  var _note = useState('');
  var note = _note[0];
  var setNote = _note[1];

  var showDuplicateWarning = url.trim() && props.isDuplicate && props.isDuplicate(url.trim());

  function handleSubmit(e) {
    e.preventDefault();
    var t = title.trim();
    var u = url.trim();
    var c = category.trim();

    if (!t || !u) {
      return;
    }

    props.onAdd({
      title: t,
      url: u,
      category: c || 'Uncategorised',
      note: note.trim()
    });

    setTitle('');
    setUrl('');
    setCategory('');
    setNote('');
  }

  return React.createElement('form', {
    className: 'bookmark-form',
    onSubmit: handleSubmit
  },
    React.createElement('h2', null, 'Add Bookmark'),
    React.createElement('div', { className: 'form-group' },
      React.createElement('label', null, 'Title'),
      React.createElement('input', {
        type: 'text',
        value: title,
        onChange: function(e) { setTitle(e.target.value); },
        placeholder: 'Website name'
      })
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('label', null, 'URL'),
      React.createElement('input', {
        type: 'text',
        value: url,
        onChange: function(e) { setUrl(e.target.value); },
        placeholder: 'https://example.com'
      }),
      showDuplicateWarning ? React.createElement('span', { className: 'duplicate-warning' }, 'This URL already exists') : null
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('label', null, 'Category'),
      React.createElement('input', {
        type: 'text',
        value: category,
        onChange: function(e) { setCategory(e.target.value); },
        placeholder: 'e.g. Development, Design, News',
        list: 'category-suggestions'
      }),
      React.createElement('datalist', { id: 'category-suggestions' },
        props.categories.map(function(cat) {
          return React.createElement('option', { key: cat, value: cat });
        })
      )
    ),
    React.createElement('div', { className: 'form-group' },
      React.createElement('label', null, 'Notes'),
      React.createElement('textarea', {
        value: note,
        onChange: function(e) { setNote(e.target.value); },
        placeholder: 'Optional notes about this link',
        rows: 3
      })
    ),
    React.createElement('button', { type: 'submit', className: 'btn-add' },
      'Save Bookmark'
    )
  );
}

module.exports = BookmarkForm;
