import React, { Component } from 'react';
import { getAllExpenses } from '../api';
import { Empty, Table, Form, Details } from '../components';
import styled from 'styled-components';
// TODO: Add PropTypes

const Wrapper = styled.div`
  margin: 20px;
`;

const Title = styled.h1.attrs({
  className: 'h1',
})`
  margin: 20px 0;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const AddButton = styled.button.attrs({
  className: `btn btn-primary`,
})``;

class Expenses extends Component {
  state = {
    expenses: [],
    isLoading: false,
    showForm: false,
  };
  
  refreshTable = async () => {
    await getAllExpenses().then(expenses => {
      const { data: { data: list }} = expenses;
      this.setState({
        expenses: list,
        isLoading: false,
      });
    });
  }

  showForm = () => this.setState({ showForm: true });
  hideForm = () => this.setState({ showForm: false });

  componentDidMount = () => {
    this.setState({ isLoading: true });
    this.refreshTable();
  }

  render() {
    const { expenses, isLoading, showForm } = this.state;

    return (
      <Wrapper>
        <Title>Expense Tracker</Title>
        {!expenses.length && <Empty showForm={this.showForm} />}
        {expenses.length > 0 && (
          <>
           <FlexBox>
              <Details expenses={expenses} />
              <AddButton onClick={this.showForm}>+ new expense</AddButton>
            </FlexBox>
            <Table
              expenses={expenses}
              isLoading={isLoading}
              refreshTable={this.refreshTable}
            />
          </>
        )}
        {showForm && (
          <Form
            hideForm={this.hideForm}
            refreshTable={this.refreshTable}
          />
        )}
      </Wrapper>
    );
  };
};

export default Expenses;
