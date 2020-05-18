import React, { Component } from 'react';
import { createExpense } from '../api';
import styled from 'styled-components';
import { Calendar } from '../components';
import { formatTaxes } from '../helpers';

const Title = styled.h1.attrs({
  className: 'h2',
})``;

const Wrapper = styled.div.attrs({
  className: 'card',
})`
  margin: 20px 0;
  padding: 20px;
`;

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
    const { hideForm, refreshTable } = this.props;
    const payload = { ...this.state };

    await createExpense(payload).then(res => {
      window.alert(`Expense created successfully`);
      hideForm();
      refreshTable();
    });
  }

  render() {
    const { description, amount, date } = this.state;
    const { hideForm } = this.props;

    return (
      <Wrapper>
        <div className="card-body form-group">
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
          <Calendar date={date} changeDate={this.changeDate} />
          <div>
            <CreateButton onClick={this.createExpense}>Add Expense</CreateButton>
            <CancelButton onClick={hideForm}>Cancel</CancelButton>
          </div>
        </div>
      </Wrapper>
    );
  }
};

export default Form;
