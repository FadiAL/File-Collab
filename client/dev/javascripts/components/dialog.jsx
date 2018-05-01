import React from 'react';
import {connect} from 'react-redux';

class Dialog extends React.Component {
  render() {
    return (
      <form className="pure-form pure-form-stacked" onSubmit={this.props.createFile}>
        <h2>Create File</h2>
        {this.props.error &&
          <h5>Error, file name {this.props.error} taken</h5>
        }
        <input type="text" placeHolder="File Name" ref={input => {this.fileInput=input;}}/>
        <button type="submit" className="pure-button pure-button-primary">Create</button>
      </form>
    )
  }
}

export default Dialog;
