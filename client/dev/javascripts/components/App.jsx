import React from 'react';
import Toolbar from './toolbar.jsx';
import Recents from './recents.jsx';
import FileList from './fileListDisplay.jsx';

class App extends React.Component {
  render() {
    return (
      <div id="layout">
        <div id="menu">
          <div className="pure-menu" id="file-list">
            <Recents/>
          </div>
        </div>
        <div className="content">
          <br/>
          <FileList/>
          <Toolbar/>
        </div>
      </div>
    )
  }
}

export default App;
