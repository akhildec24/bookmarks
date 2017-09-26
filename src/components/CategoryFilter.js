var React = require('react');

class CategoryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    var categories = this.props.categories;
    var selected = this.props.selected;

    var options = [React.createElement('option', { key: 'all', value: 'All' }, 'All categories')];

    categories.forEach(function(cat) {
      options.push(
        React.createElement('option', { key: cat, value: cat }, cat)
      );
    });

    return React.createElement('div', { className: 'category-filter' },
      React.createElement('select', {
        value: selected,
        onChange: this.handleChange
      }, options)
    );
  }
}

module.exports = CategoryFilter;
