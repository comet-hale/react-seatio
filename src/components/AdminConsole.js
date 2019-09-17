import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const MAIN_ROUTE = 'http://localhost:3001/';

const muiStyle = {
  InputLabel: {
    width: 150,
  },
  textFiled: {
    paddingBottom: 10,
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '10px 10px'
  }
};

class AdminConsole extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      row: 5,
      column: 5,
      eventName: '',
    };
  }

  getUUID = () => Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

  createNewSchema = () => {
    const { row, column, eventName } = this.state;
    console.error('row', row);
    console.error('column', column);
    console.error('eventName', eventName);
    axios.post(
      `${MAIN_ROUTE}saveNewSeatType`, {
        data: {
          row,
          column,
          eventName,
          key: this.getUUID(),
        },
      }
    )
    .then(res => console.error('res', res))
    .catch(err => console.log('err', err));
  }

  render() {
    const { eventName, row, column } = this.state;

    return (
      <div className="c-app-admin-console">
        <div style={muiStyle.inputGroup}>
          <Typography style={muiStyle.InputLabel}>Event Name:</Typography>
          <TextField
            id="event-name"
            type="text"
            value={eventName}
            onChange={({ target: { value } }) => this.setState({ eventName: value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div style={muiStyle.inputGroup}>
          <Typography style={muiStyle.InputLabel}>Row Count:</Typography>
          <TextField
            id="row-count"
            type="number"
            value={row}
            onChange={({ target: { value } }) => this.setState({ row: value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div style={muiStyle.inputGroup}>
          <Typography style={muiStyle.InputLabel}>Column Count:</Typography>
          <TextField
            id="column-count"
            type="number"
            value={column}
            onChange={({ target: { value } }) => this.setState({ column: value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Button
          color="primary"
          style={{ marginTop: 30 }}
          onClick={() => this.createNewSchema()}
        >
            Create Schema
        </Button>
      </div>
    );
  }
}

export default AdminConsole;
