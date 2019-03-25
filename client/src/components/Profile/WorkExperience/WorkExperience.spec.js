import React from "react";
import { shallow } from "enzyme";
import WorkExperience from "./WorkExperience";
import { getUserWorkExperience } from "../../../services/userInfo";
jest.mock("../../../services/userInfo");

const fakeWorkExperience = [
  {
    position: "Graphic Designer",
    start_date: "06-2013",
    organization: "Julia Hell Grafik",
    location: "Germany"
  },
  {
    position: "Art Director",
    start_date: "09-2017",
    end_date: "12-2018",
    organization: "Königliche-Porzellan-Manufaktur Berlin",
    location: "Berlin, Germany"
  }
];

describe("Work Experience Component", () => {
  it("should pass the correct value to fetch the Work Experience", () => {
    shallow(<WorkExperience user="rickAstley" />);
    expect(getUserWorkExperience).toHaveBeenCalledWith("rickAstley");
  });
  it("should set the state correctly based on the resolved work experience", async () => {
    getUserWorkExperience.mockReturnValueOnce(
      Promise.resolve(fakeWorkExperience)
    );
    const wrapper = shallow(<WorkExperience user="rickAstley" />);
    await Promise.resolve();
    expect(wrapper.state().work.length).not.toEqual(0);
  });
  it("should render the projects component correctly", async () => {
    getUserWorkExperience.mockReturnValueOnce(
      Promise.resolve(fakeWorkExperience)
    );
    const wrapper = shallow(<WorkExperience user="rickAstley" />);
    await Promise.resolve();
    expect(wrapper.find("h4").length).toEqual(2);
  });
});
