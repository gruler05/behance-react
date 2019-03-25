import React from "react";
import { shallow } from "enzyme";
import { Profile } from "./Profile";
import { getUserProfileInfo } from "../../services/userInfo";
jest.mock("../../services/userInfo");

const fakeProfile = {
  first_name: "Julia",
  last_name: "Hell",
  username: "julia-hell",
  city: "Berlin",
  country: "Germany",
  occupation: "Graphic Designer",
  url: "https://www.behance.net/julia-hell",
  images: {
    "50":
      "https://mir-s3-cdn-cf.behance.net/user/50/ed55e26255445.589f393b8107a.jpeg",
    "100":
      "https://mir-s3-cdn-cf.behance.net/user/100/ed55e26255445.589f393b8107a.jpeg",
    "115":
      "https://mir-s3-cdn-cf.behance.net/user/115/ed55e26255445.589f393b8107a.jpeg",
    "138":
      "https://mir-s3-cdn-cf.behance.net/user/138/ed55e26255445.589f393b8107a.jpeg"
  },
  stats: {
    followers: 44,
    following: 100,
    appreciations: 146,
    views: 2152,
    comments: 15,
    team_members: false
  },
  website: "julia-hell.com",
  sections: {
    Topics:
      "Graphic Design, Corporate Design, Editorial Design, Webdesign, Layout, Typography"
  }
};
describe("Profile Component", () => {
  it("should pass the correct value to the function to fetch results", () => {
    shallow(<Profile match={{ params: { user: "julia-hell" } }} />);
    expect(getUserProfileInfo).toHaveBeenCalledWith("julia-hell");
  });
  it("should set the state correctly based on the resolved work experience", async () => {
    getUserProfileInfo.mockReturnValueOnce(Promise.resolve(fakeProfile));
    const wrapper = shallow(
      <Profile match={{ params: { user: "julia-hell" } }} />
    );
    await Promise.resolve();
    expect(wrapper.state().userInfo.length).not.toEqual(0);
  });
  it("should render all of the sub components correctly", async () => {
    getUserProfileInfo.mockReturnValueOnce(Promise.resolve(fakeProfile));
    const wrapper = shallow(
      <Profile match={{ params: { user: "julia-hell" } }} />
    );
    await Promise.resolve();
    expect(wrapper.find("Information").length).toEqual(1);
    expect(wrapper.find("Stats").length).toEqual(1);
    expect(wrapper.find("WorkExperience").length).toEqual(1);
    expect(wrapper.find("Projects").length).toEqual(1);
  });
  it("should render a modal correctly", async () => {
    getUserProfileInfo.mockReturnValueOnce(Promise.resolve(fakeProfile));
    const wrapper = shallow(
      <Profile match={{ params: { user: "julia-hell" } }} />
    );
    await Promise.resolve();
    wrapper.setState({ showConnection: "followers" });
    wrapper.update();
    expect(wrapper.find("Modals").length).toEqual(1);
    expect(wrapper.find("ConnectionList").length).toEqual(1);
  });
  it("should have Error Boundary component wrapped on sub components", async () => {
    getUserProfileInfo.mockReturnValueOnce(Promise.resolve(fakeProfile));
    const wrapper = shallow(
      <Profile match={{ params: { user: "julia-hell" } }} />
    );
    await Promise.resolve();
    wrapper.setState({ showConnection: "followers" });
    wrapper.update();
    expect(wrapper.find("ErrorBoundary").length).toEqual(3);
  });
});
