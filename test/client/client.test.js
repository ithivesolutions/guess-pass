import React from "react";

import { mount } from "enzyme";
import { expect } from "chai";

import App from "../../src/client/components/App";
import UserAttempts from "../../src/client/components/uerAttempts/UserAttempts";

describe("Guess app Client unit tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
    wrapper.setState({});
    wrapper.update();
  });

  it("renders App without crashing", () => {
    expect(wrapper.contains(<App />)).to.equal(true);
  });

  it("should be able to change the input", () => {
    const userAnswer = {
      name: "13456789",
      value: "13456789",
    };

    wrapper.instance().handleInputChange(userAnswer);
    expect(wrapper.state().userAnswer).to.not.be.null;
  });
});

describe("User attempts unit tests", () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      userAttempts: [
        {
          isCorrect: false,
          highlightArray: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          userAnswer: "12345678",
        },
        {
          isCorrect: false,
          highlightArray: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          userAnswer: "12345678",
        },
      ],
    };
    wrapper = mount(<UserAttempts {...props} />);
  });

  it("render Add UserAttempts component without crashing", () => {
    expect(wrapper.find(".attempt-count")).to.have.lengthOf(1);
  });
});
