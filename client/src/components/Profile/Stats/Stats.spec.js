import React from "react";
import { shallow } from "enzyme";
import Stats from "./Stats";

const fakeInfo = {
  username: "IceCube",
  stats: {
    followers: 821,
    following: 343,
    appreciations: 4548,
    views: 63267,
    comments: 0,
    team_members: false
  }
};

describe("Stats Component", () => {
  it("should render the table correctly", () => {
    const wrapper = shallow(<Stats userInfo={fakeInfo} />);
    expect(wrapper.find("table").length).toEqual(1);
  });
  it("should map the stats prop", () => {
    const wrapper = shallow(<Stats userInfo={fakeInfo} />);
    expect(wrapper.find("tr").length).toEqual(7);
  });
  it("should map the anchor tag correctly on followers and following", () => {
    const wrapper = shallow(<Stats userInfo={fakeInfo} />);
    expect(wrapper.find("td a").length).toEqual(2);
  });
});
