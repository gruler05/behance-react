import React from "react";
import { shallow } from "enzyme";
import SearchBar from "./SearchBar";
import { getUsers } from "../../services/userInfo";
jest.mock("../../services/userInfo");

const fakeUsers = [
  {
    id: 963453,
    firstName: "Matias",
    lastName: "Furno",
    username: "matiasfurno"
  },
  {
    id: 3389963,
    firstName: "Matias",
    lastName: "Perez",
    username: "matiasperez"
  },
  {
    id: 3389963,
    firstName: "Batata",
    lastName: "Wada",
    username: "matiasperez"
  }
];

describe("SearchBar", () => {
  it("should have a input element", () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find("input").length).toBe(1);
  });
  it("set the correct state on input change", () => {
    const wrapper = shallow(<SearchBar />);
    wrapper.find("input").simulate("change", {
      target: { value: "wot" }
    });
    expect(wrapper.find("input").props().value).toEqual("wot");
    expect(wrapper.state().term).toEqual("wot");
  });
  it("should call a getUser function", async () => {
    getUsers.mockReturnValue(Promise.resolve(fakeUsers));
    const newWrapper = shallow(<SearchBar />);
    newWrapper.find("input").simulate("change", {
      target: { value: "Matias" }
    });
    await Promise.resolve();
    expect(getUsers).toHaveBeenCalledWith("Matias");
  });
  it("should show dropdown when results are back", async () => {
    getUsers.mockReturnValue(Promise.resolve(fakeUsers));
    const wrapper = shallow(<SearchBar />);
    wrapper.find("input").simulate("change", {
      target: { value: "Matias" }
    });
    await Promise.resolve();
    expect(wrapper.state().showDropDownList).toEqual(true);
  });
  it("should filter the results correctly", async () => {
    getUsers.mockReturnValue(Promise.resolve(fakeUsers));
    const wrapper = shallow(<SearchBar />);
    wrapper.find("input").simulate("change", {
      target: { value: "Matias" }
    });
    await Promise.resolve();
    expect(wrapper.find(".result").length).toEqual(2);
  });
});
