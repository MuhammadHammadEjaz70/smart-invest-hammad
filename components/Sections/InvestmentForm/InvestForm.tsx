import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './InvestForm.module.css';
import CoinDistribution from '../CoinDistribution/CoinDistribution';
import Buttons from "../../../resuable/Button/Button";
function InvestForm() {
  const [name, setName] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [circulatingSupply, setCirculatingSupply] = useState('');
  const [maximumSupply, setMaximumSupply] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setName("");
    setTotalSupply("");
    setCirculatingSupply("");
    setMaximumSupply("");
  };

  const handleButton = ()=>{
    alert("Coming Soon! Under Construction");
  }
  return (
    <>
      <div className={styles.mt5}>
        <Container className={styles.container}>
          <div className={styles.content}>
            <div className='text-center'>
              <span className={styles.fonts}>Investment Specifications</span>
            </div>
            <div className={`text-center ${styles.formDescContainer}`}>
              <span className={styles.formDesc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown</span>
            </div>
            <Row className="justify-content-center mt-5">
              <Col lg={6} md={8} sm={10}>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <span className={styles.formText}>Specifications</span>
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="text" placeholder="Name" className={styles.inputField} value={name} required onChange={(e) => setName(e.target.value)} />
                    {name !== "" ? "":<span>Smartinvest (Si-coin)</span>}
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="text" placeholder="Total Supply" className={styles.inputField} value={totalSupply} required onChange={(e) => setTotalSupply(e.target.value)} />
                    {totalSupply !== "" ? "" : <span>1,000,000,000 Si-coins</span>}
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="text" placeholder="Circulating Supply" className={styles.inputField} value={circulatingSupply} required onChange={(e) => setCirculatingSupply(e.target.value)} />
                    {circulatingSupply !== "" ? "" :<span>200,000,000 Si-coins</span>}
                  </div>
                  <div className={`mb-3 ${styles.inputGroup}`}>
                    <input type="text" placeholder="Maximum Supply" className={styles.inputField} value={maximumSupply} required onChange={(e) => setMaximumSupply(e.target.value)} />
                    {maximumSupply !== "" ? "" :<span>1,000,000,000 Si-coins</span>}
                  </div>
                  <Buttons onClick={handleButton} children="START INVESTMENT" variant='background' width='100%' />
                </form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <CoinDistribution />
    </>
  );
}

export default InvestForm;
