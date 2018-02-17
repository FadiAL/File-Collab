import React from 'react';

class Toolbar extends React.Component {
  render() {
    return (
      <div id="toolbar">
        {
          this.props.fileAdd &&
          <img id="add-file" src="icons/plus.png" onClick={() => this.props.fileAdd()}/>
        } {
          this.props.fileDelete &&
          <img id="remove-file" src="icons/delete.png" onClick={() => this.props.fileDelete()}/>
        }
      </div>
    )
  }
}

export default Toolbar;
