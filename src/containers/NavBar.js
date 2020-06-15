import React, { useState, useContext } from 'react';
import logo from '../logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useHistory } from 'react-router-dom';
import {
    NavbarToggler,
    Collapse,
    Button,
    Nav,
    NavItem,
    Navbar,
} from 'reactstrap';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { UserContext } from '../contexts/UserContext';

const NavBar = () => {
    const [currentModal, setCurrentModal] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('user_data');
        setCurrentUser(null);
        setCurrentModal('');
        history.push('/')
        setIsOpen(false);
    }

    return (
        <>
            <Navbar className="mb-3" color="light" light expand="md">
                <Link to="/"><img src={logo} width='40px' style={{ marginLeft: '15px', marginRight: '15px' }} alt=""></img></Link>
                <NavbarToggler onClick={() => setIsOpen(opened => !opened)} />
                <Collapse isOpen={isOpen} navbar>
                    {currentUser !== null //if JWT exists, then remove login/signup buttons
                        ?
                        <Nav className="ml-auto" navbar style={{ alignItems: 'center' }}>
                            <NavItem>
                                <Link to="/profile" style={{ margin: '20px' }}><img src={currentUser.profile_picture} width='30px' height='30px' alt="" /></Link>
                            </NavItem>
                            <NavItem>
                                <Button color="danger" onClick={logout} style={{ margin: '10px' }}>Logout</Button>
                            </NavItem>
                        </Nav>
                        :
                        <Nav className="ml-auto" navbar style={{ alignItems: 'center' }}>
                            <NavItem>
                                <Button color="success" onClick={() => setCurrentModal('login')} style={{ margin: '10px' }}>Login</Button>
                            </NavItem>
                        </Nav>
                    }
                </Collapse>
            </Navbar>
            <LoginModal currentModal={currentModal} setCurrentModal={setCurrentModal} />
            <SignUpModal currentModal={currentModal} setCurrentModal={setCurrentModal} />
        </>
    )
}

export default NavBar;