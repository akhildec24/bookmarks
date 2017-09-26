var React = require('react');

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', { className: 'error-boundary' },
        React.createElement('h2', null, 'Something went wrong.'),
        React.createElement('p', null, 'Please refresh the page and try again.')
      );
    }
    return this.props.children;
  }
}

module.exports = ErrorBoundary;
