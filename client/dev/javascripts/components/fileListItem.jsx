import React from 'react';

class FileListItem extends React.Component{
  render() {
    return (
      <div className="file-list-item">
        {this.props.name}
      </div>
    )
  }
};

export default FileListItem;
