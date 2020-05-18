import React from 'react';
import styled from 'styled-components';

const Card = styled.div.attrs({
  className: 'card',
})`
  padding: 30px 20px;
  margin: 20px 0;
  background: #ddd;
  text-align: center;
`;

const CardBody = styled.div.attrs({
  className: 'card-body',
})``;

const CardTitle = styled.h3.attrs({
  className: 'card-title',
})`
  margin-bottom: 40px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
`;

const Empty = props => {
  const { showForm } = props;

  return (
    <Card>
      <CardBody>
        <CardTitle>There are currently no expenses.</CardTitle>
        <Button onClick={showForm}>Create an expense</Button>
      </CardBody>
    </Card>
  );
}

export default Empty;
