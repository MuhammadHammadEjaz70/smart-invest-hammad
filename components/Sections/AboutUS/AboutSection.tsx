import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from "./AboutSection.module.css";
import Image from 'next/image';
import Investment from '../Investment/Investment';
import Buttons from "../../../resuable/Button/Button";
import { ABOUT_US_PHONE_IMAGE, ARROW, GIFT, SECURITY, SUPPORT, UNITED } from '@/utils/images';
import { useRouter } from 'next/router';

function AboutSection() {
    const router = useRouter();
    const handleRouter = ()=>{
        router.push("/signup");
    }
    return (
        <>
            <div className={styles.mt5}>
                <Container>
                    <Row className='m-0'>
                        <div>
                            <button className={styles.chooseUS}>Choose us</button>
                        </div>
                        <Col lg={6} md={6} sm={12}>
                            <span className={styles.fonts}>Why Choose Us!</span>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <div className={styles.aboutUsBtn}>
                                <Buttons onClick={handleRouter} children="Start investment" variant='background' />
                            </div>
                        </Col>
                    </Row>
                    <Row className='m-0'>
                        <Col lg={8} md={8} sm={12} className={`mt-5 ${styles.border}`} style={{ padding: '0' }}>
                            <Row className='m-0'>
                                <Col lg={6} md={12} sm={12}>
                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '26px' }}>
                                        <span className={styles.aboutUs}>About Us</span>
                                        <span className={`my-4 ${styles.aboutUsPara}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</span>
                                        <div>
                                            {/* <Buttons children="LEARN MORE" variant='about-btn' /> */}
                                            <button onClick={handleRouter} className={styles.learnMoreBtn}>LEARN MORE <Image className={styles.arrow} src={ARROW} alt='arrow' /></button>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                    <Image src={ABOUT_US_PHONE_IMAGE} alt='about-img' className='my-2' style={{ width: '100%' }} />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={4} md={4} sm={12} className={`mt-5 ${styles.aboutUsText}`}>
                            <div className={styles.textCentered}>
                                <span className={styles.security}><Image src={SECURITY} alt="..." /></span>
                            </div>
                            <div className={`my-4 ${styles.textAdjust}`}>
                                <span>Security of Funds</span>
                            </div>
                            <div className={`${styles.textCentered}`} style={{ marginBottom: '25px' }}>
                                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Lorem Ipsum has been the industry's</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className='m-0'>
                        <Col lg={4} md={4} sm={12} className={styles.expertTeamText}>
                            <div className={styles.textCentered}>
                                <span className={styles.security}><Image src={UNITED} alt="..." /></span>
                            </div>
                            <div className={`my-4 ${styles.textAdjust}`}>
                                <span>Expert Team</span>
                            </div>
                            <div className={styles.textCentered}>
                                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Lorem Ipsum has been the industry's</span>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12} className={styles.bonusText}>
                            <div className={styles.textCentered}>
                                <span className={styles.security}><Image src={GIFT} alt="..." /></span>
                            </div>
                            <div className={`my-4 ${styles.textAdjust}`}>
                                <span>Bonus and Rewards</span>
                            </div>
                            <div className={styles.textCentered}>
                                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Lorem Ipsum has been the industry's</span>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12} className={styles.supportText}>
                            <div className={styles.textCentered}>
                                <span className={styles.security}><Image src={SUPPORT} alt="..." /></span>
                            </div>
                            <div className={`my-4 ${styles.textAdjust}`}>
                                <span>Support 7*24h</span>
                            </div>
                            <div className={styles.textCentered}>
                                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Lorem Ipsum has been the industry's</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Investment />
        </>
    )
}

export default AboutSection