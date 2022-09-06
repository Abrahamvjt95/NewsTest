import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import SeePost from "../views/seePost";
import { useAuth0 } from "@auth0/auth0-react";
import ConfirmModal from "./confirmModal";
import ReactPaginate from "react-paginate";

const publicpost = JSON.parse(localStorage.getItem("news") || "[]");
const bookmark = JSON.parse(localStorage.getItem("bookmark") || "[]");
let publishpost = [];
publicpost.map((item) => {
  if (item.type === 1) {
    publishpost.push(item);
  }
  return null;
});

function saveBookmark(post) {
  let repeated = false;
  bookmark.map((item) => {
    if (item.title === post.title) {
      repeated = true;
    }
    return null;
  });
  if (repeated) {
    alert("you have already added this to your bookmarks");
  } else {
    bookmark.push(post);
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
    alert("you have added the item to your bookmarks");
  }
}

function Hero() {
  const { user } = useAuth0();
  const latest = publicpost.filter((obj) => {
    return obj.type === 1;
  });

  return (
    <div className="App">
      <Container className="p-12">
        {latest[0] ? <div class="row rowheader ">
          <Card className="text-center mb-5">
            <Card.Header>
              {latest[0].categorie}
              <button class="btn" onClick={() => saveBookmark(latest[0])}>
                <i class="bi bi-bookmark-star"></i>
              </button>
            </Card.Header>
            <Card.Body>
              <Card.Title>{latest[0].title}</Card.Title>
              <img alt="not fount" width={"150px"} src={latest[0].image} />
              <Card.Text>{latest[0].small}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              <SeePost props={latest[0]}></SeePost>
              {user ? (
                latest[0].author === user.nickname ? (
                  <ConfirmModal post={latest[0]}></ConfirmModal>
                ) : null
              ) : null}
            </Card.Footer>
          </Card>
        </div> : <h1>Nothing to Show</h1>}
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
                  <Card.Header>
                    {item.categorie}
                    <button class="btn" onClick={() => saveBookmark(item)}>
                      <i class="bi bi-bookmark-star"></i>
                    </button>
                  </Card.Header>
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

export default Hero;
