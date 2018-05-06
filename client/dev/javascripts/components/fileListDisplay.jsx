import React from 'react';
import {connect} from 'react-redux';
import {requestFile} from '../redux/actions.js';

class FileList extends React.Component {
  render() {
    let list = this.props.files.map(file =>
      <li className="pure-menu-item" onClick={() => this.props.onFileSelected(file)}>{file}</li>)
    return (
      <div id="file-display">
        <div className="pure-menu">
          <ul className="pure-menu-list">
            {list}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  files: state.list.files
});
const mapDispatchToProps = dispatch => ({
  onFileSelected: file => dispatch(requestFile(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);
