import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import { deleteExpenseById, updateExpenseById } from '../api';
import 'react-table-6/react-table.css';
import styled from 'styled-components';
import { Calendar } from '.';
import { formatDate, formatTaxes, formatCurrency } from '../helpers';


const Input = styled.div.attrs({
  className: 'form-control',
})`
  width: 95%;
`;

const SaveButton = styled.button.attrs({
  className: 'btn btn-success',
})`
  margin: 0 5px;
`;

const EditButton = styled.button.attrs({
  className: 'btn btn-warning',
})`
  margin: 0 5px;
`;

const DeleteButton = styled.button.attrs({
  className: 'btn btn-danger',
})`
  margin: 0 5px;
`;

const CancelButton = styled.button.attrs({
  className: 'btn btn-danger',
})`
  margin: 0 5px;
`;

const DeleteExpense = props => {
  const { id, refreshTable } = props;
  const handleDelete = event => {
    event.preventDefault();
    if (
      window.confirm(
        `Do you want to delete this expense permanently?`,
      )
    ) {
      deleteExpenseById(id);
      refreshTable();
    }
  }
  return <DeleteButton onClick={handleDelete}>Delete</DeleteButton>;
};

class Table extends Component {
  state = {
    editableId: '',
    description: '',
    amount: '',
    date: '',
    sortOptions: [{ id: 'amount', desc: true }],
  };

  makeEditable = rowData => {
    const { _id, description, amount, date } = rowData;
    this.setState({
      editableId: _id,
      description,
      amount,
      date,
    });
  };

  changeInput = (field, value) => this.setState({ [field]: value });
  cancelEditableRow = () => this.setState({ editableId: '' });

  updateExpense = async () => {
    const { refreshTable } = this.props;
    const { editableId, description, amount, date } = this.state;
    const payload = { description, amount, date };

    await updateExpenseById(editableId, payload).then(res => {
      window.alert(`Expense was updated successfully!`);
      this.setState({
        editableId: '',
        description: '',
        amount: '',
        date: '',
      });
      refreshTable();
    });
  };

  render() {
    const { expenses, isLoading, refreshTable } = this.props;
    const { sortOptions, editableId, description, amount, date } = this.state;

    const columns = [
      {
        id: 'description',
        Header: 'Description',
        Cell: props => {
          const { _id, description: originalDescription } = props.original;
          if (editableId === _id) {
            return (
              <Input
                contentEditable
                suppressContentEditableWarning
                onBlur={e => this.changeInput('description', e.target.innerHTML)}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            );
          }
          return originalDescription;
        },
      },
      {
        id: 'amount',
        Header: 'Amount ($)',
        Cell: props => {
          const { _id, amount: originalAmount } = props.original;
          if (editableId === _id) {
            return (
              <Input
                contentEditable
                suppressContentEditableWarning
                onBlur={e => this.changeInput('amount', e.target.innerHTML)}
                dangerouslySetInnerHTML={{ __html: amount }}
              />
            );
          }
          return formatCurrency(originalAmount);
        },
      },
      {
        id: 'taxes',
        Header: 'Taxes (15%)',
        Cell: props => {
          const { _id, amount: originalAmount } = props.original;
          if (editableId === _id) {
            return formatTaxes(amount, 15);
          }
          return formatTaxes(originalAmount, 15);
        },
      },
      {
        id: 'expense-date',
        Header: 'Expensed at',
        Cell: props => {
          const { _id, date: originalDate } = props.original;
          if (editableId === _id) {
            return (
              <Calendar
                value={date}
                onChange={val => this.changeInput('date', val)}
              />
            );
          }
          return formatDate(originalDate);
        },
      },
      {
        id: 'updated-at',
        Header: 'Updated at',
        Cell: props => (formatDate(props.original.updatedAt)),
      },
      {
        id: 'btns',
        Header: '',
        Cell: props => {
          const { original, original: { _id } } = props;
          if (editableId === _id) {
            return (
              <>
                <SaveButton onClick={this.updateExpense}>Save</SaveButton>
                <CancelButton onClick={this.cancelEditableRow}>Cancel</CancelButton>
              </>
            );
          }
          return (
            <>
              <EditButton onClick={() => this.makeEditable(original)}>Edit</EditButton>
              <DeleteExpense id={_id} refreshTable={refreshTable} />
            </>
          );
        },
      }
    ];

    return (
      <ReactTable
        data={expenses}
        columns={columns}
        loading={isLoading}
        defaultPageSize={10}
        showPageSizeOptions={true}
        minRows={0}
        sorted={sortOptions}
        onSortedChange={val => {
          this.setState({ sortOptions: val });
        }}
      />
    );
  }
}

export default Table;
