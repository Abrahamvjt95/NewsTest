import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const publicpost = JSON.parse(localStorage.getItem("news") || "[]");
function ConfirmModal(info) {
  let post = info.post;
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  function deletePost() {
    const filtered = publicpost.filter((obj) => {
      return obj.id !== post.id;
    });
    localStorage.setItem("news", JSON.stringify(filtered));
    setModalShow(false);
    window.location.reload(false);
  }
  function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  const handleChangeImage = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this post? this action can not be
            reverted
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => deletePost()}>Yes</Button>
          <Button onClick={props.onHide}>No</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  function MyVerticallyCenteredModal3(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to publish this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => publishDraft()}>Yes</Button>
          <Button onClick={props.onHide}>No</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  function savechanges() {
    if (selectedImage) {
      const bannerImage = document.getElementById("images2");
      post.image = getBase64Image(bannerImage);
      post.image = "data:image/png;base64," + post.image;
    }
    let filtered = publicpost.filter((obj) => {
      return obj.id !== post.id;
    });
    filtered.push(post);
    localStorage.setItem("news", JSON.stringify(filtered));
    window.location.reload(false);
  }
  function publishDraft() {
    post.type = 1;
    let filtered = publicpost.filter((obj) => {
      return obj.id !== post.id;
    });
    filtered.push(post);
    localStorage.setItem("news", JSON.stringify(filtered));
    window.location.reload(false);
  }
  function MyVerticallyCenteredModal2(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Post.title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={post.title}
                onChange={(e) => {
                  post.title = e.target.value;
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Post.small">
              <Form.Label>Small Description</Form.Label>
              <Form.Control
                type="text"
                defaultValue={post.small}
                onChange={(e) => {
                  post.small = e.target.value;
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Post.picture">
              <Form.Label>Image</Form.Label>
              <Form.Control
                id="image"
                type="file"
                required
                name="picture"
                onChange={handleChangeImage}
              />
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
              <div>
                <img
                  id="images2"
                  alt="not fount"
                  width={"250px"}
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : post.image
                  }
                />
                <br />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Select
                aria-label="Categorie"
                defaultValue={post.categorie}
                name="categorie"
                placeholder="Category"
                onChange={(e) => {
                  post.categorie = e.target.value;
                }}
              >
                <option value="Category">Category</option>
                <option value="Politics">Politics</option>
                <option value="Sports">Sports</option>
                <option value="Economy">Economy</option>
                <option value="entertainment">Enterteiment</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Post.Content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={post.content}
                onChange={(e) => {
                  post.content = e.target.value;
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={savechanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <>
      {post.type === 2 ? (
        <Button variant="success" onClick={() => setModalShow3(true)}>
          Publish
        </Button>
      ) : null}
      <Button variant="secondary" onClick={() => setModalShow2(true)}>
        Edit
      </Button>
      <Button variant="danger" onClick={() => setModalShow(true)}>
        Delete
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
      <MyVerticallyCenteredModal3
        show={modalShow3}
        onHide={() => setModalShow3(false)}
      ></MyVerticallyCenteredModal3>
    </>
  );
}

export default ConfirmModal;
