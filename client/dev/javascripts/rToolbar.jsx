import React from 'react';

class Toolbar extends React.Component {
  render() {
    return (
      <div id="toolbar">
        <img id="add-file" src="icons/plus.png" />
        <img id="remove-file" src="icons/delete.png" />
      </div>
    )
  }
}

export default Toolbar;
