import React from 'react';
import styled from 'styled-components'

import logo from '../assets/logo.png';

const Wrapper = styled.a.attrs({
  className: 'navbar-brand',
})``

const Logo = () => (
  <Wrapper href="https://github.com/cryptoshell/expense-tracker">
    <img src={logo} width="50" height="50" alt="expense-tracker-app" />
  </Wrapper>
);

export default Logo;
