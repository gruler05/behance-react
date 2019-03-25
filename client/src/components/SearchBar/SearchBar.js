// Todo: Add debounce on typeahead.
import React, { Component } from "react";
import { getUsers } from "../../services/userInfo";
import { Link } from "react-router-dom";
class SearchBar extends Component {
  state = {
    term: "",
    showDropDownList: false,
    user: [],
    isLoading: false
  };

  onInputChange = event => {
    this.setState(
      {
        term: event.target.value,
        isLoading: true
      },
      async () => {
        if (this.state.term.length >= 1) {
          const user = await getUsers(this.state.term);
          this.setState({ user }, () => this.setState({ isLoading: false }));
          if (this.state.user.length) {
            this.setState({ showDropDownList: true });
          } else {
            this.setState({ isLoading: false });
          }
        }
      }
    );
  };
  isTermIncluded = value =>
    value.toLowerCase().includes(this.state.term.toLowerCase());

  renderFilteredContent = user => (
    <Link to={user.username} key={user.id} className="result">
      <div className="content">
        <div className="title">{`${user.firstName} ${user.lastName}`}</div>
      </div>
    </Link>
  );
  hideResultsSection = () => {
    this.setState({ showDropDownList: false });
  };
  onUserSelect = () => {
    this.setState({ term: "" });
  };
  componentDidMount() {
    document.addEventListener("click", this.hideResultsSection);
  }
  render() {
    const filteredUsers = this.state.user.filter(({ firstName, lastName }) =>
      this.isTermIncluded(`${firstName} ${lastName}`)
    );
    return (
      <form className="ui form" onSubmit={event => event.preventDefault()}>
        <div
          className={`ui fluid search ${this.state.isLoading ? "loading" : ""}`}
          onClick={() => this.hideResultsSection}
        >
          <div className="ui fluid icon input">
            <input
              className="field"
              type="text"
              placeholder="Search Users from Behance..."
              value={this.state.term}
              onChange={this.onInputChange}
            />
            <i className="search icon" />
          </div>
          <div
            className={`results transition searchbar-result-container ${
              this.state.term.length && this.state.showDropDownList
                ? "visible"
                : "hidden"
            }`}
            onClick={this.onUserSelect}
          >
            {filteredUsers.length !== 0 &&
              filteredUsers.map(user => this.renderFilteredContent(user))}
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
