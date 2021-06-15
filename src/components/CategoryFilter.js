var React = require('react');

function CategoryFilter(props) {
  var categories = props.categories;
  var selected = props.selected;
  var counts = props.categoryCounts || {};

  var options = [React.createElement('option', { key: 'all', value: 'All' }, 'All categories')];

  categories.forEach(function(cat) {
    var label = counts[cat] ? cat + ' (' + counts[cat] + ')' : cat;
    options.push(
      React.createElement('option', { key: cat, value: cat }, label)
    );
  });

  return React.createElement('div', { className: 'category-filter' },
    React.createElement('select', {
      value: selected,
      onChange: function(e) { props.onChange(e.target.value); }
    }, options)
  );
}

module.exports = CategoryFilter;
