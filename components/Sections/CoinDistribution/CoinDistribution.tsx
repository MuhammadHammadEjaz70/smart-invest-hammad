import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from "./CoinDistribution.module.css";
import Image from 'next/image';
import { ADA_ICON, ARDR_ICON, LAYER_2 } from '@/utils/images';
import Buttons from "../../../resuable/Button/Button";
import { useRouter } from 'next/router';

function CoinDistribution() {
    const router = useRouter();
    const handleRouter = ()=>{
        router.push("/signup");
    }
    return (
        <div>
            <Container>
                <Row>
                    <div className='d-flex justify-content-center mb-3'>
                        <span className={`mt-5 ${styles.coinsHeading}`}>Coins Distribution</span>
                    </div>
                    <Col lg={4} md={6} sm={12} className='mb-3 my-4'>
                        <div className={styles.box}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Image src={LAYER_2} alt="..." /><span className={`mx-3 ${styles.boxtext}`}>Ethereum</span>
                            </div>
                            <div className="mt-4 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>ICO/ Pre-sale for public</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Liquidity</span>
                                <span className={styles.numberText}>35 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Staking</span>
                                <span className={styles.numberText}>15 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Team Share</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1 mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Marketing</span>
                                <span className={styles.numberText}>10 %</span>
                            </div>
                            <Buttons onClick={handleRouter} children="Learn More" variant='border' width='100%' backgroundColor='#464646' />
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12} className='mb-3 my-4'>
                        <div className={styles.box}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Image src={ADA_ICON} alt="..." /><span className={`mx-3 ${styles.boxtext}`}>Cardano</span>
                            </div>
                            <div className="mt-4 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>ICO/ Pre-sale for public</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Liquidity</span>
                                <span className={styles.numberText}>35 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Staking</span>
                                <span className={styles.numberText}>15 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Team Share</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1 mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Marketing</span>
                                <span className={styles.numberText}>10 %</span>
                            </div>
                            <Buttons onClick={handleRouter} children="Learn More" variant='border' width='100%' backgroundColor='#464646' />
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12} className='mb-3 my-4'>
                        <div className={styles.box}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Image src={ARDR_ICON} alt="..." /><span className={`mx-3 ${styles.boxtext}`}>Axelar</span>
                            </div>
                            <div className="mt-4 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>ICO/ Pre-sale for public</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Liquidity</span>
                                <span className={styles.numberText}>35 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Staking</span>
                                <span className={styles.numberText}>15 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Team Share</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1 mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Marketing</span>
                                <span className={styles.numberText}>10 %</span>
                            </div>
                            <Buttons onClick={handleRouter} children="Learn More" variant='border' width='100%' backgroundColor='#464646' />
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12} className='mb-3 my-4'>
                        <div className={styles.box}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Image src={ADA_ICON} alt="..." /><span className={`mx-3 ${styles.boxtext}`}>Cardano</span>
                            </div>
                            <div className="mt-4 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>ICO/ Pre-sale for public</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Liquidity</span>
                                <span className={styles.numberText}>35 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Staking</span>
                                <span className={styles.numberText}>15 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Team Share</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1 mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Marketing</span>
                                <span className={styles.numberText}>10 %</span>
                            </div>
                            <Buttons onClick={handleRouter} children="Learn More" variant='border' width='100%' backgroundColor='#464646' />
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12} className='mb-3 my-4'>
                        <div className={styles.box}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Image src={ARDR_ICON} alt="..." /><span className={`mx-3 ${styles.boxtext}`}>Axelar</span>
                            </div>
                            <div className="mt-4 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>ICO/ Pre-sale for public</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Liquidity</span>
                                <span className={styles.numberText}>35 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Staking</span>
                                <span className={styles.numberText}>15 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Team Share</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1 mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Marketing</span>
                                <span className={styles.numberText}>10 %</span>
                            </div>
                            <Buttons onClick={handleRouter} children="Learn More" variant='border' width='100%' backgroundColor='#464646' />
                        </div>
                    </Col>
                    <Col lg={4} md={6} sm={12} className='mb-3 my-4'>
                        <div className={styles.box}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Image src={LAYER_2} alt="..." /><span className={`mx-3 ${styles.boxtext}`}>Ethereum</span>
                            </div>
                            <div className="mt-4 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>ICO/ Pre-sale for public</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Liquidity</span>
                                <span className={styles.numberText}>35 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Staking</span>
                                <span className={styles.numberText}>15 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Team Share</span>
                                <span className={styles.numberText}>20 %</span>
                            </div>
                            <hr />
                            <div className="mt-2 my-1 mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, }}>Marketing</span>
                                <span className={styles.numberText}>10 %</span>
                            </div>
                            <Buttons onClick={handleRouter} children="Learn More" variant='border' width='100%' backgroundColor='#464646' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CoinDistribution