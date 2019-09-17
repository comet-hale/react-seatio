import React from 'react';
import axios from 'axios';

import { List, fromJS } from 'immutable';

import Button from '@material-ui/core/Button';

const MAIN_ROUTE = 'http://localhost:3001/';
const THREE_SECS = 3000; // NOTE: in milliseconds

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoading: false,
      allSeatsInfo: List(),
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
      !nextState.allSeatsInfo.equals(this.state.allSeatsInfo)
    )
  }

  loadReservedSeatInfo = () => {
    axios.get(`${MAIN_ROUTE}getAllSeatInfo`)
      .then(({ data }) => {
        console.error('data', data);
        this.setState({
            allSeatsInfo: fromJS(data),
            isDataLoading: false,
        })
      })
      .catch(err => console.log('err', err));
  }

  onChangeEventKey(key) {
    localStorage.setItem('event_key', key);
    this.props.history.push('/reserving');
  }

  renderAllSeatInfo() {
    const { allSeatsInfo } = this.state;
    console.error('allSeatsInfo', allSeatsInfo);

    if (allSeatsInfo.size < 1) return <p>No data</p>;

    return (
        <div>
            {allSeatsInfo.map((key, seatInfo) => (
                <Button
                    key={`seat-${key}`}
                    onClick={() => this.onChangeEventKey(seatInfo.get('key'))}
                >
                    {seatInfo.get('event_name')}
                </Button>
            ))}
        </div>
    );
  }

  render() {
    const { isDataLoading, allSeatsInfo } = this.state;
    console.log('allSeatsInfo', allSeatsInfo);
    return (
      <div className="c-app-container">
        {
          !isDataLoading
          ? this.renderAllSeatInfo()
          : <p>...</p>}
      </div>
    );
  }
}

export default Home;
