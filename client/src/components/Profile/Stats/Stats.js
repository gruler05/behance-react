import React from "react";
const Stats = ({ userInfo: { username, stats }, onLinkClick }) => {
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th colSpan="2">Stats</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(stats).map(property => (
          <tr key={`${username}-${property}`}>
            <td data-label="name">{property}</td>
            <td data-label="contentValue">
              {property === "followers" || property === "following" ? (
                <a href="true" name={property} onClick={onLinkClick}>
                  {stats[property]}
                </a>
              ) : (
                `${stats[property]}`
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Stats;
