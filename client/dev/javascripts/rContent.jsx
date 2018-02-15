import React from 'react';

class Content extends React.Component {
  render() {
    return (
      <p id="file-display" contenteditable=true>
        {this.props.text}
      </p>
    )
  }
}

export default Content;
