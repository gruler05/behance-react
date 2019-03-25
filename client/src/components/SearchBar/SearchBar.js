// Todo: Add debounce on typeahead.
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/userInfo";
class SearchBar extends Component {
  state = {
    term: "",
    showDropDownList: false,
    user: [],
    isLoading: false
  };
  shouldShowDropDown = () =>
    this.state.user.length
      ? this.setState({ showDropDownList: true })
      : this.setState({ isLoading: false });

  fetchUsers = async () => {
    if (this.state.term.length) {
      const user = await getUsers(this.state.term);
      this.setState({ user }, () => this.setState({ isLoading: false }));
      this.shouldShowDropDown();
    }
  };
  onInputChange = event => {
    this.setState(
      {
        term: event.target.value,
        isLoading: true
      },
      () => {
        this.fetchUsers();
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
            {!this.state.isLoading && filteredUsers.length === 0 ? (
              <div className="result">
                <div className="content">
                  <div className="title">Sorry, No results Found</div>
                </div>
              </div>
            ) : (
              filteredUsers.length !== 0 &&
              filteredUsers.map(user => this.renderFilteredContent(user))
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
