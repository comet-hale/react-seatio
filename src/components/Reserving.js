import React from 'react';
import axios from 'axios';

import { List, fromJS } from 'immutable';
import range from 'lodash/range';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import './Reserving.css';

const MAIN_ROUTE = process.env.MAIN_ROUTE;
const THREE_SECS = 3000; // NOTE: in milliseconds
const ROWS_COUNT = 10;
const COLUMNS_COUNT = 6;

class Resering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoading: false,
      seatData: List(),
      displayedSeatData: List(),
    };
  }

  componentDidMount() {
    this.alertTimer = setInterval(this.loadReservedSeatInfo, THREE_SECS);
    this.setState({
      isDataLoading: true,
    }, this.loadReservedSeatInfo());
  }

  componentWillUnmount() {
    clearInterval(this.alertTimer);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.isDataLoading !== this.state.isDataLoading ||
      !nextState.seatData.equals(this.state.seatData) ||
      !nextState.displayedSeatData.equals(this.state.displayedSeatData)
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { seatData } = this.state;
    if (!seatData.equals(prevState.seatData)) {
      console.log('seatData-didupdate', seatData);
      this.setState({
        displayedSeatData: seatData,
      })
    }
  }

  loadReservedSeatInfo = () => {
    axios.get(`${MAIN_ROUTE}getReservedSeats/:${localStorage.getItem('event_key') || null}`)
      .then(({ data }) => {
        const rawData = data !== '' ? fromJS(data.split(',')) : List();
        this.setState(
          this.state.isDataLoading ? {
            seatData: rawData,
            isDataLoading: false,
            displayedSeatData: rawData,
          } : {
            seatData: rawData,
            isDataLoading: false,
          })
      })
      .catch(err => console.log('err', err));
  }

  saveUpdatedSeatData = () => {
    const { displayedSeatData } = this.state;
    axios.post(`${MAIN_ROUTE}saveReservedSeats`, {
      data: displayedSeatData.join(','),
    })
      .then(res => console.error('post result', res))
      .catch(err => console.log('err', err));
  }

  clickSeatButton(columnKey, rowKey) {
    const { displayedSeatData } = this.state;

    const seatId = `${columnKey}-${rowKey}`;
    const updatedSeatData = displayedSeatData.includes(seatId)
      ? displayedSeatData.delete(displayedSeatData.indexOf(seatId))
      : displayedSeatData.push(seatId);
    
    this.setState({
      displayedSeatData: updatedSeatData,
    });
  }

  getTooltipInfo(columnKey, rowKey) {
    const { seatData } = this.state;

    const seatId = `${columnKey}-${rowKey}`;
    const isReserved = seatData.includes(seatId);
    const costForSeat = (rowKey + 1) * 10;

    const tooltipText = isReserved
      ? `Reserved ${costForSeat} $`
      : `Not Reserved ${costForSeat} $`;

    const tooltipStyle = {
      backgroundColor: 'rgba(0,0,0,0.8)',
      fontSize: 20,
      padding: 10,
      color: isReserved ? 'grey' : 'white',
    };

    return [tooltipText, tooltipStyle];
  }

  renderSeatDiv(columnKey, rowKey) {
    const { displayedSeatData } = this.state;

    const [
      tooltipText,
      tooltipStyle,
    ] = this.getTooltipInfo(columnKey, rowKey);

    return (
      <Tooltip
        title={tooltipText}
        placement="top"
        style={tooltipStyle}
      >
        <Button
          key={`seat-row-${columnKey}-${rowKey}`}
          style={{
            margin: 10,
            background: displayedSeatData.includes(`${columnKey}-${rowKey}`) ? 'red' : 'blue'
          }}
          onClick={() => this.clickSeatButton(columnKey, rowKey)}
        >
          {columnKey}-{rowKey}
        </Button>
      </Tooltip>
    );
  }

  renderSeatTable() {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.saveUpdatedSeatData()}
        >
          Reserve
        </Button>
        <Grid
          className="c-app-main-table"
          container
          justify="space-between"
          alignItems="flex-start"
          wrap="nowrap"
        >
          {range(0, COLUMNS_COUNT).map(columnKey =>
            <Grid item key={`seat-column-${columnKey}`}>
              {range(0, ROWS_COUNT).map(rowKey =>
                this.renderSeatDiv(columnKey, rowKey)
                )}
            </Grid>
            )}
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    const { isDataLoading, displayedSeatData } = this.state;
    console.log('displayedSeatData', displayedSeatData);
    return (
      <div className="c-app-container">
        {
          !isDataLoading
          ? this.renderSeatTable()
          : <p>Loading...</p>}
      </div>
    );
  }
}

export default Resering;
