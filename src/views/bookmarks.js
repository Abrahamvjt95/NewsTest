import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import SeePost from "../views/seePost";
import { useAuth0 } from "@auth0/auth0-react";
import ConfirmModal from "../components/confirmModal";
import ReactPaginate from "react-paginate";
const bookmarks = JSON.parse(localStorage.getItem("bookmark") || "[]");
function Bookmarks() {
  return (
    <div className="App">
      <Container className="p-4">
        <Row>
          <div class="card-group">
            <PaginatedItems itemsPerPage={6} />
          </div>
        </Row>
      </Container>
    </div>
  );
}

function Items({ currentItems }) {
  const { user } = useAuth0();
  return (
    <Row>
      {currentItems
        ? currentItems.map((item) => {
            return (
              <Col xs="4">
                <Card className="text-center">
                  <Card.Header>{item.categorie}</Card.Header>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <img alt="not fount" width={"150px"} src={item.image} />
                    <Card.Text>{item.small}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <SeePost props={item}></SeePost>
                    {user ? (
                      item.author === user.nickname ? (
                        <ConfirmModal post={item}></ConfirmModal>
                      ) : null
                    ) : null}
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        : null}
    </Row>
  );
}

function PaginatedItems({ itemsPerPage }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(bookmarks.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(bookmarks.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bookmarks.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div class="col-12 mt-5">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default Bookmarks;
