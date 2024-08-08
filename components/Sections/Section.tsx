import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from "./Section.module.css";
import AboutSection from './AboutUS/AboutSection';

function Section() {
  return (
    <>
      <div className={styles.borderTop}>
        <Container>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <div className={styles.directionChange}>
                <div className={styles.heightFix}>
                  <span className={styles.sectionText}>100+</span>
                  <span className={styles.assetsText}>ASSETS STAKED</span>
                </div>
                <div className={styles.heightFix}>
                  <span className={styles.sectionText}>200K+</span>
                  <span className={styles.assetsText}>USERS</span>
                </div>
                <div className={styles.heightFix}>
                  <span className={styles.sectionText}>$40M+</span>
                  <span className={styles.assetsText}>REWARDS PAID</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <AboutSection />
    </>
  )
}

export default Section;
