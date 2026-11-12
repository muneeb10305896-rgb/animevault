import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'

// Top navigation shared by every screen.
// watchlistCount comes from App so the badge updates when items are added.
function NavBar({ watchlistCount }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="sm" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🎬 AnimeVault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Discover
            </Nav.Link>
            <Nav.Link as={NavLink} to="/watchlist">
              My Watchlist{' '}
              <Badge bg="warning" text="dark" pill aria-label={`${watchlistCount} anime saved`}>
                {watchlistCount}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
