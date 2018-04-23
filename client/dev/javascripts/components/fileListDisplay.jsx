import React from 'react';
import {connect} from 'react-redux';

class FileList extends React.Component {
  render() {
    let list = this.props.files.map(file =>
      <li className="pure-menu-item">{file}</li>)
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
  files: state.files
});

export default connect(
  mapStateToProps,
  null
)(FileList);
