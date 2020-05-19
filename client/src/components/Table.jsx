import React, { Component } from 'react';
import { connect } from 'react-redux';
import { refreshTable, fireMessage } from '../actions';
import ReactTable from 'react-table-6';
import Calendar from 'react-datetime-picker';
import { deleteExpenseById, updateExpenseById } from '../api';
import styled from 'styled-components';
import { formatDate, formatTaxes, formatCurrency } from '../helpers';

const Wrapper = styled.div`
  .react-datetime-picker__calendar--open,
  .react-datetime-picker__clock--open {
    display: none;
  }
`;

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
    const { refreshTable, fireMessage } = this.props;
    const { editableId, description, amount, date } = this.state;
    const payload = { description, amount, date };

    await updateExpenseById(editableId, payload).then(res => {
      const { status } = res;

      const msg = status === 200
        ? `Expense "${description}" was updated successfully!`
        : 'There was an issue updating the expense.';
      fireMessage(msg);
      setTimeout(() => fireMessage(''), 3000);

      this.setState({
        editableId: '',
        description: '',
        amount: '',
        date: '',
      });

      refreshTable();
    });
  };

  handleDelete = async id => {
    const { refreshTable, fireMessage } = this.props;
    const confirmed = window.confirm('Do you want to delete this expense permanently?');

    if (confirmed) {
      await deleteExpenseById(id).then(res => {
        const { status } = res;

        const msg = status === 200
          ? 'Expense was deleted!'
          : 'There was an issue deleting the expense.';
        fireMessage(msg);
        setTimeout(() => fireMessage(''), 3000);

        refreshTable();
      });
    }
  };

  render() {
    const { expenses, isLoading } = this.props;
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
        Header: '15% Tax ($)',
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
        Header: 'Expensed At',
        Cell: props => {
          const { _id, date: originalDate } = props.original;
          if (editableId === _id) {
            return (
              <Calendar
                value={new Date(date)}
                onChange={val => this.changeInput('date', val)}
                calendarIcon={null}
                clearIcon={null}
              />
            );
          }
          return formatDate(originalDate);
        },
      },
      {
        id: 'updated-at',
        Header: 'Updated At',
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
              <DeleteButton onClick={() => this.handleDelete(_id)}>Delete</DeleteButton>
            </>
          );
        },
      }
    ];

    return (
      <Wrapper>
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
      </Wrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    refreshTable: () => dispatch(refreshTable()),
    fireMessage: message => dispatch(fireMessage(message)),
  };
};

const mapStateToProps = ({ isLoading, expenses }) => {
  return { isLoading, expenses };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
