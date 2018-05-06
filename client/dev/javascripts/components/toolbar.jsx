import React from 'react';
import {connect} from 'react-redux';
import {requestFiles, toggleCreatingFile} from '../redux/actions.js';

class Toolbar extends React.Component {
  render() {
    return (
      <div id="toolbar">
        <div id="toolbarFilename">
          {this.props.fileName}
        </div>
        <div id="buttons">
          <img id="add-file" src="icons/plus.png" onClick={() => this.props.addFile()}/>
          {this.props.fileOpen &&
            <img id="remove-file" src="icons/delete.png" onClick={() => this.props.deleteFile()}/>
          }
          {this.props.fileOpen &&
            <img id="remove-file" src="icons/back.png" onClick={() => this.props.leaveFile()}/>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fileOpen: state.status.fileOpen,
  fileName: state.file.name
});
const mapDispatchToProps = dispatch => ({
  leaveFile: () => dispatch(requestFiles()),
  addFile: () => dispatch(toggleCreatingFile())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
