import React from 'react';
import File from './file.jsx';

class Recents extends React.Component {
  render() {
    let list = this.props.files.map(file =>
      <File name={file}/>)
    return (
      <div className="pure-menu">
        <a className="pure-menu-heading">
          Files
        </a>
        <ul className="pure-menu-list">
          {list}
        </ul>
      </div>
    )
  }
}
