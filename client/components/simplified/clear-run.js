import React, {Component} from 'react';

class ClearRun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOne: '' };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectOne !== this.state.nextProps)
    this.setState({
      selectOne: nextProps.selectOne,
    });
  }
  render() {
    const { selectOne, clearForm, runTest } = this.props;
    return (
      <div>
      <button disabled={!selectOne} className={selectOne ? 'button-red' : 'button-inactive'} onClick={clearForm}>Clear</button>
      <button disabled={!selectOne} className={selectOne ? 'button-blue-active' : 'button-inactive'} onClick={runTest}>Run Test!</button>
      </div>
    );

  }
}

export default ClearRun;
