import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";

import * as passApi from "../api/passModelApi";

import Header from "./headerFooter/Header";
import UserAttempts from "./uerAttempts/UserAttempts";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAttempts: [],
    };
  }

  async componentDidMount() {
    await passApi.newPasswords().then((newPassHint) => {
      this.setState({
        newPassHint: newPassHint,
      });
    });
  }

  handleInputChange(userAnswer) {
    this.setState(
      {
        userAnswer: {
          value: userAnswer,
          label: userAnswer,
        },
      },
      () => this.validateData()
    );
  }

  validateData() {
    const state = this.state;
    let errors = {};

    if (
      state.userAnswer.value.length > 8 ||
      state.userAnswer.value.length < 8
    ) {
      errors.userAnswer = "Password is 8 Digit!";
    }

    this.setState({
      errors: errors,
    });
  }

  submitAnswer(e) {
    e.preventDefault();
    e.stopPropagation();

    const verifyData = {
      hint: this.state.newPassHint,
      userAnswer: this.state.userAnswer.value,
    };

    passApi.verifyPassword(verifyData).then((response) => {
      this.setState({
        userAttempts: [...this.state.userAttempts, ...[response]],
      });
    });

    this.setState({
      userAnswer: {
        value: "",
        label: "",
      },
    });
  }

  render() {
    const state = this.state;
    const errors = this.state.errors;

    const submitDisabled =
      (errors && Object.keys(errors).length > 0) || !this.state.userAnswer;

    return (
      <div className="app">
        <Container className="app-Wrap">
          <Header />
          <div className="welcome-note">
            Welcome to Guess password game - You will get a hint of the 8 digit
            passoword below - Enjoy hacking!{" "}
          </div>
          <h3 className="inp-hint">
            {state.newPassHint && state.newPassHint ? state.newPassHint : ""}
          </h3>
          <div className="inp-Form">
            <Form onSubmit={(e) => this.submitAnswer(e)}>
              <Form.Group controlId="gtp.CI1">
                <Form.Control
                  className="inp-field"
                  type="number"
                  placeholder="Enter your guess"
                  required
                  onChange={(userAnswer) =>
                    this.handleInputChange(userAnswer.target.value)
                  }
                  value={this.state.userAnswer && this.state.userAnswer.value}
                />

                <Button
                  className="inp-button"
                  type="submit"
                  disabled={submitDisabled}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </div>
          {this.state.userAttempts.length > 0 ? (
            <UserAttempts userAttempts={this.state.userAttempts} />
          ) : null}
        </Container>
      </div>
    );
  }
}
