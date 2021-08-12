import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { logout } from '../../store/actions/authActions';
import { useDispatch } from 'react-redux';

const MainNavbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isAuth, name } = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='#home'>UrlShortener</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav activeKey={pathname} className='me-auto'>
            <LinkContainer exact to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {!isAuth && (
              <>
                <Nav.Item>
                  <LinkContainer to='/register'>
                    <Nav.Link>Sign up</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </>
            )}
            {isAuth && (
              <Nav.Item>
                <LinkContainer to='/admin'>
                  <Nav.Link>{name}-Admin Panel</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            )}
            {isAuth && (
              <Nav.Item onClick={handleLogout}>
                <LinkContainer to='/register'>
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            )}
            <div className='me-right'></div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MainNavbar;
