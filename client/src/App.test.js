import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App";

describe("App component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("should have correct routes", () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper
        .find("Route")
        .at(0)
        .props().component.displayName
    ).toEqual("withRouter(LandingPage)");
    expect(
      wrapper
        .find("Route")
        .at(1)
        .props().component.displayName
    ).toEqual("withRouter(Profile)");
  });
  it("should have a search bar", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("SearchBar").length).toEqual(1);
  });
});
