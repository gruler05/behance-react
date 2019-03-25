import React from "react";
import { shallow } from "enzyme";
import ConnectionList from "./ConnectionList";
import { getUserConnections } from "../../../services/userInfo";
jest.mock("../../../services/userInfo");
const fakeConnection = [
  {
    id: 619,
    username: "cohnJena",
    images: {
      "50": "/can-you-see-me.jpg",
      "115": "i-dont-think-so.jpg",
      "138": "whatever.jpg"
    }
  }
];
describe("Connection List Component", () => {
  it("should set the correct state based on the type", async () => {
    getUserConnections.mockReturnValueOnce(Promise.resolve(fakeConnection));
    const wrapper = shallow(
      <ConnectionList user="cenaJohn" type="followers" />
    );
    await Promise.resolve();
    expect(wrapper.state().followers.length).not.toEqual(0);
  });
  it("should have correct markup if the data returned is valid", async () => {
    getUserConnections.mockReturnValueOnce(Promise.resolve(fakeConnection));
    const wrapper = shallow(
      <ConnectionList user="cenaJohn" type="followers" />
    );
    await Promise.resolve();
    expect(wrapper.find(".avatar").length).toEqual(1);
  });
  it("should call the function correctly", async () => {
    shallow(<ConnectionList user="cenaJohn" type="followers" />);
    expect(getUserConnections).toHaveBeenCalledWith("cenaJohn", "followers");
  });
});
