import React from 'react';
import Content from './rContent';
import Toolbar form './rToolbar';

class MainPanel extends React.Component {
  render() {
    return (
        <div class="content">
        <Toolbar fileAdd={this.props.fileAdd}/>
        <br/>
        <Content text=""/>
      </div>
    )
  }
}
