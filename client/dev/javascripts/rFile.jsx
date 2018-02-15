import React from 'react';

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
    this.state = {activeFile: ''}
    //Preset active is to avoid constantly resetting state
  }
  componentWillReceiveProps(nextProps) {
    this.handleFileChange(nextProps.activeFile);
  }
  handleFileChange(e) {
    this.setState({activeFile: e});
    this.props.socket.emit('fileReq', e);
  }
  render() {
    const files = this.props.files;
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
