import React from 'react';
import {connect} from 'react-redux';
import FileEditor from './fileEditor.jsx';
import FileList from './fileListDisplay.jsx';

class MainPanel extends React.Component {
  render() {
    const isOpen = this.props.fileOpen;
    return (
      <div>
        {isOpen ? (
          <FileEditor/>
        ) : (
          <FileList/>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fileOpen: state.fileOpen
});

export default connect(
  mapStateToProps,
  null
)(MainPanel);
