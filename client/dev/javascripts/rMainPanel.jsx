import React from 'react';
import Content from './rContent.jsx';
import Toolbar from './rToolbar.jsx';
import FileList from './rFile.jsx';

class MainPanel extends React.Component {
  render() {
    return (
      <div id="layout">
        <div id="menu">
          <div className="pure-menu" id="file-list">
            <FileList socket={this.props.socket}/>
          </div>
        </div>
        <div className="content">
          <Toolbar fileAdd={this.props.fileAdd}/>
          <br/>
        </div>
      </div>
    )
  }
}

export default MainPanel;
