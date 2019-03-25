import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getUserProfileInfo } from "../../services/userInfo";
import Projects from "./Projects";
import WorkExperience from "./WorkExperience";
import ConnectionList from "./ConnectionList";
import Modal from "../Modals";
import Information from "./Information";
import Stats from "./Stats";
import ErrorBoundary from "../ErrorBoundary";
export class Profile extends Component {
  state = {
    userInfo: {},
    showConnection: "",
    showModal: false
  };
  fetchUserProfile = async () => {
    const {
      match: {
        params: { user }
      }
    } = this.props;
    const data = await getUserProfileInfo(user);
    this.setState({ userInfo: data });
  };
  componentDidMount() {
    this.fetchUserProfile();
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.user !== prevProps.match.params.user) {
      this.fetchUserProfile();
    }
  }
  onConnectionsClick = e => {
    e.preventDefault();
    this.setState({ showConnection: e.target.name, showModal: true });
  };
  onModalClose = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { username } = this.state.userInfo;
    return (
      <div className="ui items">
        {Object.keys(this.state.userInfo).length !== 0 && (
          <React.Fragment>
            <ErrorBoundary>
              <Information userInfo={this.state.userInfo} />
              <Stats
                userInfo={this.state.userInfo}
                onLinkClick={this.onConnectionsClick}
              />
            </ErrorBoundary>
            {this.state.showConnection.length !== 0 && (
              <Modal
                title={this.state.showConnection}
                show={this.state.showModal}
                onModalClose={this.onModalClose}
              >
                <ConnectionList
                  user={username}
                  type={this.state.showConnection}
                />
              </Modal>
            )}
            <ErrorBoundary>
              <WorkExperience user={username} />
            </ErrorBoundary>
            <ErrorBoundary>
              <Projects user={username} />
            </ErrorBoundary>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(Profile);
