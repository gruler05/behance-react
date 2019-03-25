import React from "react";
const Information = ({
  userInfo: { images, first_name, last_name, username, sections }
}) => {
  return (
    <div className="item">
      <div className="image">
        <img src={images["138"]} alt="profile-pic" />
      </div>
      <div className="content">
        <h2 className="ui header">{`${first_name} ${last_name}`}</h2>
        <div className="meta">
          <span>{username}</span>
        </div>
        <div className="description">
          {Object.keys(sections).length !== 0 &&
            Object.keys(sections).map(property => {
              return (
                <React.Fragment key={`${username}-${property}`}>
                  <h4>{property}</h4>
                  <p>{sections[property]}</p>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Information;
