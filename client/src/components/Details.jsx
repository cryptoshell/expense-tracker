import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: grey;
`;

const Details = props => {
  const { expenses } = props;
 
  const getSubtotal = () => {
    const subtotal = expenses.reduce((acc, el) => acc + el.amount, 0);
    return subtotal;
  };

  const getTotal = () => {
    const taxes = expenses.reduce((acc, el) => acc + (el.amount * 0.15), 0);
    const total = getSubtotal() + taxes;
    return total;
  };

  return (
    <Wrapper>
      <div>Subtotal: {getSubtotal()} $</div>
      <div>Total (incl. tax): {getTotal()} $</div>
    </Wrapper>
  );
}

export default Details;
