import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleForm, refreshTable, fireMessage } from '../actions';
import { createExpense } from '../api';
import styled from 'styled-components';
import Calendar from 'react-datetime-picker';
import { formatTaxes } from '../helpers';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
`;

const Card = styled.div.attrs({
  className: 'card',
})`
  padding: 20px;
  margin: 20vh 20px;
`;

const Title = styled.h1.attrs({
  className: 'h2',
})``;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px;
`;

const CreateButton = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.button.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

class Form extends Component {
  state = {
    description: '',
    amount: '',
    date: new Date(),
  };

  changeDate = date => this.setState({ date });

  changeInput = (field, event) => {
    const { value } = event.target;
    this.setState({ [field]: value });
  };

  createExpense = async () => {
    const { toggleForm, refreshTable, fireMessage } = this.props;
    const { description } = this.state;
    const payload = { ...this.state };

    await createExpense(payload).then(res => {
      const { status } = res;

      const msg =
        status === 201
          ? `Expense "${description}" was created successfully!`
          : 'There was an issue creating the expense.';
      fireMessage(msg);
      setTimeout(() => fireMessage(''), 3000);

      toggleForm(false);
      refreshTable();
    });
  }

  render() {
    const { description, amount, date } = this.state;
    const { toggleForm } = this.props;

    return (
      <Wrapper>
        <Card>
          <Title>Create Expense</Title>
          <Label>Description*: </Label>
          <InputText
            type="text"
            value={description}
            onChange={e => this.changeInput('description', e)}
          />
          <Label>Amount*: </Label>
          <InputText
            type="number"
            step="0.1"
            lang="en-US"
            min="0"
            pattern="[0-9]+([,\.][0-9]+)?"
            value={amount}
            onChange={e => this.changeInput('amount', e)}
          />
          {amount > 0 && (
            <div>
              <Label>Taxes (15%): {formatTaxes(amount, 15)} $</Label>
            </div>
          )}
          <Label>Expense date*: </Label>
          <Calendar value={date} onChange={this.changeDate} />
          <div>
            <CreateButton onClick={this.createExpense}>Save</CreateButton>
            <CancelButton onClick={() => toggleForm(false)}>Cancel</CancelButton>
          </div>
        </Card>
      </Wrapper>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
    toggleForm: bool => dispatch(toggleForm(bool)),
    refreshTable: () => dispatch(refreshTable()),
    fireMessage: message => dispatch(fireMessage(message)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Form);
