import React from "react";
import { shallow } from "enzyme";
import Projects from "./Projects";
import { getUserProjects } from "../../../services/userInfo";
jest.mock("../../../services/userInfo");

const fakeProjects = [
  {
    id: 619,
    name: "The Troll Project",
    url: "https://never-gonna-give-you-up.com",
    covers: {
      "50": "/never-gonna-give-you-up.jpg",
      "115": "never-gonna-let-you-down.jpg"
    },
    published_on: "1234",
    created_on: "12333",
    modified_on: "121212"
  }
];

describe("Information Component", () => {
  it("should pass the correct value to fetch the projects", () => {
    shallow(<Projects user="rickAstley" />);
    expect(getUserProjects).toHaveBeenCalledWith("rickAstley");
  });
  it("should set the state correctly based on the resolved projects", async () => {
    getUserProjects.mockReturnValueOnce(Promise.resolve(fakeProjects));
    const wrapper = shallow(<Projects user="rickAstley" />);
    await Promise.resolve();
    expect(wrapper.state().projects.length).not.toEqual(0);
  });
  it("should render the projects component correctly", async () => {
    getUserProjects.mockReturnValueOnce(Promise.resolve(fakeProjects));
    const wrapper = shallow(<Projects user="rickAstley" />);
    await Promise.resolve();
    expect(wrapper.find(".image").length).toEqual(1);
    expect(wrapper.find(".date").length).toEqual(3);
    expect(
      wrapper
        .find(".image")
        .children()
        .props().src
    ).toEqual("never-gonna-let-you-down.jpg");
  });
});
