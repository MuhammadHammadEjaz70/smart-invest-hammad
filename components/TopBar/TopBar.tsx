import React, { useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import styles from "./TopBar.module.css";
import Image from "next/image";
import Theme from "./Theme/Theme";
import { FACEBOOK, INSTAGRAM, TWITTER, UNITED_STATES } from "@/utils/images";

const languages = [
  { code: 'en', label: 'En', flag: UNITED_STATES },
  { code: 'es', label: 'Urdu', flag: UNITED_STATES },
  { code: 'fr', label: 'Fr', flag: UNITED_STATES },
];

function TopBar() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleSelect = (language: any) => {
    setSelectedLanguage(language);
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className={`${styles.header} bg-dark`}>
        <Container>
          <Navbar.Brand href="#home" className="d-flex">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src={FACEBOOK} alt="facebook" className={styles.icon} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
              <Image src={INSTAGRAM} alt="instagram" className={styles.icon} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <Image src={TWITTER} alt="twitter" className={styles.icon} />
            </a>
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Nav className={`align-items-center ${styles.navbarItems}`}>
            {/* Languages */}

            {/* <Dropdown className="mr-2">
              <Dropdown.Toggle variant="dark" id="dropdown-basic" className={styles.dropdownBtn}>
                <Image src={selectedLanguage.flag} alt={selectedLanguage.label} className={styles.flag} />
                {selectedLanguage.label}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {languages.map((language) => (
                  <Dropdown.Item
                    key={language.code}
                    onClick={() => handleSelect(language)}
                    className={styles.dropdownItem}
                  >
                    <Image src={language.flag} alt={language.label} className={styles.flag} /> {language.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown> */}
            <Nav.Link>
              {/* Dark Themes  */}
              <Theme />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopBar;
