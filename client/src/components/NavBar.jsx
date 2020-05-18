import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Links from './Links';

const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
  margin-bottom: 20px;
`;

const NavBar = () => (
  <Nav>
    <Logo />
    <Links />
  </Nav>
);

export default NavBar;
