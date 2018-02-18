import React from 'react';

/*
This component simply renders a dialog to create a file
If given error text, it will display that as well
*/

class Dialog extends React.Component {
  componentDidMount() {
    this.fileInput.focus();
  }
  render() {
    return(
    <form className="pure-form pure-form-stacked" onSubmit={this.props.createFile}>
    <h2>Create File</h2>
    {
      this.props.error &&
        <h5>Error, file name {this.props.error} taken</h5>
    }
    <input type="text" placeholder="File Name" ref={input => {this.fileInput = input;}}/>
    <button type="submit" className="pure-button pure-button-primary">Create</button>
    </form>
    )
  }
}
Dialog.defaultProps = {};
export default Dialog;
