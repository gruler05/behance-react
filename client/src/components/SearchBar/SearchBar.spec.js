import React from "react";
import SearchBar from "./SearchBar";
import LandingPage from "../LandingPage";
import { shallow, mount } from "enzyme";
describe.only("SearchBar", () => {
  it("should have a input element", () => {
    const wrapper = mount(<SearchBar />);
    console.log(wrapper);
    // expect(wrapper.find("input")).to.have.lengthOf(1);
  });
});
