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

const Alert = styled.div.attrs({
  className: 'alert alert-info',
})`
  text-align: center;
`;

const Heading = styled.h3.attrs({
  className: 'alert-heading',
})`
  margin-bottom: 20px;
`;

const Dashboard = () => (
  <Wrapper>
    <Title>Dashboard</Title>
    <Alert>
      <Heading>Coming Soon!</Heading>
      <p>Graphs by expense category is on its way.</p>
    </Alert>
  </Wrapper>
);

export default Dashboard;
