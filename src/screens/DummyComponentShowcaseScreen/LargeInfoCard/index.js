import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./index.css";

const LargeInfoCard = () => {
  return (
    <>
      <Container className="pc-largeinfocard-container">
        <Row>
          <Col sm={5} md={4} lg={4} xxl={3} className="pb-4">
            <Image
              src="https://i.ibb.co/s2cm4Q7/got.jpg"
              className="pc-thumb-image mt-4"
              rounded
              fluid
            />
          </Col>
          <Col sm={7} md={8} lg={8} xxl={6}>
            <section className="mt-4">
              <div className="pt-4">
                <h2>Name of Movie, TV Shows, Actors</h2>
                <div className="mt-4">
                  <span className="pc-pgtype">TV-MA</span>
                  <span className="ps-2 pc-genre">
                    Sci-Fi &amp; Fantasy,&nbsp;Drama,&nbsp;Action &amp;
                    Adventure
                  </span>
                  <span className="ps-1">·</span>
                  <span className="ps-2 pc-movietime fw-bold">1h</span>
                </div>
                <div className="mt-4">
                  <div className="d-flex mt-2">
                    <div className="ps-4">
                      <i className="fas fa-heart fa-2x pc-heart"></i>
                    </div>
                    <div className="ps-4">
                      <i className="fas fa-list fa-2x"></i>
                    </div>
                    <div className="ps-4">
                      <i className="fas fa-bookmark fa-2x"></i>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4>Overview</h4>
                  <p className="text-muted">
                    Seven noble families fight for control of the mythical land
                    of Westeros. Friction between the houses leads to full-scale
                    war. All while a very ancient evil awakens in the farthest
                    north. Amidst the war, a neglected military order of
                    misfits, the Night's Watch, is all that stands between the
                    realms of men and icy horrors beyond.
                  </p>
                </div>

                <div className="d-flex pc-creatornames">
                  <div className="ms-4">
                    <div className="fw-bold">David Benioff</div>
                    <div>Creator</div>
                  </div>
                  <div className="ms-4">
                    <div className="fw-bold">D. B. Weiss</div>
                    <div>Creator</div>
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LargeInfoCard;
