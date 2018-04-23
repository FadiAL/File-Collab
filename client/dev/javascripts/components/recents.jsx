import React from 'react';
import {connect} from 'react-redux';
import File from './file.jsx';

class Recents extends React.Component {
  render() {
    let list = this.props.files.map(file =>
      <File name={file} active={file === this.props.activeFile}/>)
    return (
      <div className="pure-menu">
        <a className="pure-menu-heading">
          Recent Files
        </a>
        <ul className="pure-menu-list">
          {list}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeFile: state.file.name,
  files: state.recents
});

export default connect(
  mapStateToProps,
  null
)(Recents);
