import React, { Component } from "react";
import { getUserConnections } from "../../../services/userInfo";

export default class ConnectionList extends Component {
  state = {
    followers: [],
    following: []
  };

  // connectionType = this.props.type;
  fetchConnections = async (username, type) => {
    const data = await getUserConnections(username, type);
    if (this.props.type === "followers") {
      this.setState({ followers: data });
    } else {
      this.setState({ following: data });
    }
  };
  componentDidMount() {
    this.fetchConnections(this.props.user, this.props.type);
  }
  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      if (
        (this.props.type === "followers" &&
          this.state.followers.length === 0) ||
        (this.props.type === "following" && this.state.following.length === 0)
      )
        this.fetchConnections(this.props.user, this.props.type);
    }
  }
  render() {
    return (
      <div className="connection-list">
        {this.state[this.props.type].length !== 0 ? (
          this.state[this.props.type].map(({ id, images, username }) => (
            <React.Fragment key={id}>
              <img
                className="ui avatar tiny image"
                src={images[50]}
                alt={username}
              />
              <span class="avatar-username">{username}</span>
              <div className="ui divider" />
            </React.Fragment>
          ))
        ) : (
          <div className="ui active dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        )}
      </div>
    );
  }
}
