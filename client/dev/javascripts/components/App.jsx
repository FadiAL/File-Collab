import React from 'react';
import Toolbar from './toolbar.jsx';
import Recents from './recents.jsx';
import MainPanel from './mainPanel.jsx';
import Dialog from './dialog.jsx';
import {connect} from 'react-redux';

import {toggleCreatingFile} from '../redux/actions.js';

class App extends React.Component {
  render() {
    const creatingFile = this.props.creatingFile;
    const onCancel = () => {
      if(creatingFile)
        this.props.onCancelCreate();
      else
        return;
    };
    return (
      <div id="main">
        <div id="layout" className={creatingFile ? "blur" : ""} onClick={() => onCancel()}>
          <div id="menu">
            <div className="pure-menu" id="file-list">
              <Recents/>
            </div>
          </div>
          <div className="content">
            <br/>
            <MainPanel/>
            <Toolbar/>
          </div>
        </div>
        {creatingFile &&
          <div id="create-dialog">
            <Dialog/>
          </div>
        }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  creatingFile: state.status.creatingFile
});
const mapDispatchToProps = dispatch => ({
  onCancelCreate: () => dispatch(toggleCreatingFile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
