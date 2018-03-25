import React from 'react';
/*
This component renders the file tree view
It takes in a socket object and uses it to populate the list
In addition, a function can be passed to handle file selections
It automatically handles file creations and deletions
*/
class File extends React.Component {
  constructor(props){
    super(props);
  }
  fileSelected(e) {
    if(!this.props.active)
      this.props.onFileSelected(this.props.name);
  }
  render() {
    return <li className={"pure-menu-item " + (this.props.active ? "pure-menu-selected" : "")}>
    <a className="pure-menu-link" onClick={(e) => this.fileSelected(e)}>{this.props.name}</a>
    </li>
  }
}

class FileList extends React.Component {
  render() {
    const files = this.props.files;
    const list = files.map(file =>
      <File
       name={file} onFileSelected={(e) => this.props.onFileClick(file)}
      />);
    return (
      <div className="pure-menu">
        <a className="pure-menu-heading">Files</a>
        <ul className="pure-menu-list">
          {list}
        </ul>
      </div>
    )
  }
}
FileList.defaultProps = {};
export default FileList;
