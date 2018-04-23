import React from 'react';

class File extends React.Component {
  render() {
    return (
      <li className={"pure-menu-item" + (this.props.active ? "pure-menu-selected" : "")}>
        <a className="pure-menu-link" onClick={(e) => this.props.onFileSelected(e)}>
          {this.props.name}
        </a>
      </li>
    )
  }
}

export default File;
