import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Investment.module.css';
import Image from 'next/image';
import InvestForm from '../InvestmentForm/InvestForm';
import { EXAM, INVESTMENT_LAPTOP_IMAGE, PACKAGE, PLUS, SALARY } from '@/utils/images';
import Buttons from "../../../resuable/Button/Button";
import { useRouter } from 'next/router';


function Investment() {
    const [isOpen, setIsOpen] = useState([true, false, false]);

    const toggleAccordion = (index: any) => {
        setIsOpen((prevIsOpen) =>
            prevIsOpen.map((item, i) => (i === index ? !item : false))
        );
    };

    const router = useRouter();
    const handleRouter = ()=>{
        router.push("/signup");
    }

    return (
        <>
            <div className={styles.mt5}>
                <Container>
                    <div className='text-center'>
                        <button className={styles.btns}>INVESTMENT</button>
                    </div>
                    <div className='text-center'>
                        <span className={styles.fonts}>Start Investment with Smart Invest!</span>
                    </div>
                    <Row>
                        <Col lg={6} md={12} sm={12}>
                            <div className={`${styles.accordionItem} ${isOpen[0] ? styles.accordionItemOpen : ''}`}>
                                <div className={styles.accordionHeader} onClick={() => toggleAccordion(0)}>
                                    <div className='d-flex' style={{ alignItems: 'center' }}>
                                        <span className={styles.investImg}><Image src={EXAM} alt='exam' /></span>
                                        <span className={`mx-3 ${styles.accordionTitle}`}>Sign Up</span>
                                    </div>
                                    <span className={styles.accordionIcon}>{isOpen[0] ? <Image src={PLUS} alt="cross" /> : '➕'}</span>
                                </div>
                                {isOpen[0] && <div className={styles.accordionContent}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</div>}
                            </div>
                            <div className={`${styles.accordionItem} ${isOpen[1] ? styles.accordionItemOpen : ''}`}>
                                <div className={styles.accordionHeader} onClick={() => toggleAccordion(1)}>
                                    <div className='d-flex' style={{ alignItems: 'center' }}>
                                        <span className={styles.investImg}><Image src={PACKAGE} alt='exam' /></span>
                                        <span className={`mx-3 ${styles.accordionTitle}`}>Choose your packages</span>
                                    </div>
                                    <span className={styles.accordionIcon}>{isOpen[1] ? <Image src={PLUS} alt="cross" /> : '➕'}</span>
                                </div>
                                {isOpen[1] && <div className={styles.accordionContent}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</div>}
                            </div>
                            <div className={`mb-3 ${styles.accordionItem} ${isOpen[2] ? styles.accordionItemOpen : ''}`}>
                                <div className={styles.accordionHeader} onClick={() => toggleAccordion(2)}>
                                    <div className='d-flex' style={{ alignItems: 'center' }}>
                                        <span className={styles.investImg}><Image src={SALARY} alt='exam' /></span>
                                        <span className={`mx-3 ${styles.accordionTitle}`}>Start Investment</span>
                                    </div>
                                    <span className={styles.accordionIcon}>{isOpen[2] ? <Image src={PLUS} alt="cross" /> : '➕'}</span>
                                </div>
                                {isOpen[2] && <div className={styles.accordionContent}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</div>}
                            </div>
                            <Buttons onClick={handleRouter} children="GET STARTED" variant='background' width='100%' />
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                            <div className={styles.colImg}>
                                <Image src={INVESTMENT_LAPTOP_IMAGE} className='image-fluid' alt='colimg' />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <InvestForm />
        </>
    );
}

export default Investment;
