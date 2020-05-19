import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { formatCurrency } from '../helpers';

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
      <div>Subtotal: {formatCurrency(getSubtotal())} $</div>
      <div>Total (incl. tax): {formatCurrency(getTotal())} $</div>
    </Wrapper>
  );
}

const mapStateToProps = ({ expenses }) => {
  return { expenses };
};

export default connect(mapStateToProps)(Details);
