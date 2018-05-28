import React from 'react';
import {connect} from 'react-redux';
import {updateFile} from '../redux/actions.js';

class FileEditor extends React.Component {
  render() {
    return (
      <textarea id="file-display" value={this.props.text} onChange={e => this.props.textChange(e)}>
      </textarea>
    )
  }
}

const mapStateToProps = state => ({
  text: state.file.contents
});
const mapDispatchToProps = dispatch => ({
  textChange: e => dispatch(updateFile(e.target.value))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileEditor);
