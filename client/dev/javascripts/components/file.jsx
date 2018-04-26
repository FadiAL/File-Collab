import React from 'react';

class File extends React.Component {
  render() {
    return (
      <li className={"pure-menu-item" + (this.props.active ? "pure-menu-selected" : "")} onClick={this.props.onClick}>
        <a className="pure-menu-link">
          {this.props.name}
        </a>
      </li>
    )
  }
}

export default File;
