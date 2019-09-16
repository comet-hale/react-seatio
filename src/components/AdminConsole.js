import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const MAIN_ROUTE = process.env.MAIN_ROUTE;

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

  saveNewSeatType = () => {
    const { row, column, eventName } = this.state;
    axios.post(
        `${MAIN_ROUTE}saveNewSeatType`,
        {
            row,
            column,
            eventName,
            eventKey: this.getUUID(),
        },
    )
    .then(res => console.error('res', res))
    .catch(err => console.log('err', err));
  }

  render() {
    const { eventName, row, column } = this.state;

    return (
      <div className="c-app-container">
        <TextField
          id="event-name"
          label="Event Name"
          type="text"
          value={eventName}
          onChange={({ target: { value } }) => this.setState({ eventName: value })}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">Event Name: </InputAdornment>,
          }}
        />
        <TextField
          id="row-count"
          label="Row Count"
          type="number"
          value={row}
          onChange={({ target: { value } }) => this.setState({ row: value })}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">Row: </InputAdornment>,
          }}
        />
        <TextField
          id="column-count"
          label="Column Count"
          type="number"
          value={column}
          onChange={({ target: { value } }) => this.setState({ column: value })}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">Column: </InputAdornment>,
          }}
        />
        <Button
            onClick={() => this.createNewSchema()}
        >
            Create Schema
        </Button>
      </div>
    );
  }
}

export default AdminConsole;
