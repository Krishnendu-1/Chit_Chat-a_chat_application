import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Assuming the response includes the token
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" sticky='top'>
        <Container fluid>
          <Navbar.Brand href=""><Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAaSmw9-rAur-kI3b0yFn8K0d8g8f6HlrvGQ&s" roundedCircle className=' h-12 w-12'/></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll >
              <Nav.Link href="" active>Home</Nav.Link>
              <NavDropdown title="Krishnendu Roy" id="navbarScrollingDropdown">
                <NavDropdown.Item href="https://www.linkedin.com/in/krishnenduroy1/">LinkedIn</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item href="https://github.com/Krishnendu-1">
                  GitHub
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className=' flex justify-center items-center h-[50vh] w-[50bw]'>
        <Card style={{ width: '25rem' }} >
          <Card.Body>
            <Card.Title className=' text-3xl'>Login</Card.Title>
            <Card.Subtitle className="mb-1 text-muted text-xl">Welcome back</Card.Subtitle>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <p className="mt-3">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Login;
