import React from 'react';
import {connect} from 'react-redux';
import {updateDialogFilename, createRequest} from '../redux/actions.js';

class Dialog extends React.Component {
  render() {
    return (
      <form className="pure-form pure-form-stacked" onSubmit={() => this.props.createFile(this.props.fileName)}>
        <h2>Create File</h2>
        {this.props.error &&
          <h5>Error, file name {this.props.error} taken</h5>
        }
        <input type="text" placeHolder="File Name" value={this.props.fileName} onChange={e => this.props.nameChange(e)}/>
        <button type="submit" className="pure-button pure-button-primary">Create</button>
      </form>
    )
  }
}
const mapStateToProps = state => ({
  fileName: state.creatingDialog.curName,
  error: state.creatingDialog.error
});
const mapDispatchToProps = dispatch => ({
  nameChange: e => dispatch(updateDialogFilename(e.target.value)),
  createFile: fileName => dispatch(createRequest(fileName))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog);
