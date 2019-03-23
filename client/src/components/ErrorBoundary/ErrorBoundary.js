// Todo: To check why the exception is leaking out
import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ui red header">
          <i className="warning sign icon" />
          <div className="content">
            Something might have went wrong in fetching data
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
