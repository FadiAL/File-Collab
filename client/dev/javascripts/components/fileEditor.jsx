import React from 'react';
import {connect} from 'react-redux';

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

export default connect(
  mapStateToProps,
  null
)(FileEditor);
