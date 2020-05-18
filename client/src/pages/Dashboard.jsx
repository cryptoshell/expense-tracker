import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20px;
`;

const Title = styled.h1.attrs({
  className: 'h1',
})`
  margin: 20px 0;
`;

const Dashboard = () => (
  <Wrapper>
    <Title>Dashboard</Title>
  </Wrapper>
);

export default Dashboard;
