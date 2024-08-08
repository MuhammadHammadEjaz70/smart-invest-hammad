import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from "./Main.module.css";
import Image from 'next/image';
import Buttons from "../../../resuable/Button/Button";
import { MAIN_HEADER_RIGHT_IMAGE, TICK_SIGN } from '@/utils/images';
import Header from '../Header/Header';
import { useRouter } from "next/router";

function Main() {
    const router = useRouter();
    const handleRouter = ()=>{
        router.push("/signup");
    }
    return (
        <div className={styles.backgroundImage}>
            <Container>
                <Row className=''>
                    <Header />
                    <Col lg={6} md={12} sm={12} className="mt-3">
                        <div className={styles.textCentered}>
                            <span className={styles.mainHeading}>Crypto Platform For <span className={styles.gradientText}> Smart Investment </span></span>
                            <br />
                            <span className={styles.para}>Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the  when an unknown
                            </span>
                            <ul className='mt-3' style={{ paddingLeft: '0', textAlign: 'justify' }}>
                                <li className={styles.listText}><Image src={TICK_SIGN} alt='tick' className={styles.tick} /><span className='mx-2'> Lorem Ipsum is simply dummy text of the printing and type</span></li>
                                <li className={styles.listText}><Image src={TICK_SIGN} alt='tick' className={styles.tickText} /><span className='mx-2'> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></li>
                                <li className={styles.listText}><Image src={TICK_SIGN} alt='tick' className={styles.tickText} /><span className='mx-2'> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></li>
                            </ul>
                            <div className='my-4'>
                                <Buttons children="LEARN MORE" variant="border" onClick={handleRouter} />&nbsp;&nbsp;&nbsp;
                                <Buttons children="GET STARTED" variant='background' onClick={handleRouter} />
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                        <div className={styles.imageCentered}>
                            <Image className={`image-fluid ${styles.mainImage}`} src={MAIN_HEADER_RIGHT_IMAGE} alt='main-image' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Main
