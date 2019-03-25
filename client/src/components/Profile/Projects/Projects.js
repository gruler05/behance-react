import React, { Component } from "react";
import { getUserProjects } from "../../../services/userInfo";

export default class Projects extends Component {
  state = {
    projects: []
  };
  fetchProjects = async () => {
    const projects = await getUserProjects(this.props.user);
    this.setState({ projects });
  };
  componentDidMount() {
    this.fetchProjects();
  }
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.fetchProjects();
    }
  }
  convertTimestampToDate = timestamp =>
    new Date(timestamp * 1000).toLocaleDateString("en-US");

  render() {
    return (
      <React.Fragment>
        <h3>Projects</h3>
        <div className="ui four column stackable grid container">
          {this.state.projects.map(
            ({
              id,
              name,
              url,
              covers,
              published_on,
              created_on,
              modified_on
            }) => (
              <div className="column" key={id}>
                <a href={url}>
                  <div className="ui link card">
                    <div className="image">
                      <img src={covers["115"]} alt={name} />
                    </div>
                    <div className="content">
                      <div className="meta">
                        <div className="date">
                          <strong>Created: </strong>:
                          {this.convertTimestampToDate(created_on)}
                        </div>
                        <div className="date">
                          <strong>Published: </strong>:
                          {this.convertTimestampToDate(published_on)}
                        </div>
                        <div className="date">
                          <strong>Modified: </strong>:
                          {this.convertTimestampToDate(modified_on)}
                        </div>
                      </div>
                      <div className="description">{name}</div>
                    </div>
                  </div>
                </a>
              </div>
            )
          )}
        </div>
      </React.Fragment>
    );
  }
}
