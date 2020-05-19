import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Collapse = styled.div.attrs({
  className: 'collpase navbar-collapse',
})`
  margin-top: 10px;
`;

const List = styled.div.attrs({
  className: 'navbar-nav mr-auto',
})``;

const Item = styled.div.attrs({
  className: 'collpase navbar-collapse',
})``;

const Label = styled.label`
  text-transform: capitalize;
`;

const renderLinks = list => {
  return list.map(label => (
    <Item>
      <Link to={`/${label}`} className="nav-link">
        <Label>{label}</Label>
      </Link>
    </Item>
  ));
};

const Links = () => {
  return (
    <>
      <Link to="/" className="navbar-brand">
        Expense Tracker
      </Link>
      <Collapse>
        <List>
          {renderLinks(['dashboard'])}
        </List>
      </Collapse>
    </>
  );
};

export default Links;
