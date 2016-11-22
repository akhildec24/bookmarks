var React = require('react');

var BookmarkForm = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      url: '',
      category: '',
      note: ''
    };
  },

  handleChange: function(field, e) {
    var update = {};
    update[field] = e.target.value;
    this.setState(update);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var url = this.state.url.trim();
    var category = this.state.category.trim();

    if (!title || !url) {
      return;
    }

    this.props.onAdd({
      title: title,
      url: url,
      category: category || 'Uncategorised',
      note: this.state.note.trim()
    });

    this.setState({
      title: '',
      url: '',
      category: '',
      note: ''
    });
  },

  render: function() {
    return React.createElement('form', {
      className: 'bookmark-form',
      onSubmit: this.handleSubmit
    },
      React.createElement('h2', null, 'Add Bookmark'),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Title'),
        React.createElement('input', {
          type: 'text',
          value: this.state.title,
          onChange: this.handleChange.bind(this, 'title'),
          placeholder: 'Website name'
        })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'URL'),
        React.createElement('input', {
          type: 'text',
          value: this.state.url,
          onChange: this.handleChange.bind(this, 'url'),
          placeholder: 'https://example.com'
        })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Category'),
        React.createElement('input', {
          type: 'text',
          value: this.state.category,
          onChange: this.handleChange.bind(this, 'category'),
          placeholder: 'e.g. Development, Design, News',
          list: 'category-suggestions'
        }),
        React.createElement('datalist', { id: 'category-suggestions' },
          this.props.categories.map(function(cat) {
            return React.createElement('option', { key: cat, value: cat });
          })
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Notes'),
        React.createElement('textarea', {
          value: this.state.note,
          onChange: this.handleChange.bind(this, 'note'),
          placeholder: 'Optional notes about this link',
          rows: 3
        })
      ),
      React.createElement('button', { type: 'submit', className: 'btn-add' },
        'Save Bookmark'
      )
    );
  }
});

module.exports = BookmarkForm;
