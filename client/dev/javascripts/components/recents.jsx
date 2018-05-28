import React from 'react';
import {connect} from 'react-redux';
import RecentsItem from './recentsItem.jsx';
import {requestFile} from '../redux/actions.js';

class Recents extends React.Component {
  render() {
    let list = this.props.files.map(file =>
      <RecentsItem name={file} active={file === this.props.activeFile} onClick={() => this.props.onFileSelected(file)}/>)
    return (
      <div className="pure-menu">
        <a className="pure-menu-heading">
          Recents
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
  files: state.list.recents
});
const mapDispatchToProps = dispatch => ({
  onFileSelected: file => dispatch(requestFile(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recents);
