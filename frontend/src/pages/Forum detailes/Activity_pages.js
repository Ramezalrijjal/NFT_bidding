import React from "react";
import { connect } from "react-redux"; // Import the connect function
import Comments from "./Ques";
import Sidebar from "./Sidebar";
import { Container, Col, Row } from "reactstrap";

const Activity_pages = ({ user }) => { // Pass 'user' as a prop

  // ...

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col lg={8}>
            <Comments
              commentsUrl="http://localhost:3004/comments"
              currentUserId={user.id}
              userName={user.name}
            />
          </Col>
          <Col lg={4}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

// Connect the component to the Redux state
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Activity_pages);
