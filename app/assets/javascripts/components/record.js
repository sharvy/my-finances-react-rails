Record = React.createClass({
  getInitialState: function() {
    return {
      edit: false
    }
  },

  handleToggle: function(e) {
    e.preventDefault();
    this.setState({
      edit: !this.state.edit
    })
  },

  handleEdit: function(e) {
    var data;
    e.preventDefault();

    data = {
      title: ReactDOM.findDOMNode(this.refs.title).value,
      date: ReactDOM.findDOMNode(this.refs.date).value,
      amount: ReactDOM.findDOMNode(this.refs.amount).value
    };

    return $.ajax({
      method: 'PUT',
      url: '/records/' + this.props.record.id,
      dataType: 'JSON',
      data: {
        record: data
      },
      success: (function(_this) {
        return function(data) {
          _this.setState({
            edit: false
          });
          return _this.props.handleEditRecord(_this.props.record, data);
        };
      })(this)
    });
  },

  handleDelete: function(e) {
    e.preventDefault();
    return $.ajax({
      method: 'DELETE',
      url: "/records/" + this.props.record.id,
      dataType: 'JSON',
      success: (function(_this) {
        return function() {
          return _this.props.handleDeleteRecord(_this.props.record)
        };
      })(this)
    });
  },

  recordRow: function() {
    return React.DOM.tr(null,
      React.DOM.td(null, this.props.record.date),
      React.DOM.td(null, this.props.record.title),
      React.DOM.td(null, amountFormat(this.props.record.amount)),
      React.DOM.td(null,
        React.DOM.a({
          className: 'btn btn-default',
          onClick: this.handleToggle
        }, 'Edit'),
        React.DOM.a({
          className: 'btn btn-danger',
          onClick: this.handleDelete
        }, 'Delete')
      )
    )
  },

  recordForm: function() {
    return React.DOM.tr(null,
      React.DOM.td(null,
        React.DOM.input({
          className: 'form-control',
          type: 'text',
          defaultValue: this.props.record.date,
          ref: 'date'
        })
      ),
      React.DOM.td(null,
        React.DOM.input({
          className: 'form-control',
          type: 'text',
          defaultValue: this.props.record.title,
          ref: 'title'
        })
      ),
      React.DOM.td(null,
        React.DOM.input({
          className: 'form-control',
          type: 'number',
          defaultValue: this.props.record.amount,
          ref: 'amount'
        })
      ),
      React.DOM.td(null,
        React.DOM.a({
          className: 'btn btn-info',
          onClick: this.handleEdit
        }, 'Update'),
        React.DOM.a({
          className: 'btn btn-warning',
          onClick: this.handleToggle
        }, 'Cancel')
      )
    )
  },

  render: function() {
    if(this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
});