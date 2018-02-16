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
  constructor(props){
    super(props);
    this.setupSocket(this.props.socket);
    this.state = {activeFile: '', files: []};
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.activeFile != '' && this.props.activeFile != nextProps.activeFile){
      this.handleFileChange(nextProps.activeFile);
    }
  }
  handleFileChange(e) {
    this.setState({activeFile: e});
    this.props.socket.emit('fileReq', e);
    this.props.onFileChange(e);
  }
  setupSocket(socket) {
    socket.emit('files');
    socket.on('files', files => {
      this.setState({files: files});
    });
    socket.on('fileCreate', fileName => {
      var newFiles = this.state.files;
      newFiles.push(fileName);
      this.setState({files: newFiles});
    });
    socket.on('delete', fileDeleted => {
      var newFiles = this.state.files.filter(fileName => fileName != fileDeleted);
      this.setState({files: newFiles});
    });
  }
  render() {
    const files = this.state.files;
    const list = files.map(
      file => <File
       name={file} onFileSelected={(e) => this.handleFileChange(e)}
       active={file == this.state.activeFile}
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
