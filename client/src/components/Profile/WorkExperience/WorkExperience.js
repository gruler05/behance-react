import React, { Component } from "react";
import { getUserWorkExperience } from "../../../services/userInfo";

export default class WorkExperience extends Component {
  state = {
    work: []
  };
  fetchWorkExperience = async () => {
    const work = await getUserWorkExperience(this.props.user);
    this.setState({ work });
  };
  componentDidMount() {
    this.fetchWorkExperience();
  }
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.fetchWorkExperience();
    }
  }
  render() {
    const { work } = this.state;
    return (
      <React.Fragment>
        {this.state.work.length !== 0 && (
          <React.Fragment>
            <h3>Work Experience</h3>
            <div className="ui segment">
              {work.map(experience => (
                <React.Fragment
                  key={`${experience.start_date}-${experience.organization}`}
                >
                  <h4>{experience.position}</h4>
                  <h5>{experience.organization}</h5>
                  <div>
                    <span>{experience.start_date} -</span>
                    <span>{experience.end_date}</span>
                  </div>
                  <div>{experience.location}</div>
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
