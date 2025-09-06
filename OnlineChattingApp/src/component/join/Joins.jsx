import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

let username;

function Joins() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // Decode token to get username
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser(payload.username);
    username = payload.username;
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
        <Card.Title className=' text-3xl'>ChitChat</Card.Title>
        <Card.Subtitle className="mb-1 text-muted text-xl">Sweet Note</Card.Subtitle>
        <Card.Text className=' text-lg pb-3'>
          Welcome {user}! Chat online with your close ones in realtime
        </Card.Text>
       <div className=' flex justify-end'><Link to='/chatting'><Button>Let's Chat</Button></Link></div>
      </Card.Body>
    </Card>
   </div>
    </>
  );
}

export default Joins;
export {username}
