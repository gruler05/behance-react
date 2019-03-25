import React from "react";
import { shallow, mount } from "enzyme";
import ErrorBoundary from "./ErrorBoundary";

describe("Error Boundary Component", () => {
  it("should display an ErrorMessage if wrapped component throws", () => {
    const FaultyComponent = () => {};
    const wrapper = shallow(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    );
    const error = new Error("Bad Component request");
    wrapper.find("FaultyComponent").simulateError(error);
    expect(wrapper.find(".content").text()).toEqual(
      "Something might have went wrong in fetching data"
    );
  });
  it("should not throw any error when component is not faulty", () => {
    const NotFaultyComponent = () => <div>Hello Batman</div>;
    const wrapper = mount(
      <ErrorBoundary>
        <NotFaultyComponent />
      </ErrorBoundary>
    );
    expect(wrapper.state().hasError).toEqual(false);
    expect(wrapper.find("div").text()).toEqual("Hello Batman");
  });
});
