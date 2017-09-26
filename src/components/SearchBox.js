var React = require('react');

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return React.createElement('div', { className: 'search-box' },
      React.createElement('input', {
        type: 'text',
        value: this.props.value,
        onChange: this.handleChange,
        placeholder: 'Search bookmarks...'
      })
    );
  }
}

module.exports = SearchBox;
