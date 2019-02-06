var React = require('react');

function SearchBox(props) {
  return React.createElement('div', { className: 'search-box' },
    React.createElement('input', {
      type: 'text',
      value: props.value,
      onChange: function(e) { props.onChange(e.target.value); },
      placeholder: 'Search bookmarks...'
    })
  );
}

module.exports = SearchBox;
