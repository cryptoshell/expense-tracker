import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleForm, refreshTable } from '../actions';
import { Empty, Table, Form, Details } from '../components';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import 'react-table-6/react-table.css';
// TODO: Add PropTypes

const Wrapper = styled.div`
  margin: 20px;
`;

const Title = styled.h1.attrs({
  className: 'h1',
})`
  margin: 10px 0;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px 0 20px;
`;

const AddButton = styled.button.attrs({
  className: `btn btn-primary`,
})``;

const Alert = styled.div.attrs({
  className: 'alert alert-info',
})`
  position: fixed;
  bottom: 40px;
  left: 0;
  right: 0;
  width: 500px;
  margin: auto;
  text-align: center;
`;

class Expenses extends Component {
  componentDidMount = () => {
    const { refreshTable } = this.props;
    refreshTable();
  };

  render() {
    const {
      expenses,
      showForm,
      toggleForm,
      message,
    } = this.props;

    return (
      <Wrapper>
        <Title>Expense Tracker</Title>
        {!expenses.length && <Empty />}
        {expenses.length > 0 && (
          <>
            <FlexBox>
              <Details />
              <AddButton onClick={() => toggleForm(!showForm)}>+ expense</AddButton>
            </FlexBox>
            <Table />
          </>
        )}
        {showForm && <Form />}
        {message && <Alert>{message}</Alert>}
      </Wrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleForm: bool => dispatch(toggleForm(bool)),
    refreshTable: () => dispatch(refreshTable()),
  };
};

const mapStateToProps = ({
  showForm,
  expenses,
  message,
}) => {
  return {
    showForm,
    expenses,
    message,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Expenses);
