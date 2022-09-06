import React from "react";
import { Container, Card, Row } from "react-bootstrap";
import SeePost from "../views/seePost";
import { useAuth0 } from "@auth0/auth0-react";
import ConfirmModal from "../components/confirmModal";

function SeeDraft() {
  const publicpost = JSON.parse(localStorage.getItem("news") || "[]");
  const { user } = useAuth0();
  const role = user ? Object.values(user)[0][0] : "";

  return (
    <div className="App">
      <Container className="p-4">
        <Row>
          {publicpost.map((post) => {
            if (
              (post.type === 2 && user.email === post.email) ||
              (post.type === 2 && role === "admin")
            ) {
              return (
                <Card text={"dark"} style={{ width: "30%" }} className="m-2">
                  <Card.Header>{post.categorie}</Card.Header>
                  <Card.Img variant="top" src={post.image} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.small}</Card.Text>
                    <SeePost props={post}></SeePost>
                    {user ? (
                      post.author === user.nickname || role === "admin" ? (
                        <ConfirmModal post={post}></ConfirmModal>
                      ) : null
                    ) : null}
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Author:{post.author}
                  </Card.Footer>
                </Card>
              );
            }
            return null;
          })}
        </Row>
      </Container>
    </div>
  );
}

export default SeeDraft;
