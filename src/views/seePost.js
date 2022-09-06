import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SeePost(info) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Read
      </Button>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{info.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img alt="not fount" width={"250px"} src={info.props.image} />
        </Modal.Body>
        <Modal.Body>{info.props.content}</Modal.Body>
        <Modal.Footer>
          <p>Author:{info.props.author}</p>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SeePost;
