import React, { Component } from 'react';
import { connect } from 'react-redux';

class OutroModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  close = (e) => {
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render() {
    console.log('heeeeerrrreee')
    if (!this.props.isOpen) return <span />
    return (
      <div>
        <div className="modal"> <p>HELLO THERE</p><h1>HEYEUUYYYYE</h1></div>
        {/* <div className="backdrop" onClick={e => this.close(e)} /> */}
      </div>
    )
  }
}

const mapState = null // ({})
const mapDispatch = null // (dispatch) => ({})
export default connect(mapState, mapDispatch)(OutroModal);
