import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import SeePost from "../views/seePost";
import { useAuth0 } from "@auth0/auth0-react";
import ConfirmModal from "../components/confirmModal";
import ReactPaginate from "react-paginate";

const publicpost = JSON.parse(localStorage.getItem("news") || "[]");
let publishpost = [];
publicpost.map((item) => {
  if (item.type === 1 && item.categorie === "entertainment") {
    publishpost.push(item);
  }
  return null;
});

function Entertainment() {
  return (
    <Row>
      <div class="card-group">
        <PaginatedItems itemsPerPage={6} />
      </div>
    </Row>
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
                    <SeePost props={item}></SeePost>
                    {user ? (
                      item.author === user.nickname ? (
                        <ConfirmModal post={item}></ConfirmModal>
                      ) : null
                    ) : null}
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Author:{item.author}
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
    setCurrentItems(publishpost.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(publishpost.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % publishpost.length;

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

export default Entertainment;
