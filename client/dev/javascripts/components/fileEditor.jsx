import React from 'react';

class FileEditor extends React.Component {
  render() {
    return (
      <textarea id="file-display" value={this.props.text} onChange={e => this.props.textChange(e)}>
      </textarea>
    )
  }
}
