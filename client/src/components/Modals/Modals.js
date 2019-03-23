import React, { Component } from "react";

export default class Modals extends Component {
  state = {
    open: this.props.show
  };
  closeModal = () => {
    this.setState({ open: false });
    this.props.onModalClose();
  };
  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.setState({ open: this.props.show });
    }
  }
  render() {
    return (
      <div
        className={`ui dimmer modals page transition ${
          this.state.open ? "active" : ""
        }`}
        style={{ display: "flex!important" }}
      >
        <div
          className={`ui mini test modal transition visible ${
            this.state.open ? "active" : ""
          }`}
        >
          <div className="header">{this.props.title}</div>
          <div className="content">{this.props.children}</div>
          <div className="actions">
            <div
              className="ui positive right labeled icon button"
              onClick={this.closeModal}
            >
              Close
            </div>
          </div>
        </div>
      </div>
    );
  }
}
