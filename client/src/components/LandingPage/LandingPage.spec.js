import React from "react";
import { shallow } from "enzyme";
import { LandingPage } from "./LandingPage";

describe("Landing Page", () => {
  it("should have a Correct content text", () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper.find(".content").text()).toEqual("Behance User Profile");
  });
});
