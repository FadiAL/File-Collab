import React from 'react';
import Content from './rContent.jsx';
import Toolbar from './rToolbar.jsx';

class MainPanel extends React.Component {
  render() {
    return (
      <div className="content">
        <Toolbar fileAdd={this.props.fileAdd}/>
        <br/>
        <Content text=""/>
      </div>
    )
  }
}

export default MainPanel;
