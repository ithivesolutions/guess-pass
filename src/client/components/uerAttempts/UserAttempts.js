import React from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import _ from "lodash";

const UserAttempts = (props) => {
  const attemptsDisplay = () => {
    return (
      props.userAttempts &&
      props.userAttempts.map((eachAttempt, i) => {
        return (
          <ListGroup horizontal className="list-group" key={`lg-${i}`}>
            <ListGroup.Item key={`lgi-${i}`}>
              <Row key={eachAttempt.userAnswer}>
                {[...eachAttempt.userAnswer].map((element, i) => {
                  const highlightClassName =
                    eachAttempt.highlightArray[i] === true
                      ? `highlight-pass`
                      : null;
                  return (
                    <Col className={highlightClassName} key={i}>
                      {element}
                    </Col>
                  );
                })}
              </Row>
            </ListGroup.Item>
          </ListGroup>
        );
      })
    );
  };

  return (
    <Card>
      <div>
        <div className="attempt-count">
          Total Attempts - {_.size(props.userAttempts)}
        </div>
        <Card.Body key={"card-bdy"}>{attemptsDisplay()}</Card.Body>
      </div>
    </Card>
  );
};

export default UserAttempts;
