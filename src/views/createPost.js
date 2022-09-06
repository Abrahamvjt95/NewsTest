import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const publicpost = JSON.parse(localStorage.getItem("news") || "[]");
let publicationType = 1;

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
function CreatePost() {
  const { user } = useAuth0();
  const history = useHistory();
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Are you sure?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button href="/" onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const [modalShow, setModalShow] = React.useState(false);
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleChangeImage = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setModalShow(false);
    publicpost.push(inputs);
    localStorage.setItem("news", JSON.stringify(publicpost));
    history.push("/");
    window.location.reload(false);
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      saveID();
    }
    setValidated(true);
  };

  const saveID = () => {
    const id = Math.floor(Math.random() * (50000 - 1000 + 1) + 1000);
    const bannerImage = document.getElementById("images2");
    const imgData = getBase64Image(bannerImage);
    setInputs((values) => ({
      ...values,
      email: user.email,
      id: id,
      author: user.nickname,
      image: "data:image/png;base64," + imgData,
      type: publicationType,
    }));
    setModalShow(true);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit2}>
      <Form.Group className="mb-3" controlId="titlePost">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Your Title"
          name="title"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="smallDescription">
        <Form.Label>Small Description</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={3}
          placeholder="Your Text"
          name="small"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="imageFile" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          required
          name="picture"
          onChange={handleChangeImage}
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
        {selectedImage && (
          <div>
            <img
              id="images2"
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Select
          aria-label="Categorie"
          onClick={handleChange}
          name="categorie"
          placeholder="Category"
        >
          <option value="Category">Category</option>
          <option value="Politics">Politics</option>
          <option value="Sports">Sports</option>
          <option value="Economy">Economy</option>
          <option value="entertainment">entertainment</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="smallDescription">
        <Form.Label>Content</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={8}
          placeholder="Wrote Article"
          name="content"
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={() => (publicationType = 1)}
      >
        Publish
      </Button>
      <Button
        variant="secondary"
        type="submit"
        onClick={() => (publicationType = 2)}
      >
        Save as draft
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Form>
  );
}

export default CreatePost;
