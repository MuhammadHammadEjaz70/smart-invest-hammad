import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Image from 'next/image';
import styles from './Header.module.css';
import { LOGO } from '@/utils/images';
import Buttons from "../../../resuable/Button/Button";
import { useRouter } from 'next/router';


function Header() {
  const router = useRouter();
  const handleRouter = ()=>{
      router.push("/signup");
  }
  const handleLoginRouter = ()=>{
      router.push("/login");
  }
  return (
    <Navbar collapseOnSelect expand="lg" className={styles.header}>
      <Container>
        <Navbar.Brand href="/">
          <Image src={LOGO} alt="facebook" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{background:'#a8a8a8'}} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav style={{ display: 'flex', alignItems: 'center' }}>
            <Nav.Link href="#home" className={styles.text}>HOME</Nav.Link>
            <Nav.Link href="#about-us" className={styles.text}>ABOUT US</Nav.Link>
            <Nav.Link href="#feature" className={styles.text}>FEATURES</Nav.Link>
            <Nav.Link href="#blogs" className={styles.text}>BLOGS</Nav.Link>
            <Nav.Link href="#contact-us" className={styles.text}>CONTACT US</Nav.Link>
            <Nav.Link>
              <Buttons onClick={handleLoginRouter} children="Log In" variant='border' />
            </Nav.Link>
            <Nav.Link>
              <Buttons onClick={handleRouter} children="Sign Up" variant="background" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
