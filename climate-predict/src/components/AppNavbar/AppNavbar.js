import React, { useState } from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';
  import Logo from '../../assets/new_cloud.png';
  import './AppNavbar.css';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <div className="Bar"  expand="sm">
                    <Container>
                        <NavbarBrand href="/">
                            <div className="LogoContainer">
                                <img src={Logo} className="Logo" alt="" />
                                <div className="title-hold">
                                    <h4>Climatic Prediction System</h4>
                                </div>
                            </div>
                        </NavbarBrand>
                    </Container>
                </div>
        </div>
    )
}

export default AppNavbar;