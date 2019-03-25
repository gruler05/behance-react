import React from "react";
import { shallow } from "enzyme";
import Information from "./Information";

const fakeInfo = {
  images: {
    "138": "/waduHek.jpg"
  },
  first_name: "Wadu",
  last_name: "Hek",
  username: "waduhek",
  sections: {
    About: "I am wadu hek, potassium?"
  }
};

describe("Information Component", () => {
  it("should render the markup correctly", () => {
    const wrapper = shallow(<Information userInfo={fakeInfo} />);
    expect(wrapper.exists(".image")).toEqual(true);
    expect(wrapper.find(".header").text()).toEqual("Wadu Hek");
    expect(wrapper.find(".description").children()).toHaveLength(2);
  });
});
