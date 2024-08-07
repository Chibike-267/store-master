import ImageComponent from "components/files/ViewImage";
import { useAlertQueue } from "hooks/alerts";
import { getMyListings } from "../store/api/index";
import { useAppDispatch, useAppSelector } from "../store/hooks/reduxHooks";
import { useEffect } from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import Markdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";

const MyListings = () => {
  const dispatch = useAppDispatch();
  const { listings, moreListings, status, error } = useAppSelector((state) => state.myListings);
  const { addAlert } = useAlertQueue();
  const { page } = useParams();
  const navigate = useNavigate();

  const pageNumber = parseInt(page || "", 10);
  useEffect(() => {
  if (isNaN(pageNumber) || pageNumber < 0) {
    addAlert('Invalid page number in URL.', 'error');
    return;
  }

  dispatch(getMyListings(pageNumber))
      .unwrap()
      .catch((err) => {
        addAlert(err.message || 'An error occurred while fetching listings.', 'error');
      });
}, [dispatch, pageNumber, addAlert]);

  if (status === 'loading') {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center mt-5"
      >
        <Row className="w-100">
          <Col className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </Col>
        </Row>
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <>
        <h1>My Listings</h1>
        <p>Error: {error}</p>
      </>
    );
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>My Listings</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-5">
        {listings.map((part) => (
          <Col key={part.id} lg={2} md={3} sm={6} xs={12}>
            <Card onClick={() => navigate(`/listing/${part.id}`)}>
              {part.artifact_ids[0] && (
                <div
                  style={{
                    aspectRatio: "1/1",
                    width: "100%",
                    overflow: "hidden",
                    borderTopLeftRadius: ".25rem",
                    borderTopRightRadius: ".25rem",
                  }}
                >
                  <ImageComponent
                    imageId={part.artifact_ids[0]}
                    size={"small"}
                    caption={part.artifact_ids[0]}
                  />
                </div>
              )}
              <Card.Body>
                <Card.Title>{part.name}</Card.Title>
                <Card.Text>
                  <Markdown
                    components={{
                      p: ({ ...props }) => <p {...props} />,
                      li: ({ ...props }) => <li {...props} />,
                      h1: ({ ...props }) => <h3 {...props} className="h6" />,
                      h2: ({ ...props }) => <h4 {...props} className="h6" />,
                      h3: ({ ...props }) => <h5 {...props} className="h6" />,
                      h4: ({ ...props }) => <h6 {...props} className="h6" />,
                      h5: ({ ...props }) => <h6 {...props} className="h6" />,
                      h6: ({ ...props }) => <h6 {...props} className="h6" />,
                    }}
                  >
                    {part.description}
                  </Markdown>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {(pageNumber > 1 || moreListings) && (
        <Row className="mt-3">
          {pageNumber > 1 && (
            <Col>
              <Link to={"/listings/me/" + (pageNumber - 1)}>Previous Page</Link>
            </Col>
          )}
          {moreListings && (
            <Col className="text-end">
              <Link to={"/listings/me/" + (pageNumber + 1)}>Next Page</Link>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default MyListings;
