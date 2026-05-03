import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { HashLink } from 'react-router-hash-link';
import "../../color/navPanel/Navbar.css"

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const navText = {
    brandName: "Max Winchez",
    startSection: "Inicio",
    abilitiesSection: "Habilidades",
    projectSection: "Mis Proyectos",
    contactButton: "Contáctame",
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="https://maxxwr.github.io/xp" style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          color: '#A9A9A9',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          letterSpacing: '2px',
          transition: 'color 0.3s ease',
        }}>
          {navText.brandName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>{navText.startSection}</Nav.Link>
            <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>{navText.abilitiesSection}</Nav.Link>
            <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>{navText.projectSection}</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <HashLink to='#connect'>
              <button className="vvd"><span>{navText.contactButton}</span></button>
            </HashLink>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}