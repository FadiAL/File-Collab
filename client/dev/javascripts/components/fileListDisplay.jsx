import React from 'react';

class FileList extends React.Component {
  render() {
    let list = this.props.files.map(file =>
      <li className="pure-menu-item">{file.name}</li>)
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
