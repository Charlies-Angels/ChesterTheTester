import React, {Component} from 'react';

class ClearRun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOne: '',
      actual: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectOne !== this.state.nextProps) {
      this.setState({
        selectOne: nextProps.selectOne,
        actual: nextProps.actual
      });
    }
  }
  render() {
    const { clearForm, runTest } = this.props;
    const {  selectOne, actual } = this.state;
    return (
      <div>
      <button disabled={!selectOne || !actual} className={(selectOne && actual) ? 'button-red' : 'button-inactive'} onClick={clearForm}>Clear</button>
      <button disabled={!selectOne || !actual} className={(selectOne && actual) ? 'button-blue-active' : 'button-inactive'} onClick={runTest}>Run Test!</button>
      </div>
    );

  }
}

export default ClearRun;
