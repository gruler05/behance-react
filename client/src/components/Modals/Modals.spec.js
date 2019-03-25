import React from "react";
import { shallow } from "enzyme";
import Modals from "./Modals";

describe("Modal Component", () => {
  it("should show correct title based on the props", () => {
    const wrapper = shallow(<Modals title="John Cena" show />);
    expect(wrapper.find(".header").text()).toEqual("John Cena");
  });
  it("should open the modal when props.show is true", () => {
    const wrapper = shallow(<Modals title="John Cena" show />);
    expect(wrapper.state().open).toEqual(true);
    expect(wrapper.find(".active").length).toEqual(2);
  });
  it("should render the children correctly", () => {
    const wrapper = shallow(
      <Modals title="John Cena" show>
        <div>You cant see me</div>
      </Modals>
    );
    expect(
      wrapper
        .find(".content")
        .children()
        .text()
    ).toEqual("You cant see me");
  });
});
