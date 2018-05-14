import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import PrismCode from 'react-prism';
import 'prismjs';
import history from '../../history';
import Success from '../test-checks/success';
import Failure from '../test-checks/failure';

class NextLevel extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false }
  }
  openModal = () => {
    this.setState({ isModalOpen: true })
  }
  closeModal = () => {
    this.setState({ isModalOpen: false })
    history.push(`/level/${this.props.level.level + 1}/intro`)
  }
  render() {
    const { passing, testOutputs, testBlocks, outro, level } = this.props;
    const { isModalOpen } = this.state;
    const passingNum = testOutputs.filter( output => output.indexOf('Expected') === -1).length;
    return (
      <div>
      <button disabled={!passing} className={passing ? 'button-blue-lg' : 'button-inactive-lg'} onClick={this.openModal}>NEXT LEVEL</button>
      <Modal open={isModalOpen} onClose={this.closeModal} center classNames={{
        overlay: 'backdrop',
        modal: 'outro-modal'
      }} showCloseIcon={false}>
      <div className="outro-left">
        <div className="title-button-float">
          <h4>{`Level ${level.level}: Passing ${passingNum} ${passingNum > 1 ? 'Tests' : 'Test'}`}</h4>
        </div>
        <div className="level-up">
          <button className="button-blue" onClick={this.closeModal} >NEXT LEVEL</button>
        </div>
            <h6>{outro}</h6>
        {testOutputs.length ? testOutputs.map((output, i) => (
          <div key={Math.random() * 40}>
            {output.includes('Expected') ?
            <Failure msg={output} /> :
            <Success msg={output} />}
            <PrismCode component="pre" className="language-javascript">
              {`${testBlocks[i]}`}
            </PrismCode>
          </div>
        )) : <span />
        }
        </div>

      <div className="outro-right">
        <img className="chester-img" src="/img/chester-smize.svg" />
      </div>
      </Modal>
      </div>
    )
  }
}

const mapState = ({level}) => ({
  level
})
const mapDispatch = null // (dispatch) => ({})
export default connect(mapState, mapDispatch)(NextLevel);
