import React, { Component } from 'react';
import { connect } from 'react-redux';

class NextLevel extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false }
  }
  openModal() {
    this.setState({ isModalOpen: true })
  }
  closeModal() {
    this.setState({ isModalOpen: false })
  }
  render() {
    const { passing } = this.props;
    return (
      <div>
      <button disabled={!passing} className={passing ? 'button-blue-lg' : 'button-inactive-lg'} >NEXT LEVEL</button>
      </div>
    )
  }
}

const mapState = null // ({})
const mapDispatch = null // (dispatch) => ({})
export default connect(mapState, mapDispatch)(NextLevel);
