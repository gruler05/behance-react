import React from "react";
import { withRouter } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">Behance User Profile</div>
        </h2>
      </div>
    </div>
  );
};

export default withRouter(LandingPage);
