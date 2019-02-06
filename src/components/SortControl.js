var React = require('react');

function SortControl(props) {
  return React.createElement('div', { className: 'sort-control' },
    React.createElement('select', {
      value: props.value,
      onChange: function(e) { props.onChange(e.target.value); }
    },
      React.createElement('option', { value: 'newest' }, 'Newest first'),
      React.createElement('option', { value: 'oldest' }, 'Oldest first')
    )
  );
}

module.exports = SortControl;
