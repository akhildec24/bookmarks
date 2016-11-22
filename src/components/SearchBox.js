var React = require('react');

var SearchBox = React.createClass({
  handleChange: function(e) {
    this.props.onChange(e.target.value);
  },

  render: function() {
    return React.createElement('div', { className: 'search-box' },
      React.createElement('input', {
        type: 'text',
        value: this.props.value,
        onChange: this.handleChange,
        placeholder: 'Search bookmarks...'
      })
    );
  }
});

module.exports = SearchBox;
